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

  productListChange(
    event: any,
    boxId: number,
    productListId: number,
    productListIndex: number
  ) {
    this.templateData = JSON.parse(
      `{"id":1,"name":"Demo Template","description":"Demo Template","storeId":1,"createdTime":"2020-10-07T12:13:43.373","uilink":null,"boxes":[{"id":1,"templateId":1,"boxType":{"id":1,"name":"product","description":"contain product list"},"location":1,"src":"","headerTitle":null,"footerTitle":null,"headerSrc":"https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","footerSrc":null,"productLists":[{"id":1,"title":"Todays Specials","boxId":1,"maxSize":5,"location":1,"products":[{"id":21,"title":"Smoked Pastrami","description":"Smoked pastrami, cheese, onion","price":8.9900,"src":null,"location":1},{"id":22,"title":"The Italian","description":"Salami, Sliced Parmigiano Reggiano","price":6.9900,"src":null,"location":2},{"id":23,"title":"The Favorite","description":"Ham, Provoline, Roma Tomatoes","price":6.9900,"src":null,"location":3},{"id":24,"title":"Big Bird","description":"Turkey, Swiss, Cheedar, Avocado","price":5.9900,"src":null,"location":4},{"id":25,"title":"Albacore Tuna","description":"Albacore Tuna, Swiss, Romaine","price":7.9900,"src":null,"location":5}]}]},{"id":2,"templateId":1,"boxType":{"id":1,"name":"product","description":"contain product list"},"location":2,"src":"","headerTitle":"","footerTitle":"","headerSrc":"","footerSrc":"","productLists":[{"id":5,"title":"Made Fress","boxId":2,"maxSize":5,"location":1,"products":[{"id":26,"title":"BBQ Special","description":"BBQ Special","price":5.4900,"src":null,"location":1},{"id":27,"title":"The Big Roy","description":"Eggs, Prosclutta, Melted Swiss","price":6.9900,"src":null,"location":2},{"id":28,"title":"The Hawaiian","description":"Goat Cheese, Turkey, Spinach","price":5.9900,"src":null,"location":3},{"id":29,"title":"The Don","description":"Albacore Tuna, Melted Swiss Cheese","price":5.9900,"src":null,"location":4},{"id":30,"title":"Meatball Marianara","description":"Meatball, Tomato Sauce, Mazzaralla","price":6.9900,"src":null,"location":5}]},{"id":6,"title":"Quick Pick","boxId":2,"maxSize":4,"location":2,"products":[{"id":31,"title":"Chicken Wrap","description":"","price":4.9900,"src":null,"location":1},{"id":32,"title":"The Sarah","description":"","price":5.9900,"src":null,"location":2},{"id":33,"title":"Scotty Rock","description":"","price":5.9900,"src":null,"location":3},{"id":34,"title":"The Unusual","description":"","price":6.9900,"src":null,"location":4}]}]},{"id":3,"templateId":1,"boxType":{"id":1,"name":"product","description":"contain product list"},"location":3,"src":"","headerTitle":"","footerTitle":"","headerSrc":"","footerSrc":"https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","productLists":[{"id":7,"title":"Healthy Eating","boxId":3,"maxSize":5,"location":1,"products":[{"id":35,"title":"London Sp.","description":"Iceberg, Radatone pasta","price":6.9900,"src":null,"location":1},{"id":36,"title":"Veggie Delight","description":"Albacore Tuna, Melted Swiss Cheese","price":5.9900,"src":null,"location":2},{"id":37,"title":"The 510","description":"With whipped cream","price":6.4900,"src":null,"location":3},{"id":38,"title":"Taco Wrap","description":"Albacone Tuna, Swiss, Rotaine","price":6.9900,"src":null,"location":4},{"id":39,"title":"The Greak","description":"Albacone Tuna, Melted Swiss Cheese","price":10.9900,"src":null,"location":5}]}]}]}`
    );

    console.log({ event, productListIndex, productListId, boxId });
    const { value: selectedProductId, selected } = event.option;
    console.log(selectedProductId, selected);

    const oldProducts = this.templateData.boxes
      .find((b) => b.id === boxId)
      .productLists.find((l) => l.id === productListId).products;
    let newProducts: ProductTemplateReadDto[] = [];
    if (selected) {
      const product = this.products.find((p) => p.id === selectedProductId);
      newProducts = [...oldProducts, product];
      this.updateProductList(boxId, productListId, newProducts);
    } else {
      newProducts = oldProducts.filter((p) => p.id !== selectedProductId);
      this.updateProductList(boxId, productListId, newProducts);
    }
  }

  updateProductList(
    boxId: number,
    productListId: number,
    newProducts: ProductListReadDto[]
  ) {
    this.templateData.boxes
      .find((b) => b.id === boxId)
      .productLists.find((l) => l.id === productListId).products = newProducts;
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
