import { NgModule } from '@angular/core';
import { DisplayRoutingModule } from './display-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DetailComponent, ListingComponent],
  imports: [SharedModule, DisplayRoutingModule],
})
export class DisplayModule {}
