// ⚙️ UPDATES CONFIGURATION
// ========================
// 
// Configuration settings for the Updates component

export const updatesConfig = {
  // 📊 Display Settings
  display: {
    maxUpdates: 10,              // Maximum updates to show (0 = show all)
    showDateBrackets: true,      // Show [date] format
    dateFormat: "YYYY-MM-DD",    // Date display format
    sortOrder: "desc",           // "desc" (newest first) or "asc" (oldest first)
  },

  // 🎨 Visual Settings
  visual: {
    showEmojis: true,           // Display emojis in titles
    highlightRecent: true,      // Highlight updates from last 7 days
    animateOnLoad: false,       // Animate updates when component loads
    compactMode: false,         // More compact display
  },

  // 📅 Date Settings
  date: {
    showRelative: false,        // Show "2 days ago" instead of date
    highlightToday: true,       // Highlight today's updates
    groupByMonth: false,        // Group updates by month
  },

  // 🔍 Filtering (for future features)
  filtering: {
    enableSearch: false,        // Enable search functionality
    enableCategoryFilter: false, // Filter by emoji categories
    enableDateRange: false,     // Filter by date range
  },

  // 🌐 Internationalization
  i18n: {
    dateLocale: "en-US",       // Locale for date formatting
    strings: {
      title: "Updates",
      noUpdates: "No updates available",
      loadMore: "Load more",
      searchPlaceholder: "Search updates...",
    }
  }
};

// 📋 Update Categories (based on emojis)
export const updateCategories = {
  design: {
    emojis: ["🎨", "🖌️", "🎭", "🌈"],
    label: "Design & UI",
    color: "#FF6B6B"
  },
  feature: {
    emojis: ["⚡", "🚀", "✨", "🎯"],
    label: "Features & Performance", 
    color: "#4ECDC4"
  },
  technical: {
    emojis: ["🔧", "🛠️", "🔨", "⚙️"],
    label: "Technical & Fixes",
    color: "#45B7D1"
  },
  content: {
    emojis: ["📝", "📚", "📰", "📋"],
    label: "Content & Documentation",
    color: "#96CEB4"
  },
  celebration: {
    emojis: ["🎉", "🎊", "🥳", "🎈"],
    label: "Milestones & Celebrations",
    color: "#FFEAA7"
  }
};

// 🎯 Priority Levels (optional)
export const updatePriority = {
  high: {
    keywords: ["security", "critical", "urgent", "breaking"],
    style: "border-left: 3px solid #FF6B6B;"
  },
  medium: {
    keywords: ["feature", "improvement", "enhancement"],
    style: "border-left: 3px solid #4ECDC4;"
  },
  low: {
    keywords: ["minor", "typo", "cleanup", "docs"],
    style: "border-left: 3px solid #DDD;"
  }
};

export default updatesConfig;