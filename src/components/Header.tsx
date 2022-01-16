import SubscribedProduct from "./SubscribedProduct";
import styles from "./css/Header.module.css";

const Header = () => {
    return (
        <div className={styles.container}>
            <div>Ordebook</div>
            <div>Spread: TO DO %</div>
            <SubscribedProduct />
        </div>
    )
}

export default Header;