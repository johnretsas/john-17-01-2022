import { FC } from "react"
import styles from "./css/SnackBar.module.css";

interface Props {
    hasNotification: {
        message: string;
        level: "ERROR" | "MESSAGE"
    }
}

const SnackBar: FC<Props> = ({ hasNotification }) => {
    const color = hasNotification.level === "ERROR" ? "#882000" : "#003b88";
    return (
        <div className={styles.container} style={{ backgroundColor: color }}>
            {hasNotification.message}
        </div>
    )
}

export default SnackBar;