import React from "react";
import styles from "./Stamps.module.scss";

const blinkieUrl = "/zzz.gif";

const Stamps = () => {
  return (
    <div className={styles.stampsBox}>
      <img src={blinkieUrl} alt="blinkie" className={styles.stampImg} />
    </div>
  );
};

export default Stamps;
