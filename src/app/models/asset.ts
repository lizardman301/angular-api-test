  // Class to define types for asset from CoinCap api
export type Asset = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
}

// CoinCap api returns the data nested in another object. These two just handle that
export type AllAssetsFromApi = {
    data: Asset[];
    timestamp: number;
}

export type AssetFromApi = {
    data: Asset;
    timestamp: number;
}