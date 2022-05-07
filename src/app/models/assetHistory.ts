// Asset History from CoinCap api
export type History = {
    priceUsd: string;
    time: number;
    date: string;
}

// Wrapper type for the data from CoinCap
export type AssetHistoryFromApi = {
    data: History[],
    timestamp: number;
}