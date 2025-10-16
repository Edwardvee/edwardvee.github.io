# 🎵 Music Player Configuration Guide

This guide explains how to configure and customize the retro music player.

## 🚀 Quick Setup

### 1. Add Your Music Files
- Place audio files in `/public/music/` folder
- Supported formats: MP3, OGG, WAV
- Recommended: MP3 at 128-192 kbps

### 2. Update the Playlist
Edit `music.ts` and add your tracks:

```typescript
export const playlist: Track[] = [
  {
    id: "my-track",
    title: "My Awesome Track",
    artist: "Artist Name",        // Optional
    filename: "my-track.mp3",     // Must match file in /public/music/
    duration: 180,                // Optional: seconds
    genre: "Synthwave"           // Optional
  },
  // Add more tracks...
];
```

### 3. Test Your Setup
- Click the "♪ MUSIC OFF ♪" button in the footer
- Music should start playing and button changes to "♪ MUSIC ON ♪"
- Tracks will loop automatically

## ⚙️ Configuration Options

### Audio Settings
```typescript
audio: {
  defaultVolume: 0.3,           // 0.0 (silent) to 1.0 (full)
  fadeInDuration: 2000,         // Fade in time (milliseconds)
  fadeOutDuration: 1000,        // Fade out time (milliseconds)
  crossfadeDuration: 3000,      // Between tracks (not implemented)
}
```

### Player Behavior
```typescript
behavior: {
  autoplay: false,              // Start automatically (keep false for UX)
  loop: true,                   // Loop entire playlist
  shuffle: false,               // Random order (not implemented)
  resumeOnReturn: true,         // Resume when returning to tab
}
```

### Storage Settings
```typescript
storage: {
  rememberState: true,          // Remember on/off state
  rememberVolume: true,         // Remember volume level
  storageKey: "retro-music-player" // localStorage key prefix
}
```

## 🎛️ Player Features

### Current Features ✅
- **Play/Pause Control** - Via footer button
- **Automatic Looping** - Playlist repeats continuously
- **Fade Effects** - Smooth fade in/out
- **State Memory** - Remembers if music was on/off
- **Volume Control** - Configurable default volume
- **Track Progression** - Automatically plays next track
- **Error Handling** - Graceful failure if tracks don't load

### Planned Features 🔄
- Volume slider in UI
- Track progress bar
- Skip to next/previous track buttons
- Shuffle mode
- Playlist display
- Crossfade between tracks

## 🎨 Visual Integration

### Button States
- **OFF State**: `♪ MUSIC OFF ♪` (normal button)
- **ON State**: `♪ MUSIC ON ♪` (rainbow animation)

### Button Styling
The music button uses existing retro button styles:
- `retroButton` class for base styling
- `rainbow` class for animated effect when playing

## 🔧 Troubleshooting

### Music Not Playing?
1. **User interaction required** - Click the music button first (browser autoplay policy)
2. **Check file paths** - Ensure filenames in `music.ts` match files in `/public/music/`
3. **Check file formats** - Use MP3 for best compatibility
4. **Check browser console** - Look for loading errors (autoplay warnings are normal)
5. **Test file access** - Try accessing `/music/yourfile.mp3` directly in browser

### Autoplay Errors (Normal Behavior)
- `NotAllowedError: play() failed because the user didn't interact with the document first`
- This is **expected** and **handled gracefully** by our player
- Simply click the music button to start playback

### Button Not Working?
1. **Check state management** - Ensure `isMusicPlaying` state is updating
2. **Check component integration** - Verify `MusicPlayer` component is imported
3. **Check localStorage** - Clear browser storage if state seems stuck

### Performance Issues?
1. **Optimize file sizes** - Use compressed audio (128-192 kbps MP3)
2. **Limit playlist size** - Too many tracks can impact loading
3. **Check fade durations** - Very long fades can cause overlap issues

## 📱 Browser Compatibility

### Supported Browsers
- ✅ Chrome/Chromium (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support)
- ✅ Edge (full support)

### Mobile Considerations
- **Autoplay restrictions** - Most mobile browsers block autoplay
- **Battery usage** - Background music can drain battery
- **Data usage** - Consider file sizes for mobile users

## 🎵 Music Recommendations

### Genres That Fit the Aesthetic
- **Synthwave/Retrowave** - Perfect match for the retro theme
- **Chiptune/8-bit** - Nostalgic video game vibes
- **Vaporwave** - Dreamy, nostalgic atmosphere
- **Lo-fi Hip Hop** - Relaxed coding/browsing music
- **Ambient Electronic** - Non-intrusive background music

### Track Length Guidelines
- **2-4 minutes** - Good variety without being too short
- **Avoid very long tracks** - Can become repetitive
- **Consider intro/outro** - Smooth transitions between tracks

---

Enjoy your retro music experience! 🎮🎵