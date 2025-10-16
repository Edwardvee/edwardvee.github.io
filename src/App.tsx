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
import MusicPlayer from "./components/MusicPlayer";
import { musicConfig } from "./data/music";

// You can change these links to your own gifs or banners
const bannerUrl = "src/assets/banner.jpg";

const AppContent = () => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const navigate = useNavigate();

  // Load saved music state from localStorage (but don't auto-play)
  React.useEffect(() => {
    if (musicConfig.storage.rememberState) {
      const savedState = localStorage.getItem(`${musicConfig.storage.storageKey}-playing`);
      // Only remember the OFF state, never auto-start music
      if (savedState === "false") {
        setIsMusicPlaying(false);
      }
      // Always start in OFF state for better UX
    }
  }, []);

  // Save music state to localStorage
  React.useEffect(() => {
    if (musicConfig.storage.rememberState) {
      localStorage.setItem(`${musicConfig.storage.storageKey}-playing`, isMusicPlaying.toString());
    }
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const navItems = [
    { path: "/", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/updates", label: "Updates" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className={styles.retroBg}>
      {/* Banner superior */}
      <div className={styles.bannerContainer}>
        <img src={bannerUrl} alt="Retro Banner" className={styles.bannerImg} />
      </div>
      {/* Marquee retro debajo del banner */}
      <div className={styles.marquee}>
        <span className={styles.marqueeInner}>
          ★ ☆ ★ WELCOME TO MY PERSONAL WEBSITE ★ ☆ ★ LAST UPDATE: 2025 ★ ☆ ★
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
                  LOADING CONTENT...
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
          Always outside the norm | Inspired by{" "}
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
            Credits: gifs from{" "}
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
            <button
              className={`${styles.retroButton} ${isMusicPlaying ? styles.rainbow : ''}`}
              onClick={toggleMusic}
            >
              ♪ MUSIC {isMusicPlaying ? 'ON' : 'OFF'} ♪
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

      {/* Music Player Component */}
      <MusicPlayer isPlaying={isMusicPlaying} onToggle={toggleMusic} />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
