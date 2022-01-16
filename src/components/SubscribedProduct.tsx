import { useSelector } from "react-redux";
import { Store } from "../types/store";

import styles from "./css/SubscribedProduct.module.css";

const SubscribedProduct = () => {
    
    const socketStore = useSelector((store: Store) => store.socket);

    return (
        <div className={styles.container}>
            {socketStore.subscribedProductId}
        </div>
    )
}

export default SubscribedProduct;