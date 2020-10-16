import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;

  drawerMode: MatDrawerMode = 'side';
  isLessThanSmall$: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isLessThanSmall$ = breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map((state) => state.matches),
        shareReplay({
          refCount: false,
        })
      );
  }
}
