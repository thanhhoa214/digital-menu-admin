import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { StoreReadDto, StoresService } from 'src/generated';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  public store$: Observable<StoreReadDto[]>;

  constructor(
    private storeService: StoresService
  ) { }




  private _pagingOptions = {
    limit: 10,
  };


  ngOnInit() {
    this.store$ = this.storeService.apiStoresGet(1, this._pagingOptions.limit)
  }

  loadStores(page: number) {
    this.store$ = this.storeService.apiStoresGet(
      page,
      this._pagingOptions.limit
    );
  }
}
