import { FC } from "react";
import { useSelector } from "react-redux";
import { Store } from "../types/store";
import styles from "./css/Asks.module.css";

const Asks = () => {
    const socketStore = useSelector((store: Store) => store.socket);
    const { asks } = socketStore;
    let descendingAsks = asks.sort((a, b) => b[0] - a[0])
    return (
        <div className={styles.asks}>
            <AsksHeader />
            {
                descendingAsks.map((ask, i) => <AskDataRow ask={ask} key={i}/>)
            }
        </div>
    )
}

const AsksHeader = () => {
    return (
        <div className={styles.asksHeader}>
            <div className={styles.headerPart}>Total</div>
            <div className={styles.headerPart}>Size</div>
            <div className={styles.headerPart}>Price</div>
        </div>
    )
}

interface AskDataRowProps {
    ask: [number, number];
}

const AskDataRow:FC<AskDataRowProps> = ({ask}) => {
    return (
        <div className={styles.asksHeader}>
            <div className={styles.dataPart}>ToDo</div>
            <div className={styles.dataPart}>{ask[1]}</div>
            <div className={styles.dataPart + " " + styles.price}>{ask[0]}</div>
        </div>
    )
}

export default Asks;