import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminWorkoutSingleExercise } from '../models/workout-week.model';
import { FirestoreExtendedService } from './firestore-extended.service';
import { VimeoService, VimeoVideo } from './vimeo.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutExercisesService {

  placeholderImage = '/assets/images/AL_temp-logo.jpg';
  private exBatch: Set<AdminWorkoutSingleExercise> = new Set();

  constructor(
    private db: FirestoreExtendedService,
    private vimeoService: VimeoService
  ) { }

  async upsert(ex: AdminWorkoutSingleExercise): Promise<void> {
    if (!ex) return;
    if (
      ex.title?.trim().toLowerCase() === 'riposo' ||
      ex.title?.trim().toLowerCase() === 'rest' ||
      ex.iconSrc === './../../../assets/icons/workout/workout-rest-icon.svg'
    ) return;
    if (!ex.title) delete ex.title;
    if (!ex.iconId) delete ex.iconId;
    if (!ex.iconSrc) delete ex.iconSrc;
    if (!ex.exerciseId) delete ex.exerciseId;
    if (!ex.note) delete ex.note;
    if (!ex) return;

    if (ex.videoLink) {
      ex = await this.getThumbVimeo(ex);
    }

    const id = ex.exerciseId ? ex.exerciseId : null;
    this.db.upsert(`workout-exercises/${id}`, ex);
  }

  get(id: string): Observable<AdminWorkoutSingleExercise> {
    return this.db.doc$<AdminWorkoutSingleExercise>(`workout-exercises/${id}`);
  }

  getAll(): Observable<AdminWorkoutSingleExercise[]> {
    return this.db.col$<AdminWorkoutSingleExercise>('workout-exercises');
  }

  delete(id: string): void {
    this.db.delete(`workout-exercises/${id}`);
  }

  addToBatch(ex: AdminWorkoutSingleExercise): void {
    if (this.exBatch.size <= 0) {
      this.exBatch.add(ex);
    } else {
      let match = false;
      const batchArr = [...this.exBatch];
      let len = batchArr.length;
      while (len-- && !match) {
        const savedEx = batchArr[len];
        match =
          (ex.title?.trim().toLowerCase() === savedEx.title?.trim().toLowerCase() &&
            (
              ex.iconId === savedEx.iconId &&
              ex.iconSrc?.trim().toLowerCase() === savedEx.iconSrc?.trim().toLowerCase()
            )
          ) ||
          ex.title?.trim().toLowerCase() === savedEx.title?.trim().toLowerCase() ||
          ex.videoLink?.trim().toLowerCase() === savedEx.videoLink?.trim().toLowerCase()
        ;
      }
      if (!match) {
        this.exBatch.add(ex);
      }
    }
  }

  commitBatch(): void {
    if (this.exBatch.size <= 0) return;
    this.exBatch.forEach(ex => {
      this.upsert(ex);
    });
    this.exBatch.clear();
  }

  async getThumbVimeo(ex: AdminWorkoutSingleExercise): Promise<AdminWorkoutSingleExercise> {
    if (!ex) return ex;
    ex.videoThumbnail = this.placeholderImage;
    // eslint-disable-next-line radix
    const videoId = parseInt(ex.videoLink?.split('/')[3] || '');
    if (!videoId) return ex;
    const vimeo = await this.vimeoService.getVideo(videoId);
    if (vimeo instanceof Error || !vimeo) console.error(JSON.parse(vimeo as any));
    const video = (vimeo as VimeoVideo).pictures.sizes
      .filter(size => size.width >= 640 && size.width <= 1280);
    if (!video) return ex;
    ex.videoThumbnail = video[0].link;
    return ex;
  }
}
