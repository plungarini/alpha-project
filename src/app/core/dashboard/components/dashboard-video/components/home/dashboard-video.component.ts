import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminWorkoutSingleExercise } from 'src/app/shared/models/workout-week.model';
import { AdminVideoService } from 'src/app/shared/services/admin-video.service';
import { WorkoutExercisesService } from 'src/app/shared/services/workout-exercises.service';
import { AdminVideo } from './../../../../../../shared/services/admin-video.service';



@Component({
  selector: 'app-dashboard-video',
  styles: [` :host { display: block; } `],
  templateUrl: './dashboard-video.component.html'
})
export class DashboardVideoComponent implements OnInit, OnDestroy {

  pageTitle = 'Tutti i video';

  destroyed$ = new Subject();
  savedExercises: AdminWorkoutSingleExercise[];
  savedVideos: AdminVideo[];
  placeholderImage = '/assets/images/AL_temp-logo.jpg';
  playerUrl = '';
  playerId = '';
  showVimeoPlayer = false;
  showYoutubePlayer = false;

  constructor(
    private exService: WorkoutExercisesService,
    private videoService: AdminVideoService
  ) { }

  ngOnInit(): void {
    this.exService.getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async exs => {
        this.savedExercises = exs;
      });
    this.videoService.getAll(true)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(videos => {
        this.savedVideos = [];
        videos.forEach(v => {
          if (v.status === 'private') return;
          this.savedVideos.push(v);
        });
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
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
