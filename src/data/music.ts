// 🎵 SUPER SIMPLE MUSIC PLAYER - RETRO PORTFOLIO
// ==============================================
// 
// 🎶 HOW TO USE:
// 1. Put your music files in /public/music/
// 2. Add the filenames to the playlist below
// 3. That's it! The player will handle the rest.

export interface Track {
    filename: string;    // Just the filename (e.g., "my-song.mp3")
    title: string;       // Display name (e.g., "My Awesome Song")
}

// 🎵 YOUR PLAYLIST - Add your music files here!
export const playlist: Track[] = [
    { filename: "Fall Out Boy - Sugar, We're Goin Down.mp3", title: "Sugar we're going down" },
    { filename: "Silverstein - Smile In Your Sleep (Official Video).mp3", title: "Smile In Your Sleep" },

    // More examples:
    // { filename: "track1.mp3", title: "Track 1" },
    // { filename: "track2.mp3", title: "Track 2" },
];

// 🎛️ MUSIC PLAYER CONFIGURATION
export const musicConfig = {
    // 🔊 Audio Settings
    audio: {
        defaultVolume: 0.3,              // Default volume (0.0 to 1.0)
    },

    // 🎮 Player Behavior
    behavior: {
        loop: true,                      // Loop the entire playlist
    },

    // 💾 Storage
    storage: {
        rememberState: true,             // Remember on/off state in localStorage
        storageKey: "retro-music-player" // localStorage key
    }
};

// 🎵 UTILITY FUNCTIONS

/**
 * Get next track in playlist
 */
export const getNextTrack = (currentFilename: string, trackList: Track[]): Track | null => {
    const currentIndex = trackList.findIndex(track => track.filename === currentFilename);
    if (currentIndex === -1) return trackList[0] || null;

    const nextIndex = (currentIndex + 1) % trackList.length;
    return trackList[nextIndex];
};

/**
 * Get previous track in playlist  
 */
export const getPreviousTrack = (currentFilename: string, trackList: Track[]): Track | null => {
    const currentIndex = trackList.findIndex(track => track.filename === currentFilename);
    if (currentIndex === -1) return trackList[trackList.length - 1] || null;

    const prevIndex = currentIndex === 0 ? trackList.length - 1 : currentIndex - 1;
    return trackList[prevIndex];
};

export default playlist;