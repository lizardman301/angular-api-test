import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetsComponent } from './components/assets/assets.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { AssetLineChartComponent } from './components/asset-line-chart/asset-line-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    AssetDetailComponent,
    AboutComponent,
    AssetLineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgChartsModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
