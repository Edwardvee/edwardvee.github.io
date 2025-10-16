import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import styles from "./App.module.scss";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Stamps from "./components/Stamps";
import Updates from "./components/Updates";

// Puedes cambiar estos links por tus propios gifs o banners
const bannerUrl = "banner.jpg";

const AppContent = () => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "About" },
    { path: "/projects", label: "Proyectos" },
    { path: "/updates", label: "Updates" },
    { path: "/contact", label: "Contacto" },
  ];

  return (
    <div className={styles.retroBg}>
      {/* Banner superior */}
      <div className={styles.bannerContainer}>
        <img src={bannerUrl} alt="Banner retro" className={styles.bannerImg} />
      </div>
      {/* Marquee retro debajo del banner */}
      <div className={styles.marquee}>
        <span className={styles.marqueeInner}>
          ★ ☆ ★ BIENVENIDO A MI PÁGINA PERSONAL ★ ☆ ★ ÚLTIMA ACTUALIZACIÓN: 2025 ★ ☆ ★
        </span>
      </div>


      {/* Menú de navegación */}
      <div className={styles.webContainer}>
        <nav className={styles.navBar}>
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={
                hovered === item.path
                  ? `${styles.navBtn} ${styles.navBtnHover}`
                  : styles.navBtn
              }
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);
                // Simular carga
                setTimeout(() => {
                  navigate(item.path);
                  setIsLoading(false);
                }, 800);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Caja principal */}
        <div className={styles.mainBox}>
          <div className={styles.contentWrapper}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.retroProgressBar}></div>
                <p style={{ fontFamily: 'monospace', fontSize: '12px', marginTop: '10px' }}>
                  CARGANDO CONTENIDO...
                </p>
              </div>
            ) : (
              <>
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/updates" element={<Updates />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>

                <Stamps />

                {/* Decoración retro adicional */}
                <div className={styles.retroDecoration}></div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className={styles.footer}>
        <hr className={styles.footerHr} />
        <span>
          Siempre fuera de la norma | Inspirado en{" "}
          <a
            href="https://neocities.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Neocities
          </a>
        </span>
        <div className={styles.neocitiesBtnBox}>
          <a
            href="https://neocities.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={"/neocities-Logo.png"}
              alt="Neocities Button"
              className={styles.neocitiesBtn}
            />
          </a>
        </div>
        {/* Contador de visitantes */}
        <div className={styles.retroCounter}>001337</div>

        <div className={styles.credits}>
          © 2025 Iván Quiroga. <span style={{ fontSize: "1.2em" }}>★</span>{" "}
          <br />
          <span>
            Créditos: gifs de{" "}
            <a
              href="https://web.archive.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Internet Archive
            </a>
          </span>
          <br />
          <div style={{ marginTop: '10px' }}>
            <button className={`${styles.retroButton} ${styles.rainbow}`}>
              ♪ MÚSICA ON ♪
            </button>
            <span style={{ margin: '0 10px', fontSize: '12px' }}>
              ◆ BEST VIEWED IN 1024x768 ◆
            </span>
            <button className={styles.retroButton}>
              ✉ GUESTBOOK ✉
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
