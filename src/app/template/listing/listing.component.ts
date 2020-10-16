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
export class ListingComponent implements OnInit, OnDestroy {
  constructor(
    private _snackBar: MatSnackBar,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {}
}
