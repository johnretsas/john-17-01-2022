export interface Store {
    socket: SocketStore
}

export interface SocketStore {
    subscribedProductId: "PI_XBTUSD" | "PI_ETHUSD" | "";
    asks: Array<[number, number]>;
    bids: Array<[number, number]>;
    totalAsks: Array<number>;
    totalBids: Array<number>;
    totalMax: number;
    status: "SUBSCRIBED" | "UNSUBSCRIBED";
    hasNotification: {
        message: string,
        level: "ERROR" | "MESSAGE"
    } | undefined;
}