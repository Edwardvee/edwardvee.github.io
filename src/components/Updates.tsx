
import styles from "./Updates.module.scss";
import { updates } from "../data/updates";

function Updates() {
  return (
    <section id="updates" className={styles.sectionBox}>
      <h2 className={styles.sectionTitleUpdates}>
        Updates <span className={styles.blink}>✦</span>
      </h2>
      <ul className={styles.updatesList}>
        {updates.map((update) => (
          <li key={update.id}>
            <b>[{update.date}]</b> {update.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Updates;
