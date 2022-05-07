import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AllAssetsFromApi, Asset, AssetFromApi } from './../models/asset'
import { Observable } from 'rxjs';
import { Rate } from './../models/rate';
import { Exchange } from './../models/exchange';
import { AssetHistoryFromApi } from '../models/assetHistory';

// This service is to pull data from the CoinCap api and provide it for our app
// All info for the api can be found here https://docs.coincap.io/
@Injectable({
  providedIn: 'root'
})
export class CoinCapService {

  constructor(private http: HttpClient) { }

  // Add a specific id after this url to only get data for that one currency
  private coinCapAssetsUrl: string = "https://api.coincap.io/v2/assets/";

  // Add a specific id after this url to only get the rates for that one currency
  private coinCapRatesUrl: string = "https://api.coincap.io/v2/rates/";

  // Add a specific id after this url to only get the rates for that one exchange
  private coinCapExchangesUrl: string = "https://api.coincap.io/v2/exchanges/";

  private coinCapMarketsUrl: string = "https://api.coincap.io/v2/markets";

  // Returns an array of all assets from coinCap, ranked from first to last
  getAllAssets(): Observable<AllAssetsFromApi> {
    return this.http.get<AllAssetsFromApi>(this.coinCapAssetsUrl);
  }
  // Returns the asset data of the provided asset id. Returns error message otherwise
  getAsset(id: string | null): Observable<AssetFromApi> {
    // We will default to bitcoin if no id is provided
    if (id == null) id = "bitcoin";

    return this.http.get<AssetFromApi>(this.coinCapAssetsUrl + id);
  }

  // Returns the last year of history for the asset
  getAssetHistory(id: string | null): Observable<AssetHistoryFromApi> {
    if (id == null) id = "bitcoin";

    return this.http.get<AssetHistoryFromApi>(this.coinCapAssetsUrl + id + "/history?interval=d1");
  }

  // Returns an array of all rates from Coin Cap.
  getAllRates(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.coinCapRatesUrl);
  }
  // Returns the rate data of the provided asset id. Returns error message otherwise
  getRate(id: string): Observable<Rate> {
    return this.http.get<Rate>(this.coinCapRatesUrl + id);
  }

  // Returns an array of all exchanges from Coin Cap
  getAllExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(this.coinCapExchangesUrl);
  }
  getExchange(id: string): Observable<Exchange> {
    return this.http.get<Exchange>(this.coinCapExchangesUrl + id);
  }
}
