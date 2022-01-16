import SubscribedProduct from "./SubscribedProduct";
import styles from "./css/Header.module.css";
import { useSelector } from "react-redux";
import { Store } from "../types/store";


const Header = () => {
    const socketStore = useSelector((store: Store) => store.socket)
    const { asks, bids } = socketStore;
    const spread = Math.abs(asks[0][0] - bids[0][0]);
    const average = (asks[0][0] + bids[0][0]) / 2;
    const spreadPercentage = (spread / average) * 100;
    return (
        <div className={styles.container}>
            <div>Ordebook</div>
            <div>Spread: {spread} ({spreadPercentage.toFixed(2)}) %</div>
            <SubscribedProduct />
        </div>
    )
}

export default Header;