import Asks from "./Asks";
import Bids from "./Bids";
import styles from "./css/AsksBids.module.css";

const AsksBids = () => {
    return (
        <div className={styles.container} data-testid="asksbids">
            <Asks />
            <Bids />
        </div>
    )
}

export default AsksBids;