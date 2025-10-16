import { useState } from "react";
import appStyles from "../App.module.scss";
import styles from "./About.module.scss";

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
      text: "My Story",
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
        About Me{" "}
        <img src={blinkieUrl} alt="blinkie" className={styles.blinkie} />
      </h2>
      <p>
        Hello! I'm <b>Iván Quiroga</b> <span className={styles.blink}>★</span>.
        <br />
        I'm a web developer, faithful, devoted and practitioner of my only
        religion: TypeScript and its libraries.
        Recently I've been exploring the cyberSec world, so I hope to make noticiable progress regarding said subject. One day the world will know me, and everyone will recognize me as a well formed Hacker, and hopefully also a talented exploiter.

        <br />
        Here I'll be uploading projects, thoughts and curiosities.
        <br />
        <span className={styles.aboutNote} style={{ display: "none" }}>
          <button
            className={appStyles.retroButton}
            onClick={() => {
              setShowAbout(!showAbout);
            }}
          >
            {showAbout ? "◄ HIDE" : "► MORE INFO"}
          </button>{" "}
          if you're interested in learning more about me{" "}
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
