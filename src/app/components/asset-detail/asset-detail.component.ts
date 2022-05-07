import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { CoinCapService } from './../../services/coin-cap.service';
import { Asset, AssetFromApi } from 'src/app/models/asset';

type CardRow = {
  name: string;
  content: string | null;
}

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent {
  // Declare an empty asset first
  public asset = {} as Asset;
  public cardContent: CardRow[] = [];

  //Used to manage form about converting one asset to usd
  public dollarAmountOfAsset: number = 0;
  //Used to keep track of amount in text box
  public amountOfAsset: string = '0';

  constructor(private coinCapService: CoinCapService, private route: ActivatedRoute, private currencyPipe: CurrencyPipe) {
    // Get asset based off the id provided in the URL
    let asset$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) =>
        this.coinCapService.getAsset(params.get('id'))
      )
    );

    // Intializes the card content based off the endpoint from coin cap
    asset$.subscribe( (data: AssetFromApi) => {
        this.asset = data.data;
        
        this.cardContent = [
          {name: "Id", content: this.asset.id},
          {name: "Rank", content: this.asset.rank},
          {name: "Symbol", content: this.asset.symbol},
          {name: "Supply", content: this.asset.supply},
          {name: "Max Supply", content: this.asset.maxSupply},
          {name: "Market Cap USD", content: this.usdTransform(this.asset.marketCapUsd)},
          {name: "Volume USD (in past 24 hours)", content: this.usdTransform(this.asset.volumeUsd24Hr)},
          {name: "Price USD", content: this.usdTransform(this.asset.priceUsd)},
          {name: "Value changes (in past 24 hours)", content: this.asset.changePercent24Hr},
          {name: "Volume Weighted Average Price (in past 24 hours)", content: this.usdTransform(this.asset.vwap24Hr)}
         ]

        // We want to force a recalculation with the new info in case this is already loaded
        this.calculateUSD(this.amountOfAsset);
      }
    )
   }

   // Converts all USD values into a standard version with dollar sign and same decimal position
   usdTransform(money: string): string| null{
    return this.currencyPipe.transform(money);
   }

   // Used to see if a field is empty. Mainly for the Max Supply as some coins will not have a max suply associated with them
   isEmpty(content: string | null): boolean {
     if (content == null) return true;
     return false;
   }

   // This will use the Asset's price in usd to convert the number of assets into a total USD value
   // Replaces second value of the form
   calculateUSD(num: string){
      // Update local value for tracking
      this.amountOfAsset = num;
      // Both the input number and the asset priceUsd are strings, so we must convert them for use
      this.dollarAmountOfAsset = parseFloat(this.amountOfAsset) * parseFloat(this.asset.priceUsd);
   }
}
