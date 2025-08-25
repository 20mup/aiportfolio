'use client';

import React from 'react';
import { Photos, PhotoItem } from './photos';

const Crazy = () => {
  const esportPhotos: PhotoItem[] = [
    {
      src: '/masters.png',
      alt: 'League of Legends Masters rank badge',
      caption: 'Reached Masters in solo queue (NA) — top ~1%',
    },
  ];

  return (
    <div className="mx-auto w-full">
      <div className="mb-3">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
          Esports — League of Legends (Masters)
        </h2>
      </div>
      <p className="mb-8 text-muted-foreground">
        I competed for <strong>3 seasons</strong> with the Queen’s University Esports LoL team and
        reached <strong>Masters</strong> in solo queue. Esports taught me disciplined practice,
        communication under pressure, and strategic thinking that I bring into engineering.
      </p>
      <Photos photos={esportPhotos} />
    </div>
  );
};

export default Crazy;