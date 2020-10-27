import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { ProductReadDto, ProductsService } from 'src/generated';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  products$: Observable<Pagination<ProductReadDto>>;
  search: FormControl = new FormControl('');

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(private _productService: ProductsService) {}

  ngOnInit() {
    this.products$ = this._productService.apiProductsGet();
  }
  loadProducts(page: number) {
    const searchValue = this.search.value;
    this.products$ = this._productService.apiProductsGet(
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
