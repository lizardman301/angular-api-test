export type History = {
    priceUsd: string;
    time: number;
    date: string;
}

export type AssetHistoryFromApi = {
    data: History[],
    timestamp: number;
}