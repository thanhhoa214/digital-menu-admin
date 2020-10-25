import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit, OnDestroy {
  constructor(
    private _snackBar: MatSnackBar,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // new ProductsApi().apiProductsGet({}).subscribe(console.log);
  }

  ngOnDestroy(): void {}
}
