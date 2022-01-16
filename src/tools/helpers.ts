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

export { calculateMaxTotal }