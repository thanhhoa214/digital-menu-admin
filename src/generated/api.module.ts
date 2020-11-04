import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountRolesService } from './api/accountRoles.service';
import { AccountsService } from './api/accounts.service';
import { AuthenticationService } from './api/authentication.service';
import { BoxTypesService } from './api/boxTypes.service';
import { BoxesService } from './api/boxes.service';
import { ImageService } from './api/image.service';
import { ProductListProductsService } from './api/productListProducts.service';
import { ProductListsService } from './api/productLists.service';
import { ProductsService } from './api/products.service';
import { ScreenTemplatesService } from './api/screenTemplates.service';
import { ScreensService } from './api/screens.service';
import { StoresService } from './api/stores.service';
import { TemplatesService } from './api/templates.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
