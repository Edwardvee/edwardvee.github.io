import React from "react";
import styles from "./Contact.module.scss";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contacto" className={styles.sectionBox}>
      <h2 className={styles.sectionTitleContact}>
        Contacto <span className={styles.blink}>✉️</span>
      </h2>
      <p>
        Puedes escribirme a{" "}
        <a href="mailto:ivan@email.com" className={styles.link}>
          quirogalautaroivan@gmail.com
        </a>
      </p>
      <p className={styles.contactNote}>
        <p>Mis redes sociales:</p>
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
