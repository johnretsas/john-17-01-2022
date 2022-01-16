import { FC } from "react";
import { useSelector } from "react-redux";
import { Store } from "../types/store";
import styles from "./css/Bids.module.css";


const Bids = () => {
    const socketStore = useSelector((store: Store) => store.socket);
    const { bids, totalBids, totalMax } = socketStore;
    let descendingBids = bids.sort((a, b) => a[0] - b[0])
    return (
        <div className={styles.bids}>
            <BidsHeader />
            {
                descendingBids.map((bid, i) => <BidDataRow bid={bid} key={i} total={totalBids[i]} totalMax={totalMax} />)
            }
        </div>
    );
}

const BidsHeader = () => {
    return (
        <div className={styles.bidsHeader}>
            <div className={styles.headerPart}>Price</div>
            <div className={styles.headerPart}>Size</div>
            <div className={styles.headerPart}>Total</div>
        </div>
    )
}

interface BidDataRowProps {
    bid: [number, number];
    total: number;
    totalMax: number;
}

const BidDataRow: FC<BidDataRowProps> = ({ bid, total, totalMax }) => {
    const depth = ((total / totalMax) * 100);
    const valueForBackgroundColorWidth = depth;
    return (
        <div className={styles.bidsHeader} style={
            {
                background: `linear-gradient(90deg, #CC003320 ${valueForBackgroundColorWidth}%, #202020 ${valueForBackgroundColorWidth}%)`
            }}>
            <div className={styles.dataPart + " " + styles.price}>{bid[0]}</div>
            <div className={styles.dataPart}>{bid[1]}</div>
            <div className={styles.dataPart}>{total}</div>
        </div>
    )
}

export default Bids;