import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { DrawerService } from 'src/app/drawer.service';
import {
  ProductReadDto,
  ProductsService,
  TemplateDetailReadDto,
  TemplatesService,
} from 'src/generated';
import { FormBuilder, FormGroup } from '@angular/forms';

export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'];
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, AfterViewInit {
  @ViewChild('templateRoot') templateRoot: HTMLElement;
  @ViewChild('headerSrcInput') headerSrcInput: ElementRef<HTMLInputElement>;
  @ViewChild('footerSrcInput') footerSrcInput: ElementRef<HTMLInputElement>;

  form: FormGroup;
  templateData: TemplateDetailReadDto;
  configuration: any = {};
  products: ProductReadDto[];

  private _initTemplateData: TemplateDetailReadDto;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _renderer2: Renderer2,
    private _drawerService: DrawerService,
    private _templateService: TemplatesService,
    private _productService: ProductsService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      headerTitle: [''],
      headerSrc: [''],
      footerTitle: [''],
      footerSrc: [''],
    });
    this._productService.apiProductsGet().subscribe((products) => {
      this.products = products.result;
    });
  }

  async ngAfterViewInit() {
    this._drawerService.close();
    this._drawerService.setMode('over');

    const id = this._activatedRoute.snapshot.params.id;
    const template = await this._templateService
      .apiTemplatesIdGet(id)
      .toPromise();
    this.templateData = template;
    this._initTemplateData = template;
    const s = this._renderer2.createElement('script');
    s.async = true;
    s.type = 'module';
    s.src = 'assets/template1.js';
    this._renderer2.appendChild(document.body, s);

    setTimeout(() => {
      const templateBoxes = document.querySelectorAll('swd-root-box');
      templateBoxes.forEach((templateBox) => {
        templateBox.addEventListener(
          'swd-root-box-click',
          (event: CustomEvent) => {
            console.log(event.detail);
            this.configuration = event.detail;
            this.form.patchValue({
              headerTitle: event.detail.headerTitle,
              footerTitle: event.detail.footerTitle,
            });
          }
        );
      });
    }, 1000);
  }
  get stringifiedData(): string {
    return JSON.stringify(this.templateData);
  }
  async headerImageInputChange({
    target,
  }: CustomEvent<HTMLInputElement>): Promise<void> {
    const { files } = target as HTMLInputElement;
    if (!files) return;

    const file = files[0];
    this.headerSrcInput.nativeElement.value = file.name;
  }
  async footerImageInputChange({
    target,
  }: CustomEvent<HTMLInputElement>): Promise<void> {
    const { files } = target as HTMLInputElement;
    if (!files) return;

    const file = files[0];
    this.footerSrcInput.nativeElement.value = file.name;
  }
}
