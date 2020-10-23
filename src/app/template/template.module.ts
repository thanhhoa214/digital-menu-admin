import { NgModule } from '@angular/core';
import { TemplateRoutingModule } from './template-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { ImageModalComponent } from './shared/components/image-modal/image-modal.component';

@NgModule({
  declarations: [ListingComponent, DetailComponent, ImageModalComponent],
  imports: [SharedModule, TemplateRoutingModule],
})
export class TemplateModule {}
