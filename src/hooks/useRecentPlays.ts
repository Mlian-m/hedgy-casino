// src/hooks/useRecentPlays.ts

import React, { useMemo, useState } from "react";
import {
  useGambaEventListener,
  useGambaEvents,
  useWalletAddress,
} from "gamba-react-v2";

import { GambaTransaction } from "gamba-core-v2";
import { PLATFORM_CREATOR_ADDRESS } from "../../config";
import { useRouter } from "next/router";

interface Params {
  showAllPlatforms?: boolean;
}

export function useRecentPlays(params: Params = {}) {
  const { showAllPlatforms = false } = params;
  const router = useRouter();
  const userAddress = useWalletAddress();

  // Fetch previous events
  const previousEvents = useGambaEvents("GameSettled", {
    address: !showAllPlatforms ? PLATFORM_CREATOR_ADDRESS : undefined,
  });

  const [newEvents, setNewEvents] = useState<GambaTransaction<"GameSettled">[]>(
    [],
  );

  // Listen for new events
  useGambaEventListener(
    "GameSettled",
    (event) => {
      // Ignore events that occurred on another platform
      if (
        !showAllPlatforms &&
        !event.data.creator.equals(PLATFORM_CREATOR_ADDRESS)
      )
        return;

      // Set a delay on games with suspenseful reveal
      const delay =
        event.data.user.equals(userAddress) &&
        ["plinko", "slots", "wheel", "limbo", "keno"].some((x) =>
          router.pathname.includes(x),
        )
          ? 3000
          : 1;

      setTimeout(() => {
        setNewEvents((prevEvents) => [event, ...prevEvents]);
      }, delay);
    },
    [router.pathname, userAddress, showAllPlatforms],
  );

  // Merge previous & new events
  const combinedEvents = useMemo(() => {
    const allEvents = [...newEvents, ...previousEvents];
    const uniqueEvents = Array.from(
      new Set(allEvents.map((event) => event.signature)),
    ).map(
      (signature) => allEvents.find((event) => event.signature === signature)!,
    );
    return uniqueEvents.sort((a, b) => b.time - a.time);
  }, [newEvents, previousEvents]);

  return combinedEvents;
}
