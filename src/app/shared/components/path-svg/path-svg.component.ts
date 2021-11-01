import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-path-svg',
	templateUrl: './path-svg.component.html',
	styles: [` :host { @apply flex justify-center items-center; } `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathSvgComponent implements OnInit {

  @Input() path: string | undefined;
  @Input() width = '1em';
  @Input() height = '1em';

  constructor() { }

  ngOnInit(): void {
  }

}
