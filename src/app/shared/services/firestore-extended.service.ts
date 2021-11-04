import { Injectable } from '@angular/core';
import {
	AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction, QueryFn
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Timestamp } from './../../auth/models/timestamp.model';

// Custom Types
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;
type FirebaseQueryFn = QueryFn<firebase.firestore.DocumentData> | undefined;


@Injectable({
	providedIn: 'root'
})
export class FirestoreExtendedService {

	constructor(private afs: AngularFirestore) { }

	/**
	 * Get data from document.
	 *
	 * @param ref Reference of the document.
	 *
	 * @returns Observable of the requested document.
	 */
	doc$<T>(ref: DocPredicate<T>): Observable <T> {
		return this.doc(ref)
			.snapshotChanges()
			.pipe(
				map((doc) => doc.payload.data() as T),
			);
	}

	/**
	 * Get data from collection.
	 *
	 * @param ref Reference of the collection.
	 * @param queryFn Filters to query collection items.
	 *
	 * @returns Observable of the requested collection.
	 */
	col$<T>(ref: CollectionPredicate <T> , queryFn?: FirebaseQueryFn ): Observable <T[]> {
		return this.col(ref, queryFn)
			.snapshotChanges()
			.pipe(
				map((docs: DocumentChangeAction<T>[]) => docs.map((a: DocumentChangeAction<T>) => a.payload.doc.data()) as T[]),
			);
	}

	/**
	 * Set data into Firestore.
	 * It will delete existing data.
	 *
	 * // Adds "createdAt" field.
	 *
	 * @param ref Reference of the document.
	 * @param data Data to insert in the document.
	 */
	set<T>(ref: DocPredicate<T>, data: any): Promise<void> {
		const timestamp = this.timestamp;
		return this.doc(ref).set({
			...data,
			updatedAt: timestamp,
			createdAt: timestamp,
		});
	}

	/**
	 * Update data into Firestore.
	 *
	 * // Adds "updatedAt" field.
	 *
	 * @param ref Reference of the document.
	 * @param data Data to upsert in the document.
	 */
	update<T>(ref: DocPredicate<T>, data: any): Promise<void> {
		return this.doc(ref).update({
			...data,
			updatedAt: this.timestamp,
		});
	}

	/**
	 * Deletes a document from Firestore.
	 *
	 * @param ref Reference of the document.
	 */
	delete<T>(ref: DocPredicate<T>): Promise<any> {
		return this.doc(ref).delete();
	}

	/**
	 * Add data into Firestore.
	 *
	 * // Adds "createdAt" field.
	 *
	 * @param ref Reference of the collection.
	 * @param data Data to insert in the collection.
	 */
	add<T>(ref: CollectionPredicate<T>, data: any): Promise<firebase.firestore.DocumentReference> {
		const timestamp = this.timestamp;
		return this.col(ref).add({
			...data,
			updatedAt: timestamp,
			createdAt: timestamp,
		});
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
	async upsert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
		const doc = this.doc(ref)
			.snapshotChanges()
			.pipe(take(1))
			.toPromise();

		return doc.then((snap) => snap?.payload.exists ? this.update(ref, data) : this.set(ref, data));
	}

	/**
	 * It returns an entire collection
	 * of documents with ids.
	 *
	 * @param ref Collection Reference.
	 * @param queryFn Filters to query the collection.
	 */
	colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?: FirebaseQueryFn): Observable<T[]> {
		return this.col(ref, queryFn)
			.snapshotChanges()
			.pipe(
				map((actions: DocumentChangeAction<T>[]) => actions.map((a: DocumentChangeAction<T>) => {
					const data = a.payload.doc.data() as T;
					const thisId = a.payload.doc.id;
					return { id: thisId, ...data };
				})),
			);
	}

	/**
	 * @returns Unique id in the database.
	 */
	generateId(): string {
		return this.afs.createId();
	}

	/**
	 * @returns Firebase Server Timestamp.
	 */
	get timestamp(): Timestamp {
		return firebase.firestore.FieldValue.serverTimestamp() as unknown as Timestamp;
	}

	/**
	 * Sanityze CollectionReference and return Collection.
	 *
	 * @param ref CollectionPredicate
	 * @param queryFn Filters to query the collection
	 */
	private col<T>(ref: CollectionPredicate <T> , queryFn?: FirebaseQueryFn ): AngularFirestoreCollection <T> {
		return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
	}

	/**
	 * Sanityze DocumentReference and return Document.
	 *
	 * @param ref DocumentPredicate
	 */
	private doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument <T> {
		return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
	}

}
