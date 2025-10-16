import { useState, useEffect, useRef, useCallback } from "react";
import { playlist, musicConfig, getNextTrack, type Track } from "../data/music";

interface MusicPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
}

const MusicPlayer = ({ isPlaying }: MusicPlayerProps) => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [volume] = useState(musicConfig.audio.defaultVolume);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.volume = volume;
            audioRef.current.preload = "none";
        }

        const audio = audioRef.current;
        const handleEnded = () => playNextTrack();

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    // Log available tracks on mount
    useEffect(() => {
        if (playlist.length > 0) {
            console.log(`Music playlist loaded with ${playlist.length} tracks:`, playlist.map(t => t.title));
        } else {
            console.log("No tracks in playlist. Add your music files to /public/music/ and update src/data/music.ts");
        }
    }, []);

    // Load track
    const loadTrack = useCallback((track: Track) => {
        if (!audioRef.current) return;

        setCurrentTrack(track);
        audioRef.current.src = `/music/${track.filename}`;
        audioRef.current.load();
        console.log(`Loading track: ${track.title}`);
    }, []);

    // Play next track
    const playNextTrack = useCallback(() => {
        if (playlist.length === 0) return;

        let nextTrack: Track;
        if (currentTrack) {
            const next = getNextTrack(currentTrack.filename, playlist);
            nextTrack = next || playlist[0];
        } else {
            nextTrack = playlist[0];
        }

        loadTrack(nextTrack);

        // Auto-play next track if music is currently playing
        if (isPlaying && audioRef.current) {
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch(console.error);
                }
            }, 100);
        }
    }, [currentTrack, loadTrack, isPlaying]);

    // Handle play/pause - only load and play when user clicks
    useEffect(() => {
        if (!isPlaying) {
            // If not playing, just pause if audio exists
            if (audioRef.current) {
                audioRef.current.pause();
            }
            return;
        }

        // No tracks available
        if (playlist.length === 0) {
            console.warn("No music files configured. Add tracks to src/data/music.ts");
            return;
        }

        // User clicked play - load first track if none loaded
        if (!currentTrack) {
            loadTrack(playlist[0]);
            return; // loadTrack will trigger this effect again
        }

        // Play current track
        if (audioRef.current && currentTrack) {
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`Now playing: ${currentTrack.title}`);
                    })
                    .catch((error) => {
                        console.warn("Playback failed:", error.message);
                    });
            }
        }
    }, [isPlaying, currentTrack, loadTrack]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    // Don't render anything visible - this is a background component
    return null;
};

export default MusicPlayer;