import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductReadDto, ProductsService } from 'src/generated';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product: ProductReadDto;
  formGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
      price: [''],
      src: [''],
      storeName: [''],
    });
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.productsService.apiProductsIdGet(id).subscribe((data) => {
      this.product = data;
    });
  }
}
