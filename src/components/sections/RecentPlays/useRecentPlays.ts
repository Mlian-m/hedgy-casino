// src/components/sections/RecentPlays/useRecentPlays.ts
// src/components/sections/RecentPlays/useRecentPlays.ts

import React, { useMemo, useState } from "react";
import {
  useGambaEventListener,
  useGambaEvents,
  useWalletAddress,
} from "gamba-react-v2";

import { GambaTransaction } from "gamba-core-v2";
import { PLATFORM_CREATOR_ADDRESS } from "../../../../config";
import { useRouter } from "next/router";

export function useRecentPlays() {
  const router = useRouter();
  const userAddress = useWalletAddress();

  // Fetch previous events from our platform
  const previousEvents = useGambaEvents("GameSettled", {
    address: PLATFORM_CREATOR_ADDRESS,
  });

  const [newEvents, setEvents] = useState<GambaTransaction<"GameSettled">[]>(
    []
  );

  // Listen for new events
  useGambaEventListener(
    "GameSettled",
    (event) => {
      // Ignore events that occurred on another platform
      if (!event.data.creator.equals(PLATFORM_CREATOR_ADDRESS)) return;

      // Handle delays in platform library
      const delay =
        event.data.user.equals(userAddress) &&
        ["plinko", "slots"].some((x) => router.pathname.includes(x))
          ? 3000
          : 1;
      setTimeout(() => {
        setEvents((events) => [event, ...events]);
      }, delay);
    },
    [router.pathname, userAddress] // Updated dependency array to use router.pathname
  );

  // Merge previous & new events
  return useMemo(
    () => [...newEvents, ...previousEvents],
    [newEvents, previousEvents]
  );
}
