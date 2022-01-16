import SubscribedProduct from "./SubscribedProduct";
import styles from "./css/Header.module.css";
import { useSelector } from "react-redux";
import { Store } from "../types/store";


const Header = () => {
    const socketStore = useSelector((store: Store) => store.socket)
    const { asks, bids } = socketStore;
    if (asks.length > 0 && bids.length > 0) {
        const spread = Math.abs(asks[0][0] - bids[0][0]);
        const average = (asks[0][0] + bids[0][0]) / 2;
        const spreadPercentage = (spread / average) * 100;
        return (
            <div className={styles.container}>
                <div>Orderbook</div>
                <div>Spread: {spread.toFixed(5)} ({spreadPercentage.toFixed(2)}) %</div>
                <SubscribedProduct />
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <div>Orderbook</div>
                <div>Spread: ()%</div>
                <SubscribedProduct />
            </div>
        )
    }
}

export default Header;