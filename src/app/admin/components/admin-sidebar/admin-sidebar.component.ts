import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSidebarComponent implements OnChanges {

  @Output() isOpen = new EventEmitter();
  @Input() status = false;

  overlayOpen = false;
  sidebarOpen = false;

  navigation = [
    {
      title: 'Dashboard',
      icon: 'houseFill',
      url: '/admin'
    },
    {
      title: 'Schede',
      icon: 'fileMedicalFill',
      url: '/admin/workout'
    },
    {
      title: 'Utenti',
      icon: 'peopleFill',
      url: '/admin/users'
    },
    {
      title: 'Video',
      icon: 'cameraVideoFill',
      url: '/admin/video'
    },
    {
      title: 'Annunci',
      icon: 'megaphoneFill',
      url: '/admin/news'
    },
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('status' in changes) {
      if (changes.status.currentValue) {
        this.showSidebar();
      } else if (!changes.status.currentValue) {
        this.closeSidebar();
      }
    }
  }

  toggle(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.overlayOpen = !this.sidebarOpen;
    this.isOpen.emit(this.sidebarOpen);
  }

  showSidebar(): void {
    this.sidebarOpen = true;
    this.overlayOpen = true;
    this.isOpen.emit(true);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.overlayOpen = false;
    this.isOpen.emit(false);
  }

}
