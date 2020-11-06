import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ScreenReadDtoPagingResponseDto, ScreensService } from 'src/generated';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  screen$:Observable<ScreenReadDtoPagingResponseDto> 
  search: FormControl = new FormControl('');

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(
    private _screenService: ScreensService
  ) {}

  ngOnInit() {
    this.screen$ = this._screenService.apiScreensGet(
      1,
      this.pagingOptions.limit
    );
  }

  loadScreens(page: number) {
    const searchValue = this.search.value;
    this.screen$ = this._screenService.apiScreensGet(
      page,
      this.pagingOptions.limit,
      searchValue
    );
    this.pagingOptions = { ...this.pagingOptions, currentPage: page };
  }

  getPagingArray(totolItem: number) {
    const pageCount = Math.round(totolItem / this.pagingOptions.limit);
    return Array(pageCount).fill(1);
  }
}
