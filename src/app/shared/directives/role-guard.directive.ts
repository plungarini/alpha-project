import { AuthenticationService } from '../../auth/services/authentication.service';
import { User } from '../../auth/models/user.model';
import { Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[ngIfRole]'
})
export class BaseRoleDirective implements OnInit, OnDestroy {

  @Input('ngIfRole') role = '';
  currentUser: User;
  sub: Subscription;

  constructor(
    private authService: AuthenticationService,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
  	this.sub = this.authService.user$.subscribe(user => {
  		if (user) {
  			this.currentUser = user;
  			this.updateView();
  		}
  	});
  }

  ngOnDestroy(): void {
  	this.sub?.unsubscribe();
  }

  updateView() {
  	if (this.checkRole()) {
  		this.viewContainer.clear();
  		this.viewContainer.createEmbeddedView(this.templateRef).detectChanges();
  	} else {
  		this.viewContainer.clear();
  	}
  }

  checkRole() {
  	return (this.currentUser.roles as any)[this.role.toLowerCase()];
  }

}
