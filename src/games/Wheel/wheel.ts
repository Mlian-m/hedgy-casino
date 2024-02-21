// src/games/Wheel/wheel.ts
import * as PIXI from "pixi.js";

export const radius = 200;

const glowAnimatedRing = (
  app: {
    screen: { width: number; height: number };
    stage: { addChild: (arg0: any) => void };
    ticker: PIXI.Ticker;
  },
  radius: number,
  thickness: number = 5,
  colors: number[] = [0x3366ff, 0x0000ff, 0x272238],
) => {
  const ringsContainer = new PIXI.Container();
  ringsContainer.x = app.screen.width / 2;
  ringsContainer.y = app.screen.height / 2;
  app.stage.addChild(ringsContainer as PIXI.DisplayObject);

  const baseRing = new PIXI.Graphics();
  baseRing.lineStyle(thickness, 0xffffff);
  baseRing.drawCircle(0, 0, radius);
  ringsContainer.addChild(baseRing as PIXI.DisplayObject);

  colors.forEach((color, index) => {
    const ring = new PIXI.Graphics();
    ring.lineStyle(thickness, color);
    const ringRadius = radius + thickness * 2 * (index + 1);
    ring.drawCircle(0, 0, ringRadius);
    ringsContainer.addChild(ring as PIXI.DisplayObject);

    const ball = new PIXI.Graphics();
    ball.beginFill(color);
    ball.drawCircle(0, 0, thickness);
    ringsContainer.addChild(ball as PIXI.DisplayObject);

    let angle = 0;
    app.ticker.add(() => {
      angle += 0.02 * (index + 1) * (index % 2 === 0 ? 1 : -1);
      ball.x = ringRadius * Math.cos(angle);
      ball.y = ringRadius * Math.sin(angle);
    });
  });
};

export const drawTicker = (app: PIXI.Application, radius: number) => {
  glowAnimatedRing(app, radius);
  const ticker = new PIXI.Graphics();
  ticker.beginFill(0x0000ff);
  ticker.lineStyle(3, 0xffffff);
  ticker.drawPolygon([-25, 0, 25, 0, 0, 40]);
  ticker.endFill();

  const tickerShadow = new PIXI.Graphics();
  tickerShadow.beginFill(0x000000, 0.5);
  tickerShadow.drawPolygon([-32, 0, 32, 0, 0, 52]);
  tickerShadow.endFill();

  tickerShadow.x = app.screen.width / 2 - 1;
  tickerShadow.y = app.screen.height / 2 - radius - 11;
  app.stage.addChild(tickerShadow as PIXI.DisplayObject);

  ticker.x = app.screen.width / 2;
  ticker.y = app.screen.height / 2 - radius - 10;
  app.stage.addChild(ticker as PIXI.DisplayObject);

  const reflection = new PIXI.Graphics();
  reflection.beginFill(0xffffff);
  reflection.drawPolygon([-30, 0, 30, 0, 0, 50]);
  reflection.endFill();
  reflection.alpha = 0.2;
  reflection.x = ticker.x;
  reflection.y = ticker.y;
  app.stage.addChild(reflection as PIXI.DisplayObject);
};

export const drawWheel = (
  wheel: PIXI.Container,
  segments: string[],
  segmentColors: string[],
) => {
  wheel.removeChildren();

  const segmentGraphics = new PIXI.Graphics();
  wheel.addChild(segmentGraphics as PIXI.DisplayObject);

  const segmentAngle = 360 / segments.length;

  const textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 52,
    fontWeight: "bold",
    fill: ["#ffffff", "#00ccff"],
    stroke: "#000000",
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 6,
  });

  segments.forEach((segment, index) => {
    const startAngle = index * segmentAngle * (Math.PI / 180);
    const endAngle = (index + 1) * segmentAngle * (Math.PI / 180);

    const colorNumber = parseInt(segmentColors[index].replace(/^#/, ""), 16);

    const gradient = new PIXI.Graphics();
    gradient.beginFill(colorNumber);
    gradient.lineStyle(2, 0xffffff, 1);
    gradient.moveTo(0, 0).arc(0, 0, radius, startAngle, endAngle).closePath();
    gradient.endFill();

    gradient.name = segment;

    wheel.addChild(gradient as PIXI.DisplayObject);

    const labelAngle = startAngle + (endAngle - startAngle) / 2;
    const labelRadius = radius * 0.8;

    const labelText = new PIXI.Text(segment, textStyle);
    labelText.anchor.set(0.5, 0.5);
    labelText.rotation = labelAngle + Math.PI / 2;
    labelText.position.set(
      labelRadius * Math.cos(labelAngle),
      labelRadius * Math.sin(labelAngle),
    );

    wheel.addChild(labelText as PIXI.DisplayObject);
  });
};
