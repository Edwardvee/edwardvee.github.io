import React from "react";
import styles from "./Updates.module.scss";

const updates = [
  {
    date: "2025-01-02",
    text: "🎨 ¡Rediseño completo con estilo retro inspirado en Neocities! Añadidos efectos CRT, bordes 3D y elementos nostálgicos de los 90s.",
  },
  {
    date: "2025-01-01",
    text: "🎉 ¡Feliz Año Nuevo! Optimización de variables SCSS y mejora en la organización del código.",
  },
  {
    date: "2024-12-30",
    text: "⚡ Agregada sección de proyectos destacados con indicadores de estado de desarrollo."
  },
  {
    date: "2024-12-29",
    text: "🚀 Sitio lanzado oficialmente con diseño base."
  },
];

function Updates() {
  return (
    <section id="updates" className={styles.sectionBox}>
      <h2 className={styles.sectionTitleUpdates}>
        Actualizaciones <span className={styles.blink}>✦</span>
      </h2>
      <ul className={styles.updatesList}>
        {updates.map((u) => (
          <li key={u.date}>
            <b>[{u.date}]</b> {u.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Updates;
