import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { SnackBarSuccessComponent } from 'src/app/shared/components';
import { AccountReadDto, StoresService } from 'src/generated';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storesService: StoresService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    // NOTE: HOW TO GET LOGGED ACCOUNT INFORMATION
    const account: AccountReadDto = JSON.parse(
      localStorage.getItem('accountInfor')
    );
    console.log(account);
  }

  create() {
    const { name } = this.form.value;
    this.storesService
      .apiStoresPost({ name })
      .pipe(take(1))
      .subscribe(() => {
        this._snackBar.openFromComponent(SnackBarSuccessComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-success',
          data: {
            title: 'Success !',
            message: `Create "${name}" successfully`,
          },
        });
      });
  }
}
