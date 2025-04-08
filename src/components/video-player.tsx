// components/VideoPlayer.tsx
import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title, description }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <div className="relative">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          className="react-player"
          playing
          controls
          muted
          onReady={() => setIsLoading(false)}
          width="100%"
          height="100%"
        />
        {isLoading && <div className="absolute inset-0 flex justify-center items-center bg-black opacity-50">
          <span className="text-white">Loading...</span>
        </div>}
      </div>
    </Card>
  );
};

export default VideoPlayer;
