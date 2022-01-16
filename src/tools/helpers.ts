const calculateMaxTotal = (totalAsks: number[], totalBids: number[]) => {
    let max = -Infinity;
    for (let ask of totalAsks) {
        if (ask > max) {
            max = ask;
        }
    }
    for (let bid of totalBids) {
        if (bid > max) {
            max = bid;
        }
    }
    return max;
}

const subscribe = (ws: WebSocket, product_id: string) => {
    ws.send(JSON.stringify({ "event": "subscribe", "feed": "book_ui_1", "product_ids": [product_id] }));
}

const unsubscribe = (ws: WebSocket, product_id: string) => {
    ws.send(JSON.stringify({ "event": "unsubscribe", "feed": "book_ui_1", "product_ids": [product_id] }));
}

declare let document: any;

export function getBrowserVisibilityProp() {
    if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support
        return "visibilitychange"
    } else if (typeof document.msHidden !== "undefined") {
        return "msvisibilitychange"
    } else if (typeof document.webkitHidden !== "undefined") {
        return "webkitvisibilitychange"
    }
}

export function getBrowserDocumentHiddenProp() {
    if (typeof document.hidden !== "undefined") {
        return "hidden"
    } else if (typeof document.msHidden !== "undefined") {
        return "msHidden"
    } else if (typeof document.webkitHidden !== "undefined") {
        return "webkitHidden"
    } else return ""
}

export function getIsDocumentHidden() {
    return (!document[getBrowserDocumentHiddenProp()])
}

export { calculateMaxTotal, subscribe, unsubscribe }