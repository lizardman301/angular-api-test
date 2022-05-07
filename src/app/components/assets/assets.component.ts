import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { AllAssetsFromApi, Asset } from 'src/app/models/asset';
import { CoinCapService } from './../../services/coin-cap.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent {

  public assetsFromApi$: Observable<AllAssetsFromApi>;
  public assets$: Observable<Asset[]>;
  public assets: Asset[] = [];
  public filter = new FormControl('');

  constructor(private coinCapService: CoinCapService, private router: Router) {
    this.assetsFromApi$ = coinCapService.getAllAssets();
    this.assetsFromApi$.subscribe(data => {
      this.assets = data.data
      this.filter.setValue(''); // We do this to force the valueChange in the line below to refresh with the new data
    })

    // This makes the assets$ observable react to the filter text and filter accordingly
    this.assets$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    )
   }

   // When clicking on a row, it will open up a new detail page
   // This is done using the Angular router. Could've been done similar to how the navbar is handled
   // But the Router Plugin allows you to copy paste to that specific asset detail instead of clicking through again.
   assetDetail(asset: Asset){
    let route = 'AssetDetail';
    this.router.navigate([route], {queryParams: {id: asset.id} });
   }

   // Search function for the assets
  search(text: string): Asset[] {
    return this.assets.filter(asset => {
      const term = text.toLowerCase();
      return asset.name.toLowerCase().includes(term)
          || asset.id.includes(term)
          || asset.symbol.toLowerCase().includes(term)
          || asset.priceUsd.includes(term);
    });
}

}
