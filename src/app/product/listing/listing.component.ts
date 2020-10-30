import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReadDto, ProductsService } from 'src/generated';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  public products$: Observable<ProductReadDto[]>;

  private _pagingOptions = {
    limit: 10,
  };

  constructor(private _productService: ProductsService) {}

  ngOnInit() {
    this.products$ = this._productService.apiProductsGet(
      1,
      this._pagingOptions.limit
    );
  }
  loadProducts(page: number) {
    this.products$ = this._productService.apiProductsGet(
      page,
      this._pagingOptions.limit
    );
  }
}
