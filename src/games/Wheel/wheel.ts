// src/games/Wheel/wheel.ts
/*
 * Author: BankkRoll
 */
import * as PIXI from "pixi.js";

export const radius = 168;

export const drawWheel = (
  wheel: PIXI.Container,
  segments: string[],
  segmentColors: string[],
): void => {
  wheel.removeChildren();

  const segmentAngle = 360 / segments.length;

  const textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 28,
    fontWeight: "bold",
    fill: ["#ffffff", "#00ccff"],
    stroke: "#000000",
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 2,
  });

  segments.forEach((segment, index) => {
    const colorNumber = parseInt(segmentColors[index].replace(/^#/, ""), 16);

    const gradient = new PIXI.Graphics();
    gradient.beginFill(colorNumber);
    gradient.lineStyle(2, 0xffffff, 1);
    gradient
      .moveTo(0, 0)
      .arc(
        0,
        0,
        radius,
        index * segmentAngle * (Math.PI / 180),
        (index + 1) * segmentAngle * (Math.PI / 180),
      )
      .closePath();
    gradient.endFill();
    wheel.addChild(gradient as PIXI.DisplayObject);

    const labelAngle = (index + 0.5) * segmentAngle * (Math.PI / 180);
    const labelText = new PIXI.Text(segment, textStyle);
    labelText.anchor.set(0.5);
    labelText.rotation = labelAngle + Math.PI / 2;
    labelText.position.set(
      radius * 0.85 * Math.cos(labelAngle),
      radius * 0.85 * Math.sin(labelAngle),
    );
    wheel.addChild(labelText as PIXI.DisplayObject);
  });
};
