export interface Store {
    socket: SocketStore
}

export interface SocketStore {
    subscribedProductId: string
    asks: Array<[number, number]>
    asksSet: any;
    bidsSet: any;
    bids: Array<[number, number]>;
    totalAsks: Array<number>;
    totalBids: Array<number>;
    totalMax: number;
}