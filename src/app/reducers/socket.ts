import { SocketStore } from '../../types/store';
import { FEED, INFO, SocketActionTypes, SUBSCRIBED } from '../actions/socket/types';

const initialState = {
    subscribedProductId: "",
    asks: [],
    asksSets: {},
    bidsSet: {},
    bids: []
}

export default function socketReducer(state: SocketStore, action: SocketActionTypes) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch (action.type) {
        case INFO:
            console.log("INFO", action.data)
            return {
                ...state
            }

        case SUBSCRIBED:
            console.log("SUBSCRIBED", action.data)
            const { product_ids } = action.data
            console.log({ product: product_ids[0] })
            return {
                ...state,
                subscribedProductId: product_ids[0]
            }

        case FEED:
            const {
                data: {
                    numLevels,
                    asks,
                    bids
                }
            } = action;

            // If numLevels then initial state of orderbook.
            let newAsksSet = { ...state.asksSet };
            let removeZeroesFromAsk = [...state.asks];
            let removeZeroesFromBid = [...state.bids];
            let newBidsSet = { ...state.bidsSet };

            if (numLevels) {
                for (let ask of asks) {
                    newAsksSet[ask[0]] = ask[1]
                }
                for (let bid of bids) {
                    newBidsSet[bid[0]] = bid[1]
                }

                return {
                    ...state,
                    asks,
                    asksSet: newAsksSet,
                    bidsSet: newBidsSet,
                    bids
                }

            } else {

                let findAllZeroesAsks = asks.filter(ask => ask[1] === 0);
                let updatesOnPricesAsks = asks.filter(ask => ask[1] != 0);

                let findAllZeroesBids = bids.filter(bid => bid[1] === 0);
                let updatesOnPricesBids = bids.filter(bid => bid[1] != 0);

                // Remove the prices that have size zero - asks
                for (let zero of findAllZeroesAsks) {
                    for (let i = 0; i < state.asks.length; i++) {
                        if (zero[0] === state.asks[i][0]) {
                            removeZeroesFromAsk.splice(i, 1)
                        }
                    }
                }

                // Remove the prices that have size zero - bids
                for (let zero of findAllZeroesBids) {
                    for (let i = 0; i < state.bids.length; i++) {
                        if (zero[0] === state.bids[i][0]) {
                            removeZeroesFromBid.splice(i, 1)
                        }
                    }
                }

                // Update or add prices with their new size - asks
                for (let update of updatesOnPricesAsks) {
                    let notUpdatedYet = true;
                    for (let i = 0; i < removeZeroesFromAsk.length; i++) {
                        if (update[0] === removeZeroesFromAsk[i][0]) {
                            removeZeroesFromAsk[i] = update
                            notUpdatedYet = false;
                        }
                    }
                    if (notUpdatedYet) removeZeroesFromAsk.push(update)
                }

                // Update or add prices with their new size - bids
                for (let update of updatesOnPricesBids) {
                    let notUpdatedYet = true;
                    for (let i = 0; i < removeZeroesFromBid.length; i++) {
                        if (update[0] === removeZeroesFromBid[i][0]) {
                            removeZeroesFromBid[i] = update
                            notUpdatedYet = false;
                        }
                    }
                    if (notUpdatedYet) removeZeroesFromBid.push(update)
                }

                removeZeroesFromAsk.sort((a, b) => b[0] - a[0]);
                removeZeroesFromBid.sort((a, b) => a[0] - b[0]);
                // console.log(removeZeroesFromAsk)
            }
            return {
                ...state,
                asks: removeZeroesFromAsk,
                asksSet: newAsksSet,
                bids: removeZeroesFromBid,
                bidsSet: newBidsSet
            }
        default:
            return {
                ...state
            }

    }

}