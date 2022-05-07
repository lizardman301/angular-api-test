import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';

const routes: Routes = [
  {path: 'AssetDetail', component: AssetDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
