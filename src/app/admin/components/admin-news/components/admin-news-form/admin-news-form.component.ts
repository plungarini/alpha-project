import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Avatar } from 'src/app/shared/components/avatar/avatar.component';
import { Announcement } from 'src/app/shared/models/announce.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserItem } from '../../../admin-users/components/home/admin-users.component';



@Component({
	selector: 'app-admin-news-form',
	templateUrl: './admin-news-form.component.html',
	styles: [`
    input[type="time"]::-webkit-calendar-picker-indicator {
      filter: invert(0.7);
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(0.7);
    }
  `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsFormComponent implements OnInit {

  @Input('resetForm') set resetForm(value: boolean | undefined) {
		if (value === undefined) return;
		this.form.patchValue({
			senderImg: 'assets/icons/no-user-ph.png',
			senderName: '',
			senderMessage: '',
			senderLink: '',
			senderDate: '',
			senderTime: ''
		});
	}
  @Output() sendMessage = new EventEmitter();
  @Output() formValueChanged = new EventEmitter();

  sender: Avatar = {
  	img: 'assets/icons/no-user-ph.png',
  	fullName: '',
  	email: '',
  	color: 'indigo',
  };
  form = new FormGroup({
  	senderImg: new FormControl('assets/icons/no-user-ph.png'),
  	senderName: new FormControl(''),
  	senderMessage: new FormControl(''),
  	senderLink: new FormControl(''),
  	senderDate: new FormControl(''),
  	senderTime: new FormControl('')
  });

  todayDate: string;
  images: Set<string> = new Set();
  mediaFolderPath = 'admins/news/sender/images';
  selectedUsers: UserItem[];
  destroyed$ = new Subject();

  constructor(
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  	this.getAllImages();
  	this.todayDate = moment().format('YYYY-MM-DD');
  	this.form.valueChanges.pipe(
  		takeUntil(this.destroyed$)
  	).subscribe(value => {
  		if (!value) return;
  		const message = this.setSendAtDate();
  		this.formValueChanged.emit(message);
  	});
  }

  selectImage(url: string): void {
  	this.sender.img = url || 'assets/icons/no-user-ph.png';
  	if (url) {
  		this.images.add(url);
  		this.form.patchValue({
  			senderImg: url
  		});
  	}
  	this.cdRef.detectChanges();
  }

  uploadImage(images: any | null): void {
  	if (!images) return;
  	const fileToUpload: File = images.files[0];

  	const { downloadUrl$, uploadProgress$, fileReference } =
      this.storageService.uploadFileAndGetMetadata(
      	this.mediaFolderPath,
      	fileToUpload,
      );

  	downloadUrl$
  		.pipe(takeUntil(this.destroyed$))
  		.subscribe((downloadUrl) => {
  			if (downloadUrl) {
  				this.selectImage(downloadUrl);
  			}
  		});
  }

  getAllImages(): any {
  	this.storageService
  		.getFileReference(this.mediaFolderPath)
  		.listAll()
  		.pipe(takeUntil(this.destroyed$))
  		.subscribe(res => {
  			this.images.clear();
  			res.items.forEach(item => {
  				item.getDownloadURL().then((url: string) => {
  					this.images.add(url);
  				});
  			});
  			this.cdRef.detectChanges();
  		});
  }

  saveAnnounce(): void {
  	const message = this.setSendAtDate();
  	this.sendMessage.emit(message);
  }

  private setSendAtDate(): Announcement {
  	const form = this.form.value;
  	const date = form.senderDate || '';
  	const time = form.senderTime || '';
  	const sendAt = moment(date + ' ' + time).unix();
  	return {
  		senderImg: form.senderImg,
  		senderName: form.senderName,
  		senderMessage: form.senderMessage,
  		senderLink: form.senderLink,
  		sendAt: sendAt ? new Date(sendAt * 1000) : new Date(),
  		sendTo: []
  	};
  }

}
