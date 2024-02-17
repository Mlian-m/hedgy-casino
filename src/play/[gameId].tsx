// pages/[gameId].tsx

import Game from '@/components/sections/Game/Game';
import Header from '@/components/sections/Header';
import React from 'react';
import { useRouter } from 'next/router';

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query; // Access the dynamic part of the URL

  return (
    <>
      <Header />
      {/* Render Game component based on gameId. You might need to adjust Game component to use gameId from router.query */}
      <Game gameId={String(gameId)} />
      {/* Include any other components you need on this page */}
    </>
  );
}
