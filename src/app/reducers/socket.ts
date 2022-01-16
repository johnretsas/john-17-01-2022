
import { SocketStore } from '../../types/store';
import { FEED, INFO, SocketActionTypes, SUBSCRIBED } from '../actions/socket/types';
import { calculateMaxTotal } from '../../tools/helpers';

const initialState = {
    subscribedProductId: "",
    asks: [],
    asksSets: {},
    bidsSet: {},
    bids: [],
    totalAsks: [],
    totalBids: [],
    totalMax: 0,
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

            let newAsksSet = { ...state.asksSet };
            let removeZeroesFromAsk = [...state.asks];
            let removeZeroesFromBid = [...state.bids];
            let newBidsSet = { ...state.bidsSet };
            let newTotalAsks = [...state.totalAsks];
            let newTotalBids = [...state.totalBids];

            // If numLevels then initial state of orderbook.
            if (numLevels) {
                console.log(numLevels)
                for (let ask of asks) {
                    newAsksSet[ask[0]] = ask[1]
                }
                for (let bid of bids) {
                    newBidsSet[bid[0]] = bid[1]
                }

                //  Sort the arrays of asks and bids.
                asks.sort((a, b) => b[0] - a[0]);
                bids.sort((a, b) => a[0] - b[0]);

                for (let i = 0; i < asks.length; i++) {
                    // Calculate totals
                    if (i === 0) {
                        newTotalAsks[0] = asks[i][1]
                    } else {
                        newTotalAsks[i] = newTotalAsks[i - 1] + asks[i][1]
                    }
                }

                for (let i = 0; i < bids.length; i++) {
                    // Calculate totals
                    if (i === 0) {
                        newTotalBids[0] = bids[i][1]
                    } else {
                        newTotalBids[i] = newTotalBids[i - 1] + bids[i][1]
                    }
                }

                return {
                    ...state,
                    asks,
                    asksSet: newAsksSet,
                    bidsSet: newBidsSet,
                    bids,
                    totalAsks: newTotalAsks,
                    totalBids: newTotalBids
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

                // Sort the arrays 

                removeZeroesFromAsk.sort((a, b) => b[0] - a[0]);
                removeZeroesFromBid.sort((a, b) => a[0] - b[0]);

                // Calculate new totals for asks

                for (let i = 0; i < removeZeroesFromAsk.length; i++) {
                    // Calculate totals
                    if (i === 0) {
                        newTotalAsks[0] = removeZeroesFromAsk[i][1]
                    } else {
                        newTotalAsks[i] = newTotalAsks[i - 1] + removeZeroesFromAsk[i][1]
                    }
                }

                // Calculate new totals for bids.

                for (let i = 0; i < removeZeroesFromBid.length; i++) {
                    // Calculate totals
                    if (i === 0) {
                        newTotalBids[0] = removeZeroesFromBid[i][1]
                    } else {
                        newTotalBids[i] = newTotalBids[i - 1] + removeZeroesFromBid[i][1]
                    }
                }

                // Calculate max total

            }
            const newMax = calculateMaxTotal(newTotalAsks, newTotalBids);
            return {
                ...state,
                asks: removeZeroesFromAsk,
                asksSet: newAsksSet,
                bids: removeZeroesFromBid,
                bidsSet: newBidsSet,
                totalAsks: newTotalAsks,
                totalBids: newTotalBids,
                totalMax: newMax
            }
        default:
            return {
                ...state
            }

    }

}