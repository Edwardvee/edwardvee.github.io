
import styles from "./Contact.module.scss";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className={styles.sectionBox}>
      <h2 className={styles.sectionTitleContact}>
        Contact <span className={styles.blink}>✉️</span>
      </h2>
      <p>
        You can write to me at{" "}
        <a href="mailto:ivan@email.com" className={styles.link}>
          quirogalautaroivan@gmail.com
        </a>
      </p>
      <p className={styles.contactNote}>
        <p>My social networks:</p>
        <a
          href="https://www.linkedin.com/in/lautaro-iv%C3%A1n-quiroga-8467a5315/"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <FaLinkedin /> LinkedIn
        </a>
        <br />
        <a
          href="https://github.com/Edwardvee/"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <FaGithub /> Github
        </a>
      </p>
    </section>
  );
};

export default Contact;
