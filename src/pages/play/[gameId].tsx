// src/play/[gameId].tsx

import Game from "@/components/sections/Game/Game";
import Header from "@/components/sections/Header";
import React from "react";
import { useRouter } from "next/router";

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query;

  if (typeof gameId !== "string") {
    return <div>Loading...</div>; // or any other loading state or handling
  }

  return (
    <>
      <Header />
      <Game gameId={gameId as string} />
    </>
  );
}
