// 🎛️ PROJECT GALLERY CONFIGURATION
// ================================
// 
// Global settings for the project gallery component

export const galleryConfig = {
  // 🖥️ Desktop Layout
  desktop: {
    columns: "auto-fit",           // CSS grid columns (auto-fit recommended)
    minIconWidth: "120px",         // Minimum width for project icons
    gap: "1.5rem",                 // Space between icons
    padding: "1.5rem",             // Desktop padding
  },

  // 🪟 Window Behavior
  window: {
    maxWidth: "600px",             // Maximum window width
    animationDuration: "0.3s",     // Window open/close animation
    defaultPosition: "center",      // Window position (center, top, custom)
  },

  // 📱 Responsive Breakpoints
  responsive: {
    mobile: "600px",               // Mobile breakpoint
    tablet: "900px",               // Tablet breakpoint
  },

  // 🎨 Visual Settings
  visual: {
    showAnimations: true,          // Enable/disable animations
    showTaskbar: true,             // Show/hide taskbar
    showWindowControls: true,      // Show minimize/close buttons
    enableHoverEffects: true,      // Icon hover effects
  },

  // 🔗 Link Behavior
  links: {
    openInNewTab: true,           // Open project links in new tab
    showExternalIcon: true,       // Show external link indicators
  },

  // 📊 Display Options
  display: {
    showTechBadges: true,         // Show technology badges
    showStatusBadges: true,       // Show project status
    showProjectCount: true,       // Show total project count
    maxDescriptionLength: 100,    // Max chars in description
  }
};

// 🎯 Feature Flags (for future enhancements)
export const featureFlags = {
  enableSearch: false,            // Project search functionality
  enableFiltering: false,         // Filter by technology/status
  enableSorting: false,          // Sort projects by date/name
  enableCategories: false,       // Group projects by category
  enableLightbox: false,         // Image lightbox view
  enableKeyboardNav: true,       // Keyboard navigation
};

// 🌐 Internationalization (i18n) - Ready for multiple languages
export const i18n = {
  defaultLanguage: "en",
  strings: {
    en: {
      title: "Featured Projects",
      desktop: "Projects",
      startButton: "📁 Projects",
      windowTitle: "Project Details",
      description: "Description",
      technologies: "Technologies",
      liveDemo: "🌐 Live Demo",
      sourceCode: "📂 Source Code",
      minimize: "Minimize",
      close: "Close",
      status: {
        completed: "✅ COMPLETED",
        inProgress: "🚧 IN PROGRESS",
        comingSoon: "🔜 COMING SOON"
      }
    },
    es: {
      title: "Proyectos Destacados",
      desktop: "Proyectos", 
      startButton: "📁 Proyectos",
      windowTitle: "Detalles del Proyecto",
      description: "Descripción",
      technologies: "Tecnologías",
      liveDemo: "🌐 Demo en Vivo",
      sourceCode: "📂 Código Fuente",
      minimize: "Minimizar",
      close: "Cerrar",
      status: {
        completed: "✅ COMPLETADO",
        inProgress: "🚧 EN PROGRESO", 
        comingSoon: "🔜 PRÓXIMAMENTE"
      }
    }
  }
};

export default galleryConfig;