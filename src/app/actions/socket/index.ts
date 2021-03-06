import { INFO, SUBSCRIBED, FEED, UNSUBSCRIBE, SocketActionTypes, SOCKET_ACTION } from "./types";

export const createSocketAction = (data: any) => {
    return {
        type: SOCKET_ACTION,
        data
    }
}

export const createSocketInfoAction = (data: any) => {
    return {
        type: INFO,
        data
    }
}

export const createSocketSubscribedAction = (data: any) => {
    return {
        type: SUBSCRIBED,
        data
    }
}

export const createSocketSaveFeedAction = (data: any) => {
    return {
        type: FEED,
        data
    }
}

export const createSocketUnsubscribedAction = (data: any) => {
    return {
        type: UNSUBSCRIBE,
        data
    }
}