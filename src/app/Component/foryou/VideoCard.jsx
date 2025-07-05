import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoCard = ({ video, isActive }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Play/pause based on isActive
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isActive]);

  // Toggle play/pause
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  // Toggle mute
  const handleMute = () => {
    setMuted((m) => !m);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black flex items-center justify-center rounded-lg shadow-lg overflow-hidden">
      <video
        ref={videoRef}
        src={video.video_url}
        className="w-full h-full object-cover"
        loop
        muted={muted}
        playsInline
        onClick={handlePlayPause}
        style={{ cursor: 'pointer' }}
      />
      {/* Overlay Controls */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {/* Top right: Mute/Unmute */}
        <div className="flex justify-end p-4">
          <button
            className="bg-black/50 rounded-full p-2 pointer-events-auto"
            onClick={handleMute}
            tabIndex={-1}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
          </button>
        </div>
        {/* Bottom: Caption and Play/Pause */}
        <div className="flex items-end justify-between w-full p-4">
          <div className="text-white text-lg font-semibold drop-shadow-md">
            {video.caption}
          </div>
          <button
            className="bg-black/50 rounded-full p-2 pointer-events-auto ml-2"
            onClick={handlePlayPause}
            tabIndex={-1}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="text-white" /> : <Play className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;