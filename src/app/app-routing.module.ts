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
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
