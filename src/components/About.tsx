import { useState } from "react";
import styles from "./About.module.scss";
import appStyles from "../App.module.scss";

const blinkieUrl = "/zzz.gif";

const About = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [hoveredConsole, setHoveredConsole] = useState<string | null>(null);

  const consoles = {
    NintendoDS: {
      image: "/consolas/nintendo3ds-apagada.png",
      image2: "/consolas/nintendo3ds-encendida.png",
      text: "Nintendo DS",
    },
    Nintendo3DS: {
      image: "/consolas/nintendo3ds-apagada.png",
      image2: "/consolas/nintendo3ds-prendida.png",
      text: "Mi historia",
    },
    GameboyAdvanced: {
      image: "/consolas/gameboyAdvanced.png",
      image2: "/consolas/gameboyAdvanced-encendido.png",
      text: "Gameboy Advanced",
    },
    GameboyColor: {
      image: "/consolas/gameboy-color.png",
      image2: "/consolas/gameboy-color-encendido.png",
      text: "Gameboy Color",
    },
  };



  return (
    <section id="about" className={styles.sectionBox}>
      <h2 className={styles.sectionTitleAbout}>
        Sobre mí{" "}
        <img src={blinkieUrl} alt="blinkie" className={styles.blinkie} />
      </h2>
      <p>
        ¡Hola! Soy <b>Iván Quiroga</b> <span className={styles.blink}>★</span>.
        <br />
        Soy desarrollador un web, fiel, devoto y practicante de mi unica
        religión: TypeScript y sus librerias .
        <br />
        Por acá voy a estar subiendo proyectos, pensamientos y curiosidades.
        <br />
        <span className={styles.aboutNote}>
          <button
            className={appStyles.retroButton}
            onClick={() => {
              setShowAbout(!showAbout);
            }}
          >
            {showAbout ? "◄ OCULTAR" : "► MÁS INFO"}
          </button>{" "}
          si te interesa más de mi persona{" "}
        </span>

        <div className={appStyles.retroDecoration}></div>
        <div
          className={`${styles.aboutContent} ${showAbout ? styles.show : styles.hide
            }`}
        >
          {Object.entries(consoles).map(([key, { image, image2, text }]) => (
            <div
              key={key}
              onMouseEnter={() => setHoveredConsole(key)}
              onMouseLeave={() => setHoveredConsole(null)}
              className={styles.consoleContainer}
            >
              <img
                src={hoveredConsole === key ? image2 : image}
                alt={text}
                className={styles.consoleImage}
              />
              <p className={styles.consoleText}>{text}</p>
            </div>
          ))}
        </div>
      </p>
    </section>
  );
};

export default About;
