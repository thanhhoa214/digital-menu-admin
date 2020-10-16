import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListingComponent, DetailComponent],
  imports: [AccountRoutingModule, SharedModule],
})
export class AccountModule {}
