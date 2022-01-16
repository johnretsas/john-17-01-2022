import { subscribe } from "../../tools/helpers";
import { SocketStore, Store } from "../../types/store";
import { FEED, SocketActionTypes, SUBSCRIBED, UNSUBSCRIBE } from "../actions/socket/types";
import socket, { initialState } from "../reducers/socket";

const subscribeAction: SocketActionTypes = {
    type: SUBSCRIBED,
    data: {
        product_ids: ["PI_ETHUSD"]
    }
}

const unsubscribeAction: SocketActionTypes = {
    type: UNSUBSCRIBE,
    data: {
        product_ids: ["PI_ETHUSD"]
    }
}

const feedActionWithZeroes: SocketActionTypes = {
    type: FEED,
    data: {
        asks: [[1, 0]],
        bids: [[5, 0]],
        feed: "test_feed",
        numLevels: undefined,
        product_id: "PI_ETHUSD"
    }
}

const feedActionExtraPrices: SocketActionTypes = {
    type: FEED,
    data: {
        asks: [[4, 100]],
        bids: [[7, 100]],
        feed: "test_feed",
        numLevels: undefined,
        product_id: "PI_ETHUSD"
    }
}

const stateWithData: SocketStore = {
    asks: [[1, 100], [2, 100], [3, 100]],
    bids: [[4, 100], [5, 100], [6, 100]],
    subscribedProductId: "PI_ETHUSD",
    totalAsks: [100, 200, 300],
    totalBids: [100, 200, 300],
    totalMax: 300,
    hasNotification: undefined,
    status: "SUBSCRIBED"
}

describe("Reducer testing", () => {
    it("subscribe", () => {
        const res = socket(initialState, subscribeAction)
        let expectedState = {
            ...initialState,
            subscribedProductId: "PI_ETHUSD"
        };

        expect(res.subscribedProductId).toBe(expectedState.subscribedProductId)
    });

    it("unsubscribe", () => {
        const res = socket({ ...initialState, subscribedProductId: "PI_ETHUSD" }, unsubscribeAction)
        let expectedState = {
            ...initialState,
            subscribedProductId: "PI_ETHUSD"
        };

        expect(res.subscribedProductId).toBe(expectedState.subscribedProductId)
    });

    it("removes prices with zero size", () => {
        const res = socket(stateWithData, feedActionWithZeroes);
        expect(JSON.stringify(res.asks)).toBe(JSON.stringify([[3, 100], [2, 100]]));
        expect(JSON.stringify(res.bids)).toBe(JSON.stringify([[4, 100], [6, 100]]));
        expect(JSON.stringify(res.totalBids)).toBe(JSON.stringify([100, 200]));
        expect(JSON.stringify(res.totalAsks)).toBe(JSON.stringify([100, 200]));
        expect(res.totalMax).toBe(200)
    });

    it("adds prices correctly", () => {
        const res = socket(stateWithData, feedActionExtraPrices);
        expect(JSON.stringify(res.asks)).toBe(JSON.stringify([[4, 100], [3, 100], [2, 100], [1,100]]));
        expect(JSON.stringify(res.bids)).toBe(JSON.stringify([[4, 100], [5, 100], [6, 100], [7,100]]));
        expect(JSON.stringify(res.totalBids)).toBe(JSON.stringify([100, 200, 300, 400]));
        expect(JSON.stringify(res.totalAsks)).toBe(JSON.stringify([100, 200, 300, 400]));
        expect(res.totalMax).toBe(400)
    });
})