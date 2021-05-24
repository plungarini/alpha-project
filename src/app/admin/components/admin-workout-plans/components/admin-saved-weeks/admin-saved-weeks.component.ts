import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WorkoutWeek } from 'src/app/shared/models/workout-week.model';
import { WorkoutWeeksService } from 'src/app/shared/services/workout-weeks.service';



@Component({
  selector: 'app-admin-saved-weeks',
  templateUrl: './admin-saved-weeks.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSavedWeeksComponent implements OnInit {

  @Input() weekType: 'functional' | 'gym' | 'pro' = 'functional';
  @Input('weeks') set setWeeks(weeks: WorkoutWeek[]) {
    if (!weeks || weeks.length <= 0) return;
    this.weeks = weeks.filter(w => w.type === this.weekType);
  };

  weeks: WorkoutWeek[];
  show = false;
  confirmDeleteErr = '';
  canProceedDelete = false;
  weekToDeleteId = '';

  constructor(
    private weeksService: WorkoutWeeksService
  ) { }

  ngOnInit(): void {
  }

  deleteWeek(id: string | undefined): any {
    if (!id) return;
    this.weekToDeleteId = id;
    this.show = true;
  }

  confirmDeleteWeek(): void {
    if (!this.canProceedDelete) return;
    this.weeksService.delete(this.weekToDeleteId);
    this.confirmDeleteErr = '';
    this.canProceedDelete = false;
    this.weekToDeleteId = '';
    this.show = false;
  }

  checkConfirmDeleteError(input: HTMLInputElement): void {
    const triggerWord = 'ELIMINA';
    const errMsg = 'Devi scrivere "ELIMINA" in maiuscolo per confermare l\'eliminazione della scheda.';

    if (!input) return;
    if (input.value.trim() === triggerWord) {
      this.confirmDeleteErr = '';
      this.canProceedDelete = true;
    } else {
      this.confirmDeleteErr = errMsg;
      this.canProceedDelete = false;
    }
  }

}
