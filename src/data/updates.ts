// 📰 UPDATES DATA - RETRO PORTFOLIO
// =================================
// 
// Instructions for updating:
// 1. Add new updates at the TOP of the array (most recent first)
// 2. Use consistent date format: YYYY-MM-DD
// 3. Keep titles concise but descriptive
// 4. Use emojis to make updates more visual and engaging
// 5. Update the id to be unique (use date + short description)

export interface Update {
  id: string;          // Unique identifier (e.g., "2025-01-02-retro-redesign")
  date: string;        // Date in YYYY-MM-DD format
  title: string;       // Update title/description with emoji
}

// 📋 WEBSITE UPDATES LOG
// Add new updates at the TOP (most recent first)
export const updates: Update[] = [
  {
    id: "2025-10-16-finishing",
    date: "2025-10-16",
    title: "🚀 Almost there! Wrapping up development and preparing for the official launch of my site."
  },
  {
    id: "2024-12-29-site-launch",
    date: "2024-12-29",
    title: "🧠 Site in progress. Please be patient!"
  },

  // 🆕 ADD NEW UPDATES HERE (at the top for chronological order)
  // Copy this template and fill with your update data:
  /*
  {
    id: "YYYY-MM-DD-short-description",
    date: "YYYY-MM-DD",
    title: "🎯 Your update description with emoji and details about what changed."
  },
  */
];

// 📅 UTILITY FUNCTIONS

/**
 * Get updates from a specific year
 */
export const getUpdatesByYear = (year: number): Update[] => {
  return updates.filter(update => update.date.startsWith(year.toString()));
};

/**
 * Get the most recent updates (default: last 5)
 */
export const getRecentUpdates = (count: number = 5): Update[] => {
  return updates.slice(0, count);
};

/**
 * Get updates from the last N days
 */
export const getUpdatesFromLastDays = (days: number): Update[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoffString = cutoffDate.toISOString().split('T')[0];
  
  return updates.filter(update => update.date >= cutoffString);
};

/**
 * Format date for display (e.g., "2025-01-02" -> "January 2, 2025")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

/**
 * Format date for display in Spanish (e.g., "2025-01-02" -> "2 de enero de 2025")
 */
export const formatDateES = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get total number of updates
 */
export const getTotalUpdates = (): number => {
  return updates.length;
};

/**
 * Search updates by keyword in title
 */
export const searchUpdates = (keyword: string): Update[] => {
  const searchTerm = keyword.toLowerCase();
  return updates.filter(update => 
    update.title.toLowerCase().includes(searchTerm)
  );
};

// 📊 STATISTICS (Optional - for future dashboard)
export const updateStats = {
  total: updates.length,
  thisYear: getUpdatesByYear(new Date().getFullYear()).length,
  thisMonth: updates.filter(u => u.date.startsWith(
    new Date().toISOString().slice(0, 7)
  )).length,
  lastUpdate: updates[0]?.date || null
};

// 🎨 EMOJI CATEGORIES (for consistent styling)
export const emojiCategories = {
  design: ["🎨", "🖌️", "🎭", "🌈"],
  feature: ["⚡", "🚀", "✨", "🎯"],
  fix: ["🔧", "🛠️", "🔨", "⚙️"],
  content: ["📝", "📚", "📰", "📋"],
  celebration: ["🎉", "🎊", "🥳", "🎈"],
  tech: ["💻", "⚡", "🔥", "🚀"]
};

export default updates;