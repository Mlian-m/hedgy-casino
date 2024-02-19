// src/play/[gameId].tsx

import React, { useEffect, useState } from "react";

import Game from "@/components/sections/Game/Game";
import Header from "@/components/sections/Header";
import { useRouter } from "next/router";

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query;

  return (
    <>
      <Header />
      <Game gameId={gameId as string} />
    </>
  );
}
