import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '@/store/slices/forYouSlice';
import VideoCard from './VideoCard';

const VideoFeed = () => {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.forYou);

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => { dispatch(fetchVideos()); }, [dispatch]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const newIndex = Math.round(scrollTop / clientHeight);
    setActiveIndex(newIndex);
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen w-full flex justify-center items-center overflow-y-scroll snap-y snap-mandatory bg-black"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {videos.map((video, idx) => (
        <div
          key={video.id}
          className="snap-center h-screen flex items-center justify-center"
        >
          <VideoCard video={video} isActive={idx === activeIndex} />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
