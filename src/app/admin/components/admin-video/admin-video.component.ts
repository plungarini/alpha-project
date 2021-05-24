/* eslint-disable max-len */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminVideo, AdminVideoService } from '../../../shared/services/admin-video.service';



@Component({
  selector: 'app-admin-video',
  templateUrl: './admin-video.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminVideoComponent implements OnInit, OnDestroy {

  pageTitle = 'Tutti i video';

  savedVideos: AdminVideo[] = [];

  destroyed$ = new Subject();
  showModal = false;
  isNewItemModal = true;
  itemNewTitleModal = 'Aggiungi un video';
  itemNewDescModal = 'Aggiungi un nuovo video per gli iscritti. Il video deve provenire da Vimeo o YouTube. I video verranno visualizzati in base alla data di ultima modifica.';
  itemEditTitleModal = 'Modifica il video';
  itemEditDescModal = 'Modifica le informazioni relative a questo video. Il video deve provenire da Vimeo o YouTube. I video verranno visualizzati in base alla data di ultima modifica.';

  videoForm = new FormGroup({
    link: new FormControl('', [Validators.required]),
    status: new FormControl('private', [Validators.required]),
    id: new FormControl(null),
    title: new FormControl(null),
    source: new FormControl(null),
    videoId: new FormControl(null),
    thumbnail: new FormControl(null),
    createdAt: new FormControl(null),
    updatedAt: new FormControl(null),
  });


  constructor(
    private videoService: AdminVideoService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.videoService.getAll(true)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(videos => {
        this.savedVideos = videos;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  saveVideo(): void {
    if (!this.videoForm.valid || !this.videoForm.value) return;
    this.videoService.upsert(this.videoForm.value)
      .then(res => {
        this.successSave();
      })
      .catch(err => {
        this.errorSave(err);
      });
  }

  deleteVideo(video: AdminVideo): void {
    if (!video || !video.id) return;
    this.videoService.delete(video.id);
  }

  openModal(video: AdminVideo | undefined): void {
    const emptyForm = {
      link: '',
      status: 'private',
      id: null,
      title: null,
      source: null,
      videoId: null,
      thumbnail: null,
      createdAt: null,
      updatedAt: null,
    };
    this.videoForm.patchValue(video ? video : emptyForm);
    this.showModal = true;
  }

  private successSave(): void {
    this.showModal = false;
    this.cdRef.detectChanges();
  }

  private errorSave(err: string): void {
    console.error(err);
  }

}
