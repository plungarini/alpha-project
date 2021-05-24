import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter,
  Input,

  Output,
  ViewChild
} from '@angular/core';
import Vimeo from '@vimeo/player';



@Component({
  selector: 'app-vimeo-player',
  templateUrl: './vimeo-player.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VimeoPlayerComponent {

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShow = new EventEmitter();

  @Input('url') set url(value: string) {
    if (!value) return;
    // eslint-disable-next-line radix
    const id = parseInt(value.split('/')[3]);
    if (!id) return;
    this.playerId = id;
  }
  @Input('show') set showModal(value: boolean) {
    if (value !== undefined && value !== null) {
      if (this.transitionStarted) return;
      if (value === true) {
        this.hide = false;
        if (this.videoPlayerEl) {
          this.player = new Vimeo(this.videoPlayerEl.nativeElement, this.options);
          this.player.unload().then(() => {
            this.toggleModal(value);
          });
        } else {
          setTimeout(() => {
            this.player = new Vimeo(this.videoPlayerEl.nativeElement, this.options);
            this.player.unload().then(() => {
              this.toggleModal(value);
            });
          }, 300);
        }
      }
    }
  };

  @ViewChild('vimeoPlayer') videoPlayerEl: ElementRef<HTMLDivElement>;

  options = {
    id: 90283590,
    autopause: true,
    autoplay: true,
    responsive: true,
    playsinline: true,
    title: false,
    loop: false
  };
  player: Vimeo;
  playerId: number | null = null;

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
    if (value === true && this.playerId) this.loadVideo(this.playerId);
    this.onShow.emit(value);
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.transitionStarted = false;
      if (value === false) this.hide = true;
      this.cdRef.detectChanges();
    }, 300);
  }

  private loadVideo(id: number): void {
    if (!id) return;
    this.player.loadVideo(id)
      .catch((error: any) => {
        switch (error.name) {
          case 'TypeError':
            console.error('VIMEO:', 'Video id was not a number.');
            break;

          case 'PasswordError':
            console.error('VIMEO:', 'This video is password-protected.');
            break;

          case 'PrivacyError':
            console.error('VIMEO:', 'This video is private or password-protected.');
            break;

          default:
            console.error('VIMEO:', 'Unexpected error:', error);
            break;
        }
      });
    /* LISTENERS */
  }

}
