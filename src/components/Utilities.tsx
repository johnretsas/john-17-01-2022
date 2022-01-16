import { FC, useState, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { subscribe, unsubscribe } from "../tools/helpers";
import { usePageVisibility } from "../tools/hooks";
import { Store } from "../types/store";
import styles from "./css/Utilities.module.css";

interface Props {
    ws: WebSocket;
    isVisible: boolean;
}

const Utilities: FC<Props> = ({ ws, isVisible }) => {
    const socketStore = useSelector((store: Store) => store.socket);
    const [killFeedStatus, setKillFeedStatus] = useState<"Kill Feed" | "Connect Back">("Kill Feed");
    const { subscribedProductId } = socketStore;

    useEffect(() => {
        if (!isVisible && socketStore.status === "SUBSCRIBED") killFeed();
    }, [isVisible]);

    const killFeed = () => {
        if (killFeedStatus === "Kill Feed") {
            unsubscribe(ws, subscribedProductId);
            setKillFeedStatus("Connect Back")
        } else {
            subscribe(ws, subscribedProductId)
            setKillFeedStatus("Kill Feed");
        }
    }

    const toggleFeed = () => {

        if (killFeedStatus === "Connect Back") {
            subscribe(ws, subscribedProductId);
            setKillFeedStatus("Kill Feed")
        }
        if (subscribedProductId === "PI_XBTUSD") {
            unsubscribe(ws, subscribedProductId);
            subscribe(ws, "PI_ETHUSD");
        } else if (subscribedProductId === "PI_ETHUSD") {
            unsubscribe(ws, subscribedProductId);
            subscribe(ws, "PI_XBTUSD");
        }
    }

    return <div className={styles.container}>
        <div className={styles.buttons}>
            <div
                className={styles.button + " " + styles.toggleFeedButton}
                onClick={toggleFeed}
            >
                Toggle Feed
            </div>
            <div style={{ width: 20 }} />
            <div
                className={styles.button + " " + styles.killFeedButton}
                onClick={killFeed}
            >
                {killFeedStatus}
            </div>
        </div>
    </div>
}

export default Utilities;