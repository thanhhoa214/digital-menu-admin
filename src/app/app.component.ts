import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  drawerMode: MatDrawerMode = 'side';
  isLessThanSmall$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private _tokenService: TokenService
  ) {
    this.isLessThanSmall$ = breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map((state) => state.matches),
        shareReplay({
          refCount: false,
        })
      );
    this.isLoggedIn$ = this._tokenService
      .getAccessToken$()
      .pipe(map((accessToken) => !!accessToken));
  }
}
