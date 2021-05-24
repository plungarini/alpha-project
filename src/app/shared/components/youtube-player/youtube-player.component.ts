import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Vimeo from '@vimeo/player';



@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayerComponent {

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShow = new EventEmitter();

  @Input('id') set id(value: string) {
    if (!value) return;
    this.videoId = 'https://www.youtube.com/embed/' + value;
    this.cdRef.detectChanges();
  }
  @Input('show') set showModal(value: boolean) {
    if (value !== undefined && value !== null) {
      if (this.transitionStarted) return;
      if (value === true) {
        this.hide = false;
        this.toggleModal(value);
      }
    }
  };

  videoId: string | null = null;

  hide = true;
  show = false;
  transitionStarted = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  clickOut(event: MouseEvent): void {
    this.toggleModal(false);
  }

  private toggleModal(value: boolean): void {
    if (this.transitionStarted) return;
    this.show = value;
    this.transitionStarted = true;
    this.onShow.emit(value);
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.transitionStarted = false;
      if (value === false) this.hide = true;
      this.cdRef.detectChanges();
    }, 300);
  }

}
