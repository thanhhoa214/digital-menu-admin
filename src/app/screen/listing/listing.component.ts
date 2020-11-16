import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SnackBarSuccessComponent } from 'src/app/shared/components';
import {
  ScreenReadDtoPagingResponseDto,
  ScreensService,
  StoreReadDtoPagingResponseDto,
  StoresService,
} from 'src/generated';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  screenResponse: ScreenReadDtoPagingResponseDto;
  stores: StoreReadDtoPagingResponseDto;
  search: FormControl = new FormControl('');

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(
    private _screenService: ScreensService,
    private _storeService: StoresService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this._screenService
      .apiScreensGet(1, this.pagingOptions.limit)
      .subscribe((data) => {
        this.screenResponse = data;
      });
    this.stores = await this._storeService.apiStoresGet(0, 0).toPromise();
  }

  loadScreens(page = 1) {
    const searchValue = this.search.value;
    this._screenService
      .apiScreensGet(page, this.pagingOptions.limit, searchValue)
      .subscribe((data) => {
        this.screenResponse = data;
      });
    this.pagingOptions = { ...this.pagingOptions, currentPage: page };
  }
  getStoreName(storeId: number): string {
    return storeId
      ? this.stores?.result.find((s) => s.id === storeId).name
      : '';
  }
  getPagingArray(totolItem: number) {
    const pageCount = Math.round(totolItem / this.pagingOptions.limit);
    return Array(pageCount).fill(1);
  }
  removeScreen(event: any, screenId: number) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this._screenService
      .apiScreensIdDelete(screenId)
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.openFromComponent(SnackBarSuccessComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-success',
          data: { title: 'Success !', message: 'Remove screen successfully' },
        });
      });
  }
}
