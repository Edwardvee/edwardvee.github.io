import { useState } from "react";
import styles from "./Projects.module.scss";
import appStyles from "../App.module.scss";
import { projects, statusLabels, type Project } from "../data/projects";

const Projects = () => {
  const [openWindow, setOpenWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());

  const openProject = (projectId: string) => {
    setOpenWindow(projectId);
    setMinimizedWindows(prev => {
      const newSet = new Set(prev);
      newSet.delete(projectId);
      return newSet;
    });
  };

  const closeProject = () => {
    setOpenWindow(null);
  };

  const minimizeProject = (projectId: string) => {
    setMinimizedWindows(prev => new Set(prev).add(projectId));
    if (openWindow === projectId) {
      setOpenWindow(null);
    }
  };

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <span className={styles.statusCompleted}>{statusLabels.completed}</span>;
      case 'in-progress':
        return <div className={appStyles.underConstruction} style={{ fontSize: '10px', padding: '2px 6px', margin: '5px 0' }}>{statusLabels["in-progress"]}</div>;
      case 'coming-soon':
        return <div className={appStyles.underConstruction} style={{ fontSize: '10px', padding: '2px 6px', margin: '5px 0' }}>{statusLabels["coming-soon"]}</div>;
    }
  };

  const selectedProject = projects.find(p => p.id === openWindow);

  return (
    <section id="projects" className={styles.sectionBox}>
      <h2 className={styles.sectionTitleProjects}>
        Featured Projects <span className={styles.blink}>★</span>
      </h2>

      {/* Desktop with project icons */}
      <div className={styles.desktop}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`${styles.projectIcon} ${minimizedWindows.has(project.id) ? styles.minimized : ''}`}
            onDoubleClick={() => openProject(project.id)}
          >
            <div className={styles.iconImage}>
              {project.icon}
            </div>
            <div className={styles.iconLabel}>
              {project.title}
            </div>
            {getStatusBadge(project.status)}
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.startButton}>
          <span>📁 Projects</span>
        </div>
        <div className={styles.taskbarItems}>
          {minimizedWindows.size > 0 && (
            <>
              {Array.from(minimizedWindows).map(projectId => {
                const project = projects.find(p => p.id === projectId);
                return project ? (
                  <button
                    key={projectId}
                    className={styles.taskbarItem}
                    onClick={() => openProject(projectId)}
                  >
                    {project.icon} {project.title}
                  </button>
                ) : null;
              })}
            </>
          )}
        </div>
      </div>

      {/* Project Window */}
      {selectedProject && (
        <div className={styles.projectWindow}>
          <div className={styles.windowTitleBar}>
            <div className={styles.windowTitle}>
              {selectedProject.icon} {selectedProject.title} - Project Details
            </div>
            <div className={styles.windowControls}>
              <button
                className={styles.minimizeBtn}
                onClick={() => minimizeProject(selectedProject.id)}
              >
                ─
              </button>
              <button
                className={styles.closeBtn}
                onClick={closeProject}
              >
                ✕
              </button>
            </div>
          </div>

          <div className={styles.windowContent}>
            <div className={styles.projectHeader}>
              <div className={styles.projectImage}>
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className={styles.projectInfo}>
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                {getStatusBadge(selectedProject.status)}
              </div>
            </div>

            <div className={styles.projectDetails}>
              <h4>📋 Description</h4>
              <p>{selectedProject.details}</p>

              <h4>🛠️ Technologies</h4>
              <div className={styles.techStack}>
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.projectLinks}>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    🌐 Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    📂 Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
