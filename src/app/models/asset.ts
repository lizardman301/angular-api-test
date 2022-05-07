export type Asset = {
    // Class to define types for asset from Coin-Cap api
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

export type AllAssetsFromApi = {
    data: Asset[];
    timestamp: number;
}

export type AssetFromApi = {
    data: Asset;
    timestamp: number;
}