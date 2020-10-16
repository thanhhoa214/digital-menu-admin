import { NgModule } from '@angular/core';
import { TemplateRoutingModule } from './template-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ListingComponent, DetailComponent],
  imports: [SharedModule, TemplateRoutingModule],
})
export class TemplateModule {}
