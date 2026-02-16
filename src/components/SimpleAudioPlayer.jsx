import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Simple Audio Player - Direct CDN playback without CORS issues
 *
 * Works because HTML5 <audio> element does NOT require CORS headers
 * for basic playback (similar to <img> tags).
 *
 * @param {string} src - Direct CDN audio URL
 * @param {function} onPlay - Callback when audio starts playing
 * @param {function} onPause - Callback when audio is paused
 * @param {function} onEnded - Callback when audio finishes
 */
export default function SimpleAudioPlayer({
  src,
  onPlay,
  onPause,
  onEnded,
  autoPlay = false,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  // Handle play
  const handlePlay = useCallback(async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    } catch (err) {
      setError(err.message);
      console.error("Playback error:", err);
    }
  }, [onPlay]);

  // Handle pause
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    onPause?.();
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Handle seek
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Audio element event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };
    const handleError = (e) => {
      setError("Failed to load audio");
      console.error("Audio error:", e);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [onEnded]);

  // Auto-play if enabled
  useEffect(() => {
    if (autoPlay && src && audioRef.current) {
      handlePlay();
    }
  }, [src, autoPlay, handlePlay]);

  return (
    <div className="audio-player">
      {/* Hidden audio element - direct CDN source, no CORS needed */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Custom controls */}
      <div className="controls">
        {/* Play/Pause button */}
        <button
          onClick={togglePlayPause}
          disabled={!src || error}
          className="play-button"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        {/* Time display */}
        <span className="time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          disabled={!src || error}
          className="progress-bar"
        />

        {/* Error message */}
        {error && <span className="error">{error}</span>}
      </div>

      {/* Minimal styling */}
      <style jsx>{`
        .audio-player {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 15px;
          background: #f5f5f5;
          border-radius: 8px;
          max-width: 400px;
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .play-button {
          padding: 8px 16px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .play-button:hover {
          background: #45a049;
        }

        .play-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .time {
          font-size: 12px;
          color: #666;
          white-space: nowrap;
        }

        .progress-bar {
          flex: 1;
          cursor: pointer;
        }

        .error {
          color: red;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
