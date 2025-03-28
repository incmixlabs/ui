import React from 'react';

interface VideoListProps {
  videos: Blob[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div>
      {videos.map((video, index) => (
        <video key={index} controls>
          <source src={URL.createObjectURL(video)} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );
};

export default VideoList;
