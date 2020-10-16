import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components';

const routes: Routes = [
  {
    path: 'templates',
    loadChildren: () =>
      import('./template/template.module').then((m) => m.TemplateModule),
  },
  {
    path: 'screens',
    loadChildren: () =>
      import('./screen/screen.module').then((m) => m.ScreenModule),
  },
  {
    path: 'displays',
    loadChildren: () =>
      import('./display/display.module').then((m) => m.DisplayModule),
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('./store/store.module').then((m) => m.StoreModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'templates', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
