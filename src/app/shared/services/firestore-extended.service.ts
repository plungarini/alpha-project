import { Injectable } from '@angular/core';
import {
	collection, deleteDoc, doc, DocumentSnapshot, Firestore, onSnapshot,
	query, QuerySnapshot, setDoc, Timestamp as fTimestamp, Unsubscribe
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface FirestoreExtDoc<T> {
	data: Observable<T>;
	unsubscribe: Unsubscribe;
}
export interface FirestoreExtCol<T> {
	data: Observable<T[]>;
	unsubscribe: Unsubscribe;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreExtendedService {

  constructor(private db: Firestore) { }

  /**
   * Deletes a document from Firestore.
   *
   * @param ref Reference of the document.
   */
	delete(ref: string): Promise<any> {
		const docRef = doc(this.db, ref);
    return deleteDoc(docRef);
  }

	/**
	 * Upsert data into Firestore.
	 * If data exists, it will update
	 * it. Else it will set it.
	 *
	 * // Adds "createdAt" field.
	 * // or "updatedAt" field.
	 *
	 * @param ref Reference of the document.
	 * @param data Data to upsert in the document.
	 */
	upsert<DocumentData>(ref: string, data: any): Promise<void> {
		const docRef = doc(this.db, ref);
		const timestamp = fTimestamp.now();
		const newData = {
			...data,
			updatedAt: timestamp,
			createdAt: timestamp,
		};
		const updatedData = {
			...data,
			updatedAt: timestamp,
		};
		const snapshot = this.getDoc<DocumentData>(ref).data.pipe(take(1)).toPromise();
		return snapshot.then(
			snap => (snap as any).exists ?
				setDoc(docRef, updatedData, { merge: true }) :
				setDoc(docRef, newData, { merge: true })
			);
	};

  /**
   * It returns an entire collection
   * of documents with ids.
   *
   * @param ref Collection reference.
   * @param where Filters to query the collection.
   * @param orderBy Order or sort the collection.
   */
	col$<DocumentData>(ref: string, where?: any, orderBy?: any): FirestoreExtCol<DocumentData> {
		const colRef = collection(this.db, ref);

		if (where || orderBy) {
			return this.getCols<DocumentData>(
				query(colRef, where, orderBy)
			);
		}

		return this.getCols<DocumentData>(colRef);
	}

  /**
   * It returns an entire collection
   * of documents with ids.
   *
   * @param ref Collection reference.
   * @param where Filters to query the collection.
   * @param orderBy Order or sort the collection.
   */
	doc$<DocumentData>(ref: string): FirestoreExtDoc<DocumentData> {
		const docRef = doc(this.db, ref);
		return this.getDoc<DocumentData>(docRef);
	}

	private getDoc<DocumentData>(ref: any): FirestoreExtDoc<DocumentData> {
		const res = new Subject<DocumentData>();
		const snapshot = onSnapshot<DocumentData>(ref,
			(snap: DocumentSnapshot<DocumentData>) => {
				res.next({
					id: snap.id,
					exists: snap.exists(),
					...snap.data() as DocumentData
				});
			});

		return {
			data: res.asObservable(),
			unsubscribe: snapshot,
		};
	}

	private getCols<DocumentData>(ref: any): FirestoreExtCol<DocumentData> {
		const res = new Subject<DocumentData[]>();
		const snapshot = onSnapshot<DocumentData>(ref,
			(snap: QuerySnapshot<DocumentData>) => {
				const dataArray: DocumentData[] = [];
				snap.forEach(item => {
					dataArray.push({
						id: item.id,
						exists: item.exists(),
						...item.data() as DocumentData
					});
				});
				res.next(dataArray);
			});

		return {
			data: res.asObservable(),
			unsubscribe: snapshot,
		};
	}

}
