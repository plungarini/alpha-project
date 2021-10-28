import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

export interface Avatar {
  img: string;
  fullName: string;
  email: string;
  color: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
}

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {

  @Input('user') set setUser(user: Avatar | undefined | null) {
		if (user) {
			user.img = user.img ? user.img : '';
			user.fullName = user.fullName ? user.fullName : '';
			user.email = user.email ? user.email : '';
			user.color = user.color ? user.color : 'indigo';
		}
		this.user = user ? user : this.placeholdUser;
		this.genInitials();
		this.initColor();
		this.initSizeClasses();
		this.cdRef.detectChanges();
	}
  @Input() displayType: 'card' | 'img' | 'raw' = 'card';
  @Input() enableProfileLink = true;
  @Input() imgMarginTopFix = false;

  placeholdUser: Avatar = {
  	img: '',
  	fullName: 'Pietro Lungarini',
  	email: 'pietro@lungarini.it',
  	color: 'indigo'
  };
  user: Avatar = this.placeholdUser;
  imgSize = 10;
  classes1 = 'mx-auto object-cover rounded-full ';
  classes2 = 'mx-auto object-cover rounded-full ';
  classes3 = 'flex flex-col justify-center items-center mr-3 ';
  initials: string | null = null;
  bgColor = 'mx-auto object-cover rounded-full ';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  genInitials(): void {
  	if (!this.user || !this.user.email || this.user.img) return;
  	const I1 =
      !this.user.fullName ?
      	this.user.email[0] :
      	this.user.fullName.split(' ')[0][0];

  	const I2 =
      !this.user.fullName ?
      	this.user.email[1] :
      	this.user.fullName.split(' ')[1][0];

  	this.initials = I1.toUpperCase() + I2.toUpperCase();
  }

  initColor(): void {
  	if (!this.user) return;
  	this.bgColor = ' bg-' + this.user.color + '-400';
  }

  initSizeClasses(): void {
  	this.classes1 += 'h-' + this.imgSize + ' w-' + this.imgSize;
  	this.classes2 += this.bgColor + ' h-' + this.imgSize + ' w-' + this.imgSize;
  	this.classes3 += 'h-' + this.imgSize + ' w-' + this.imgSize;
  }

}
