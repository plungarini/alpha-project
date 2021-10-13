import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, getStorage, ref, StorageReference, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';



export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
  fileReference?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
	storage = getStorage();

  constructor() {}

  uploadFileAndGetMetadata(
    mediaFolderPath: string,
    fileToUpload: File,
  ): FilesUploadMetadata {
    const { name } = fileToUpload;
		const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
		const uploadRef = ref(this.storage, filePath);
		const uploadTask = uploadBytesResumable(uploadRef, fileToUpload);

		const res = {
			uploadProgress$: new Subject<number>(),
			downloadUrl$: new Subject<string>(),
			fileReference: filePath,
		};
		uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			res.uploadProgress$.next(progress);
		}, (err) => {
			console.log(err);
		}, () => {
			getDownloadURL(uploadTask.snapshot.ref).then(url => {
				res.downloadUrl$.next(url);
			});
		});

		return {
			uploadProgress$: res.uploadProgress$.asObservable(),
			downloadUrl$: res.downloadUrl$.asObservable(),
			fileReference: res.fileReference,
		};
  }

  deleteFile(reference: StorageReference): Promise<void> {
		return deleteObject(reference);
  }

  getFileReference(path: string): StorageReference {
    return ref(this.storage, path);
  }
}
