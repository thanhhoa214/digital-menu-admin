import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import {
  ApiModule,
  Configuration,
  // ConfigurationParameters,
} from 'src/generated';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { HttpClientModule } from '@angular/common/http';

// export function apiConfigFactory(): Configuration {
//   const params: ConfigurationParameters = {};
//   return new Configuration(params);
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ApiModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: (tokenService: TokenService) =>
        new Configuration({
          basePath: environment.API_URL,
          accessToken: tokenService
            .snapshot()
            .getAccessToken.bind(tokenService),
        }),
      deps: [TokenService],
      multi: false,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
