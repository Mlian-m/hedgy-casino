// src/components/sections/RecentPlays/useRecentPlays.ts

import {
  useGambaEventListener,
  useGambaEvents,
  useWalletAddress,
} from "gamba-react-v2";

import { GambaTransaction } from "gamba-core-v2";
import React from "react";
import { useRouter } from "next/router";

export function useRecentPlays() {
  const router = useRouter();

  const previousEvents = useGambaEvents("GameSettled", {});

  const [newEvents, setEvents] = React.useState<
    GambaTransaction<"GameSettled">[]
  >([]);

  useGambaEventListener(
    "GameSettled",
    (event) => {
      setEvents((events) => [event, ...events]);
    },
    [router.pathname],
  );

  // Merge previous & new events
  return React.useMemo(
    () => [...newEvents, ...previousEvents],
    [newEvents, previousEvents],
  );
}
