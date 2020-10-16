import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Input() isLoggedIn = false;
  @Output() toggleSidebar = new EventEmitter();

  notificationCount = 2;
  mailCount = 2;

  logout() {}
}
