// src/games/ExampleGame/ExampleGame.tsx

import { GambaUi, useSound, useWagerInput } from "gamba-react-ui-v2";
import React, { useRef } from "react";

import GambaPlayButton from "@/components/ui/GambaPlayButton";
import { toast } from "sonner";

export default function ExampleGame() {
  const _hue = useRef(0);
  const [wager, setWager] = useWagerInput();
  const game = GambaUi.useGame();
  const SOUND = "/games/Dice/play.mp3";
  const sound = useSound({ test: SOUND });

  const play = async () => {
    try {
      sound.play("test");
      await game.play({
        wager,
        bet: [2, 0],
      });
      const result = await game.result();
      console.log(result);
    } catch (err: any) {
      toast.error(`An error occurred: ${err.message}`);
    }
  };

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            const scale = 3 + Math.cos(clock.time) * 0.5;
            const hue = _hue.current;

            ctx.fillStyle = "hsla(" + hue + ", 50%, 3%, 1)";
            ctx.fillRect(0, 0, size.width, size.height);

            ctx.save();
            ctx.translate(size.width / 2, size.height / 2);

            for (let i = 0; i < 5; i++) {
              ctx.save();
              ctx.scale(scale * (1 + i), scale * (1 + i));
              ctx.fillStyle = "hsla(" + hue + ", 75%, 60%, .2)";
              ctx.beginPath();
              ctx.arc(0, 0, 10, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }

            ctx.fillStyle = "hsla(" + hue + ", 75%, 60%, 1)";
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "32px Arial";

            ctx.fillStyle = "hsla(" + hue + ", 75%, 90%, 1)";
            ctx.fillText("HELLO", 0, 0);

            ctx.restore();
          }}
        />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaPlayButton disabled={!wager} onClick={play} text="Play" />
      </GambaUi.Portal>
    </>
  );
}
