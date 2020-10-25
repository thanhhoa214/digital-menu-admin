import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef<MatInput>;
  form: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    const formControlNames = ['email', 'password'];
    // formControlNames.forEach((controlName) => {
    //   const formControl = this.form.get(controlName);
    //   formControl.valueChanges
    //     .pipe(
    //       distinctUntilChanged(),
    //       filter((value) => !!value),
    //       tap((value) => formControl.setValue({ str: value }))
    //     )
    //     .subscribe();
    // });
  }

  login(): void {
    this._authService.login(this.form.value).subscribe((result) => {
      console.log(result);
      if (result.token) {
        this._router.navigateByUrl('/templates');
      }
    });
  }
}
