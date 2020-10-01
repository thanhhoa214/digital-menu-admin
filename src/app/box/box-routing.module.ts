import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxComponent } from './box.component';

const routes: Routes = [{ path: '', component: BoxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxRoutingModule { }
