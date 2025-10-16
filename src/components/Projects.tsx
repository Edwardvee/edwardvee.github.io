import React from "react";
import styles from "./Projects.module.scss";
import appStyles from "../App.module.scss";

const Projects = () => {
  return (
    <section id="proyectos" className={styles.sectionBox}>
      <h2 className={styles.sectionTitleProjects}>
        Proyectos Destacados <span className={styles.blink}>★</span>
      </h2>
      <ul className={styles.projectsList}>
        <li>
          🌐 <b>Mi Web Retro</b> - Un homenaje a la web de los 90's ✅
        </li>
        <li>
          🕹️ <b>Pixel Art Gallery</b> - Galería interactiva de pixel art
          <div className={appStyles.underConstruction} style={{ fontSize: '10px', padding: '2px 6px', margin: '5px 0' }}>
            EN DESARROLLO
          </div>
        </li>
        <li>
          💾 <b>Blog Personal</b> - Reflexiones sobre tecnología y creatividad
          <div className={appStyles.underConstruction} style={{ fontSize: '10px', padding: '2px 6px', margin: '5px 0' }}>
            PRÓXIMAMENTE
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Projects;
