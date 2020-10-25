import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReadDto, ProductsService } from 'src/generated';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit, OnDestroy {
  public products$: Observable<ProductReadDto[]>;
  constructor(private _productService: ProductsService) {}

  ngOnInit() {
    this.products$ = this._productService.apiProductsGet(1, 10);
  }

  ngOnDestroy(): void {}
}
