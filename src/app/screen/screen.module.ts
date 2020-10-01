import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRoutingModule } from './screen-routing.module';
import { ScreenComponent } from './screen.component';


@NgModule({
  declarations: [ScreenComponent],
  imports: [
    CommonModule,
    ScreenRoutingModule
  ]
})
export class ScreenModule { }
