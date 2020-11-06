import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScreenReadDtoPagingResponseDto, ScreenTemplateCreateDto, ScreenTemplateReadDto, ScreenTemplateReadDtoPagingResponseDto, ScreenTemplatesService } from 'src/generated';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

const sampleSkeleton = {
  id: 'skeleton',
  icon: 'skeleton',
  name: 'skeleton',
  description: 'skeleton',
};

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  display$:Observable<ScreenTemplateReadDtoPagingResponseDto> 
  search: FormControl = new FormControl('');

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };


  constructor(
    private _displayService: ScreenTemplatesService
  ) {}

  ngOnInit() {
    this.display$ = this._displayService.apiScreenTemplatesGet(
      1,
      this.pagingOptions.limit
    );
  }

  loadDisplays(page: number) {
    const searchValue = this.search.value;
    this.display$ = this._displayService.apiScreenTemplatesGet(
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
