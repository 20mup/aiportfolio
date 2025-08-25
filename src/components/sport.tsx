'use client';

import React from 'react';
import { Photos, PhotoItem } from './photos';

const Esports = () => {
  const esportPhotos: PhotoItem[] = [
    {
      src: '/queens-team.jpg',
      alt: 'Queen’s University Esports Team',
      caption: "Competed for 3 years with Queen’s University’s official League of Legends team",
    },
    {
      src: '/league-masters.png',
      alt: 'League of Legends Masters Rank',
      caption: 'Achieved Masters rank — top ~1% of players in North America',
    },
    {
      src: '/tournament.jpg',
      alt: 'LAN Tournament',
      caption: 'On stage and online, esports built my teamwork, strategy, and adaptability',
    },
  ];

  return (
    <div className="mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
          My Esports Journey
        </h2>
        <p className="mt-4 text-muted-foreground">
          Alongside engineering and AI, I’ve competed in esports for several years. 
          I represented <strong>Queen’s University Esports</strong> in League of Legends 
          for 3 seasons, reaching <strong>Masters</strong> rank in solo queue — 
          placing me among the top 1% of players in North America. 
          Esports taught me discipline, communication, and strategy, 
          which I now apply to both engineering and life.
        </p>
      </div>
      <Photos photos={esportPhotos} />
    </div>
  );
};

export default Esports;
