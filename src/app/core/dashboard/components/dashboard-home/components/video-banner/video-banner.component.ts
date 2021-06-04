import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminVideo, AdminVideoService } from 'src/app/shared/services/admin-video.service';



@Component({
  selector: 'app-video-banner',
  templateUrl: './video-banner.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoBannerComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();
  savedVideos: AdminVideo[];
  placeholderImage = '/assets/images/AL_temp-logo.jpg';
  playerUrl = '';
  playerId = '';
  showVimeoPlayer = false;
  showYoutubePlayer = false;

  constructor(
    private videoService: AdminVideoService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.videoService.getAll(true)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(videos => {
        this.savedVideos = [];
        videos.forEach((v, i) => {
          if (
            v.status === 'private' ||
            i > 1
          ) return;
          this.savedVideos.push(v);
        });
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  toggleVimeoPlayer(url: string): void {
    if (!url) return;
    this.playerUrl = url;
    this.showVimeoPlayer = true;
  }

  toggleYoutubePlayer(id: string): void {
    if (!id) return;
    this.playerId = id;
    this.showYoutubePlayer = true;
  }

  togglePlayer(source: 'YouTube' | 'Vimeo' | undefined, idOrUrl: string | number | undefined | null): void {
    if (!idOrUrl || !source) return;
    if (source === 'YouTube') this.toggleYoutubePlayer(idOrUrl + '');
    else if (source === 'Vimeo') this.toggleVimeoPlayer(idOrUrl as string);
  }

  onShowVimeoPlayer(value: boolean): void {
    this.showVimeoPlayer = value;
  }

  onShowYoutubePlayer(value: boolean): void {
    this.showYoutubePlayer = value;
  }

}
