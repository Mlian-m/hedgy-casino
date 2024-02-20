// src/components/sections/RecentPlays/useRecentPlays.ts

import { useGambaEventListener, useGambaEvents } from "gamba-react-v2";

import { GambaTransaction } from "gamba-core-v2";
import { PLATFORM_CREATOR_ADDRESS } from "../../../../config";
import React from "react";
import { useRouter } from "next/router";

export function useRecentPlays(platformOnly = false) {
  const router = useRouter();

  const eventFilter = platformOnly ? { address: PLATFORM_CREATOR_ADDRESS } : {};
  const previousEvents = useGambaEvents("GameSettled", eventFilter);

  const [newEvents, setEvents] = React.useState<
    GambaTransaction<"GameSettled">[]
  >([]);

  useGambaEventListener(
    "GameSettled",
    (event) => {
      if (platformOnly && !event.data.creator.equals(PLATFORM_CREATOR_ADDRESS))
        return;
      setEvents((events) => [event, ...events]);
    },
    [router.pathname, platformOnly],
  );

  return React.useMemo(
    () => [...newEvents, ...previousEvents],
    [newEvents, previousEvents],
  );
}
