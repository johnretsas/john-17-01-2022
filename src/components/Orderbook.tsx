import { FC } from 'react';
import AsksBids from "./AsksBids";
import Utilities from "./Utilities";
import SnackBar from "./SnackBar";
import styles from "./css/Orderbook.module.css";
import { useSelector } from 'react-redux';
import { Store } from '../types/store';

interface Props {
    ws: WebSocket;
    isVisible: boolean;
}

const Orderbook: FC<Props> = ({ ws, isVisible }) => {
    const hasNotification = useSelector((store: Store) => store.socket.hasNotification)
    return (
        <div className={styles.container}>
            <AsksBids />
            <Utilities
                ws={ws}
                isVisible={isVisible}
            />
            {
                hasNotification ?
                    <SnackBar hasNotification={hasNotification} />
                    : null
            }
        </div>
    );
}

export default Orderbook;