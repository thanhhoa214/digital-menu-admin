import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
import { AuthenticationService } from 'src/generated';
import {
  SnackBarFailedComponent,
  SnackBarSuccessComponent,
} from 'src/app/shared/components';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _authService: AuthenticationService,
    private _tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    this._authService
      .apiAuthenticationPost(this.form.value)
      .pipe(take(1))
      .subscribe((result) => {
        if (typeof result !== 'object') {
          this._snackBar.openFromComponent(SnackBarFailedComponent, {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: 'mat-snack-bar-failed',
            data: {
              title: 'Failed !',
              message: 'Login failed. Username or password is incorrect.',
            },
          });
          return;
        }
        if (result.token) {
          this._snackBar.openFromComponent(SnackBarSuccessComponent, {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: 'mat-snack-bar-success',
            data: { title: 'Success !', message: 'Login successfully' },
          });
          this._tokenService.updateAccessToken(result.token);

          localStorage.setItem('accountInfor', JSON.stringify(result.account));
          this._router.navigateByUrl('/templates');
        }
      });
  }
}
