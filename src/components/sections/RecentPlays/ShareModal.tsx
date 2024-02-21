// src/components/sections/RecentPlays/ShareModal.tsx

import { GambaUi, TokenValue, useTokenMeta } from "gamba-react-ui-v2";
import React, { useRef, useState } from "react";

import { GambaTransaction } from "gamba-core-v2";
import { Modal } from "@/components/Modal";
import { PLATFORM_SHARABLE_URL } from "../../../../config";
import { extractMetadata } from "@/utils/utils";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const canvasToClipboard = async (canvas: HTMLCanvasElement) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        return reject(new Error("Canvas to Blob conversion failed"));
      }
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(resolve)
        .catch(reject);
    });
  });
};

export function ShareModal({
  event,
  onClose,
}: {
  event: GambaTransaction<"GameSettled">;
  onClose: () => void;
}) {
  const router = useRouter();
  const tokenMeta = useTokenMeta(event.data.tokenMint);
  const ref = useRef<HTMLDivElement>(null);
  const profit = event.data.payout.sub(event.data.wager).toNumber();
  const percentChange = profit / event.data.wager.toNumber();
  const [copying, setCopying] = useState(false);
  const { game } = extractMetadata(event);

  const gotoGame = () => {
    router.push(`/play/${game?.id}`);
    onClose();
  };

  const copyImage = async () => {
    if (ref.current) {
      try {
        setCopying(true);
        const canvas = await html2canvas(ref.current, {
          removeContainer: true,
          backgroundColor: "#000",
        });
        await canvasToClipboard(canvas);
        toast.success(
          "📋 Copied image to clipboard. You can paste it in Twitter or Telegram etc.",
        );
      } finally {
        setCopying(false);
      }
    }
  };

  if (!game) {
    return null;
  }

  const imagePath = `/games/${game.id}/logo.png`;

  return (
    <Modal onClose={() => onClose()}>
      <div className="grid gap-2.5 p-5 pb-0 w-full">
        <div className="rounded-lg overflow-hidden">
          <div ref={ref} className="bg-[#121217]">
            <div className="grid grid-cols-[auto_1fr_auto] gap-1.5 items-center p-2.5">
              <img src={tokenMeta.image} className="rounded-full h-10" />
              <div
                className={`text-xl p-2.5 ${
                  percentChange >= 0 ? "text-[#9bffad]" : "text-[#ff4f4f]"
                }`}
              >
                <div className="font-bold">
                  {profit >= 0 ? "+" : "-"}
                  <TokenValue
                    exact
                    amount={Math.abs(profit)}
                    mint={event.data.tokenMint}
                  />
                </div>
                {profit >= 0 && (
                  <div className="text-base">
                    {profit >= 0 ? "+" : "-"}
                    {(Math.abs(percentChange) * 100).toFixed(2)}%
                  </div>
                )}
              </div>
              <div
                className="cursor-pointer p-2.5 text-center"
                onClick={gotoGame}
              >
                <img src={imagePath} className="w-24" />
              </div>
            </div>
            <div className="bg-[#00000033] text-[#ffffff99] italic flex items-center gap-2.5 p-2">
              <img src="/gamba.svg" className="w-6 h-6" />
              <div>play on {PLATFORM_SHARABLE_URL}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <GambaUi.Button
            main
            size="small"
            onClick={() =>
              window.open(
                `https://explorer.gamba.so/tx/${event.signature}`,
                "_blank",
              )
            }
          >
            Verify
          </GambaUi.Button>
          <GambaUi.Button main size="small" onClick={gotoGame}>
            Play {game?.meta?.name}
          </GambaUi.Button>
          <GambaUi.Button
            main
            size="small"
            disabled={copying}
            onClick={copyImage}
          >
            Share
          </GambaUi.Button>
        </div>
      </div>
    </Modal>
  );
}
