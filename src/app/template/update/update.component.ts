import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { DrawerService } from 'src/app/drawer.service';
import {
  ImageService,
  ProductListTemplateReadDto,
  ProductReadDto,
  StoresService,
  TemplateDetailReadDto,
  TemplatesService,
} from 'src/generated';
import { FormBuilder, FormGroup } from '@angular/forms';
import { convertTemplateDetailReadDtoToTemplateIdPut } from '../shared/utils';
import { BoxDetailTemplateReadDto } from 'src/generated/';
import { MatSelectionList } from '@angular/material/list';

export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'];
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, AfterViewInit {
  @ViewChild('headerSrcInput') headerSrcInput: ElementRef<HTMLInputElement>;
  @ViewChild('headerSrcFileInput') headerSrcFileInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('footerSrcInput') footerSrcInput: ElementRef<HTMLInputElement>;
  @ViewChild('footerSrcFileInput') footerSrcFileInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild(MatSelectionList) selectionList: ElementRef<MatSelectionList>;

  form: FormGroup;
  templateData: TemplateDetailReadDto;
  configuration: any = {};
  configurationType: 'box' = 'box';
  products: ProductReadDto[];
  isConfigurationShow = true;

  private _initTemplateData: TemplateDetailReadDto;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _renderer2: Renderer2,
    private _drawerService: DrawerService,
    private _templateService: TemplatesService,
    private _storeService: StoresService,
    private _imageService: ImageService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      headerTitle: [''],
      headerSrc: [''],
      footerTitle: [''],
      footerSrc: [''],
    });
  }

  async ngAfterViewInit() {
    this._drawerService.close();
    this._drawerService.setMode('over');

    const id = parseInt(this._activatedRoute.snapshot.params.id);
    const template = await this._templateService
      .apiTemplatesIdGet(id)
      .toPromise();
    this._storeService
      .apiStoresIdProductsGet(id, 0, 0)
      .subscribe((products) => {
        this.products = products.result;
      });
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

            this.isConfigurationShow = true;
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

  get selectedItems(): number {
    return this.selectionList?.nativeElement?.selectedOptions.selected.length;
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
    this.form.get('headerSrc').setValue(file);
    this.headerSrcInput.nativeElement.value = file.name;
  }
  async footerImageInputChange({
    target,
  }: CustomEvent<HTMLInputElement>): Promise<void> {
    const { files } = target as HTMLInputElement;
    if (!files) return;

    const file = files[0];
    this.form.get('footerSrc').setValue(file);
    this.footerSrcInput.nativeElement.value = file.name;
  }

  isIncludes(products: ProductReadDto[], productId: ProductReadDto): boolean {
    return products.some((p) => p.id === productId);
  }

  async updateBox(boxId: number) {
    const { headerTitle, headerSrc, footerTitle, footerSrc } = this.form.value;

    // const headerFirebaseUrl = await this._imageService
    //   .apiImagePost(headerSrc)
    //   .toPromise();
    // const footerFirebaseUrl = await this._imageService
    //   .apiImagePost(footerSrc)
    //   .toPromise();

    const oldBox = this.templateData.boxes.find((b) => b.id === boxId);
    const newBox: BoxDetailTemplateReadDto = {
      ...oldBox,
      headerTitle,
      footerTitle,
    };
  }

  updateProductList(
    event: any,
    boxId: number,
    productListId: number,
    productListIndex: number
  ) {
    console.log({ event, productListIndex, productListId, boxId });
    const { option } = event;
    console.log(this.selectionList);

    const oldProductList = this.templateData.boxes
      .find((b) => b.id === boxId)
      .productLists.find((l) => l.id === productListId);
    if (oldProductList.products.length >= oldProductList.maxSize) {
      alert(
        'This product list reached maximum items. Please deselect one & retry.'
      );
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    console.log(event);

    const selectedProducts = this.selectionList.nativeElement.selectedOptions;
    console.log(selectedProducts);

    // const newSelectedProducts {...selectedProducts, }
    const newProductList: ProductListTemplateReadDto = {
      ...oldProductList,
    };
  }

  updateTemplate() {
    this._templateService
      .apiTemplatesIdPut(
        this.templateData.id,
        convertTemplateDetailReadDtoToTemplateIdPut(this.templateData)
      )
      .subscribe();
  }
  goBack() {
    const initJson = JSON.stringify(this._initTemplateData);
    const currentJson = JSON.stringify(this.templateData);
    if (initJson !== currentJson) {
      const result = confirm(
        'All changes will be lost if you go back without saving anything. Are you sure to go back ?'
      );
      if (result) {
        this._router.navigateByUrl('/templates');
      }
    } else this._router.navigateByUrl('/templates');
  }
}
