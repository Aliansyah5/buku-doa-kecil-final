import SimpleAudioPlayer from "./components/SimpleAudioPlayer";

/**
 * Example: Playing audio directly from cdn.equran.id
 *
 * NO BACKEND NEEDED - The <audio> tag handles cross-origin audio
 * without requiring CORS headers.
 */
export default function AudioExample() {
  // Direct CDN URL - works without CORS!
  const audioUrl =
    "https://cdn.equran.id/audio-partial/Abdullah-Al-Juhany/001001.mp3";

  const handlePlay = () => {
    console.log("Audio started playing");
  };

  const handlePause = () => {
    console.log("Audio paused");
  };

  const handleEnded = () => {
    console.log("Audio finished");
  };

  return (
    <div className="app">
      <h1>Direct CDN Audio Player</h1>
      <p>Playing from: cdn.equran.id (no proxy needed!)</p>

      <SimpleAudioPlayer
        src={audioUrl}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        autoPlay={false}
      />

      <div className="explanation">
        <h3>Why This Works:</h3>
        <ul>
          <li>
            ✅ HTML5 <code>&lt;audio&gt;</code> element doesn't require CORS
            headers
          </li>
          <li>✅ Direct CDN playback (no proxy server needed)</li>
          <li>✅ Play, pause, seek all work perfectly</li>
          <li>✅ Production-safe and standards-compliant</li>
        </ul>

        <h3>What Doesn't Work (Requires CORS):</h3>
        <ul>
          <li>
            ❌ Using <code>fetch()</code> or <code>axios</code> to get the audio
            file
          </li>
          <li>❌ Web Audio API processing (analyzing, filtering audio)</li>
          <li>❌ Drawing waveforms on canvas</li>
        </ul>

        <h3>Browser Compatibility:</h3>
        <p>Works in all modern browsers (Chrome, Firefox, Safari, Edge)</p>
      </div>

      <style jsx>{`
        .app {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }

        h1 {
          color: #333;
          margin-bottom: 10px;
        }

        p {
          color: #666;
          margin-bottom: 30px;
        }

        .explanation {
          margin-top: 40px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .explanation h3 {
          color: #444;
          margin-top: 0;
        }

        .explanation ul {
          line-height: 1.8;
        }

        code {
          background: #e0e0e0;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
