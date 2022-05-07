export type Exchange = {
    // Class to define types for asset from Coin-Cap api
    id: string;
    name: string;
    rank: string;
    percentTotalVolume: string;
    volumeUsd: string;
    tradingPairs: string;
    socket: boolean;
    exchangeUrl: string;
    updated: number;
}
