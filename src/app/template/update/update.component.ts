import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { DrawerService } from 'src/app/drawer.service';
import {
  ImageService,
  ProductListReadDto,
  ProductReadDto,
  ProductTemplateReadDto,
  StoresService,
  TemplateDetailReadDto,
  TemplatesService,
} from 'src/generated';
import { FormBuilder, FormGroup } from '@angular/forms';
import { convertTemplateDetailReadDtoToTemplateIdPut } from '../shared/utils';
import { BoxDetailTemplateReadDto } from 'src/generated/';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackBarSuccessComponent,
  SnackBarWarnComponent,
} from 'src/app/shared/components';
import { isEqual } from 'lodash';

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
  tempTemplateData: TemplateDetailReadDto;
  configuration: any = {};
  configurationType: 'box' = 'box';
  products: ProductReadDto[];
  isConfigurationShow = true;
  currentSelectedCount = 5;

  private _initTemplateData: TemplateDetailReadDto;
  private _setupEventListenersInterval: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _renderer2: Renderer2,
    private _drawerService: DrawerService,
    private _templateService: TemplatesService,
    private _storeService: StoresService,
    private _imageService: ImageService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _changeDetector: ChangeDetectorRef
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
    this.tempTemplateData = template;
    this._initTemplateData = template;
    const s = this._renderer2.createElement('script');
    s.async = true;
    s.type = 'module';
    s.src = 'assets/template1.js';
    this._renderer2.appendChild(document.body, s);

    this._setupEventListenersInterval = setInterval(() => {
      const templateBoxes = document.querySelectorAll('swd-root-box');
      if (templateBoxes) {
        templateBoxes.forEach((templateBox) => {
          templateBox.addEventListener(
            'swd-root-box-click',
            ({ detail }: CustomEvent) => {
              console.log(detail);

              this.isConfigurationShow = true;
              this.configuration = detail;
              this.form.patchValue({
                headerTitle: detail.headerTitle,
                footerTitle: detail.footerTitle,
              });
            }
          );
        });
        clearInterval(this._setupEventListenersInterval);
      }
    }, 1000);
  }

  get selectedItemsLength(): number {
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

  async updateBox() {
    const { id: boxId } = this.configuration;
    const { headerTitle, headerSrc, footerTitle, footerSrc } = this.form.value;

    // const headerFirebaseUrl = await this._imageService
    //   .apiImagePost(headerSrc)
    //   .toPromise();
    // const footerFirebaseUrl = await this._imageService
    //   .apiImagePost(footerSrc)
    //   .toPromise();

    const oldBoxIndex = this.tempTemplateData.boxes.findIndex(
      (b) => b.id !== boxId
    );
    const newBox: BoxDetailTemplateReadDto = {
      ...this.tempTemplateData.boxes[oldBoxIndex],
      headerTitle,
      footerTitle,
    };
    this.tempTemplateData.boxes[oldBoxIndex] = newBox;
    this.templateData = this.tempTemplateData;
    this.tempTemplateData = undefined;
  }

  productListChange(event: any, productListId: number) {
    const { id: boxId } = this.configuration;
    const { value: selectedProductId, selected } = event.option;
    const oldProducts = this.tempTemplateData.boxes
      .find((b) => b.id === boxId)
      .productLists.find((l) => l.id === productListId).products;
    let newProducts: ProductTemplateReadDto[] = oldProducts.filter(
      (p) => p.id !== selectedProductId
    );
    if (selected) {
      const product = this.products.find((p) => p.id === selectedProductId);
      newProducts = [...oldProducts, product];
      this.updateProductList(boxId, productListId, newProducts);
    } else {
      this.updateProductList(boxId, productListId, newProducts);
    }
  }

  updateProductList(
    boxId: number,
    productListId: number,
    newProducts: ProductListReadDto[]
  ) {
    this.tempTemplateData.boxes
      .find((b) => b.id === boxId)
      .productLists.find((l) => l.id === productListId).products = newProducts;
  }

  updateTemplate() {
    this._templateService
      .apiTemplatesIdPut(
        this.templateData.id,
        convertTemplateDetailReadDtoToTemplateIdPut(this.templateData)
      )
      .subscribe(() => {
        this._snackBar.openFromComponent(SnackBarSuccessComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-success',
          data: { title: 'Success !', message: 'Update template successfully' },
        });
      });
  }
  goBack() {
    const isNotChanged = isEqual(this.templateData, this._initTemplateData);
    if (!isNotChanged) {
      const result = confirm(
        'All changes will be lost if you go back without saving anything. Are you sure to go back ?'
      );
      if (result) {
        this._router.navigateByUrl('/templates');

        this._snackBar.openFromComponent(SnackBarWarnComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-warn',
          data: {
            title: 'Discarded !',
            message: 'Updating template is discarded.',
          },
        });
      }
    } else this._router.navigateByUrl('/templates');
  }

  getTemplateDataForUI() {
    return JSON.stringify(this.tempTemplateData ?? this.templateData);
  }
}
