import { FC } from 'react';
import AsksBids from "./AsksBids";
import Utilities from "./Utilities";
import styles from "./css/Orderbook.module.css";

interface Props {
    ws: WebSocket;
}

const Orderbook: FC<Props> = ({ ws }) => {
    return (
        <div className={styles.container}>
            <AsksBids />
            <Utilities />
        </div>
    );
}

export default Orderbook;