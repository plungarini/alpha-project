import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { DropdownOptions } from 'src/app/shared/models/dropdown-options.model';

@Component({
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  @Input() childPageTitle = '';
  @Input() childPageDesc = '';
  openSidebar = false;

  options: DropdownOptions[] = [
    {
      type: 'group',
      childrens: [
        {
          name: 'Il mio account',
          url: '/profile',
        },
        {
          name: 'Impostazioni',
          url: '/settings'
        }
      ]
    },
    {
      name: 'Esci',
      icon: IconNamesEnum.Power
    }
  ];

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('dashboard');
  }

  routeChanged(componentRef: any): void {
    if (!componentRef) return;
    this.childPageTitle = componentRef.pageTitle;
    this.childPageDesc = componentRef.pageDesc;
  }

}
