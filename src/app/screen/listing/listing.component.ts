import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ScreenReadDtoPagingResponseDto,
  ScreensService,
  StoreReadDto,
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
  screen$: Observable<ScreenReadDtoPagingResponseDto>;
  stores: StoreReadDtoPagingResponseDto;
  search: FormControl = new FormControl('');

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(
    private _screenService: ScreensService,
    private _storeService: StoresService
  ) {}

  async ngOnInit() {
    this.screen$ = this._screenService.apiScreensGet(
      1,
      this.pagingOptions.limit
    );
    this.stores = await this._storeService.apiStoresGet(0, 0).toPromise();
  }

  loadScreens(page = 1) {
    const searchValue = this.search.value;
    this.screen$ = this._screenService.apiScreensGet(
      page,
      this.pagingOptions.limit,
      searchValue
    );
    this.pagingOptions = { ...this.pagingOptions, currentPage: page };
  }
  getStoreName(storeId: number): string {
    return storeId ? this.stores.result.find((s) => s.id === storeId).name : '';
  }
  getPagingArray(totolItem: number) {
    const pageCount = Math.round(totolItem / this.pagingOptions.limit);
    return Array(pageCount).fill(1);
  }
}
