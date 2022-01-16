export const INFO = "INFO";
export const SUBSCRIBED = "SUBSCRIBED";
export const FEED = "FEED"
export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const SOCKET_ACTION = "SOCKET_ACTION";

export interface FeedData {
    asks: Array<[number, number]>;
    bids: Array<[number, number]>;
    feed: string;
    numLevels?: number;
    product_id: string;
}

export interface InfoData { }
export interface SubscribeData {
    product_ids: string[];
}

export interface UnsubscribeData {
    product_ids: string[];
}

interface SocketInfo {
    type: typeof INFO;
    data: InfoData;
}

interface SocketSubscribe {
    type: typeof SUBSCRIBED;
    data: SubscribeData;
}
interface SocketUnsubscribe {
    type: typeof UNSUBSCRIBE;
    data: UnsubscribeData;
}

interface SaveFeedData {
    type: typeof FEED
    data: FeedData
}

export type SocketActionTypes = SocketInfo | SocketSubscribe | SocketUnsubscribe | SaveFeedData;