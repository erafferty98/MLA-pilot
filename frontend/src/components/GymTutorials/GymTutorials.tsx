import React, { useState } from 'react';

const GymTutorials = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Bench Press',
      description: 'Discover the correct techniques for a bench press to maximize your workout efficiency.',
      videoUrl: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok', 
    },
    {
      id: 2,
      title: 'Squat',
      description: 'Master the squat exercise with proper form and technique.',
      videoUrl: 'https://www.youtube.com/watch?v=U3HvWU0kEng',
    },
    {
      id: 3,
      title: 'Deadlift',
      description: 'Unlock the secrets to a perfect deadlift, essential for back strength and core stability.',
      videoUrl: 'https://www.youtube.com/watch?v=p2OPUi4xGrM',
    },
    {
      id: 4,
      title: 'Overhead Press',
      description: 'Enhance your shoulder strength with the overhead press by learning the optimal form.',
      videoUrl: 'https://www.youtube.com/watch?v=KP1sYz2VICk',
    },
    {
      id: 5,
      title: 'Bent Over Row',
      description: 'Explore the fundamentals of the bent over row for strengthening your back with this guide.',
      videoUrl: 'https://www.youtube.com/shorts/Nqh7q3zDCoQ',
    }
  ]);

  return (
    <div>
      <h1>Gym Tutorials</h1>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <iframe
            width="560"
            height="315"
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default GymTutorials;