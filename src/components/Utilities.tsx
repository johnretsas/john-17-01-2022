import styles from "./css/Utilities.module.css";

const Utilities = () => {
    return <div className={styles.container}>
        <div className={styles.buttons}>
            <div className={styles.button + " " + styles.toggleFeedButton}>Toggle Feed</div>
            <div style={{width: 20}}/>
            <div className={styles.button + " " + styles.killFeedButton}>Kill Feed</div>
        </div>
    </div>
}

export default Utilities;