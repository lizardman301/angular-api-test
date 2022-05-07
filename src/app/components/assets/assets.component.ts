import { Component, PipeTransform } from '@angular/core';
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
      this.filter.setValue(''); // We do this to force teh valueChange in the line below to refresh with the new data
    })

    this.assets$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    )
   }

   // When clicking on a row, it will open up a new detail page
   assetDetail(asset: Asset){
    let route = 'AssetDetail';
    this.router.navigate([route], {queryParams: {id: asset.id} });
   }

   // Search function for the coins
  search(text: string): Asset[] {
    return this.assets.filter(asset => {
      const term = text.toLowerCase();
      return asset.name.toLowerCase().includes(term)
          || asset.id.includes(term)
          || asset.symbol.toLowerCase().includes(term);
    });
}

}
