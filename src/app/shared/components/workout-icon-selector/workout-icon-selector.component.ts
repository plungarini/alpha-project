/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import WORKOUT_IMAGES from '../../typescript/workout-images';

@Component({
  selector: 'app-workout-icon-selector',
  templateUrl: './workout-icon-selector.component.html',
  styleUrls: ['./workout-icon-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutIconSelectorComponent implements OnInit, OnDestroy {

  @Output() onIconSelected = new EventEmitter();

  searchControl = new FormControl('');
  icons = WORKOUT_IMAGES;
  destroyed = new Subject();


  filteredIcons: {
    id: number;
    tags: string;
    path: string;
  }[] = this.icons;

  constructor() { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(value => {
        this.filteredIcons = this.filter(value);
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  iconSelected(icon: { id: number; tags: string; path: string }): void {
    this.onIconSelected.emit(icon);
  }

  private filter(value: string): { id: number; tags: string; path: string }[] {
    if (!value) return this.icons;
    const normValue = value.toLowerCase().split(' ');
    const res = this.icons.filter(icon => {
      if (!icon) return;
      let key = normValue.length;
      let match = false;

      while (key-- && !match) {
        match =
          icon.path.includes(normValue[key]) ||
          icon.tags.includes(normValue[key]);
      }

      return match;
    });
    return res;
  }

}
