import styled, { keyframes } from "styled-components";

const generateMultipleBoxShadows = (n: number) => {
  if (typeof window === "undefined") return "";
  const maxX = window.innerWidth;
  const maxY = 4000;

  let value = `${Math.random() * maxX}px ${Math.random() * maxY}px #ffffff`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.random() * maxX}px ${Math.random() * maxY}px #ffffff`;
  }
  return value;
};

const shadowsSmall = generateMultipleBoxShadows(700);
const shadowsMedium = generateMultipleBoxShadows(200);
const shadowsBig = generateMultipleBoxShadows(100);

export const animStar = keyframes`
  from {
    transform: translateY(-100vh);
  }
  to {
    transform: translateY(0);
  }
`;

export const StarsLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  animation: ${animStar} linear infinite;
`;

export const StarsLayer1 = styled(StarsLayer)`
  width: 1px;
  height: 1px;
  animation-duration: 150s;
  opacity: 1;
  transition: opacity 12s;
  box-shadow: ${shadowsSmall};
`;

export const LineLayer1 = styled(StarsLayer)`
  width: 1px;
  height: 12px;
  top: -12px;
  animation-duration: 75s;
  opacity: 0;
  transition: opacity 2s;
  box-shadow: ${shadowsSmall};
`;

export const StarsLayer2 = styled(StarsLayer)`
  width: 2px;
  height: 2px;
  animation-duration: 100s;
  box-shadow: ${shadowsMedium};
`;

export const LineLayer2 = styled(StarsLayer)`
  width: 2px;
  height: 25px;
  top: -25px;
  animation-duration: 6s;
  opacity: 0;
  transition: opacity 1s;
  box-shadow: ${shadowsMedium};
`;

export const StarsLayer3 = styled(StarsLayer)`
  width: 3px;
  height: 3px;
  animation-duration: 50s;
  box-shadow: ${shadowsBig};
`;

export const LineLayer3 = styled(StarsLayer)`
  width: 2px;
  height: 50px;
  top: -50px;
  animation-duration: 3s;
  opacity: 0;
  transition: opacity 1s;
  box-shadow: ${shadowsBig};
`;

export const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
`;

export const MultiplierText = styled.div`
  font-size: 48px;
  color: ${(props) => props.color || "#fff"};
  text-shadow: 0 0 20px #fff;
  z-index: 1;
  font-family: monospace;
  position: absolute; // Make sure it is positioned absolutely if needed within a relative container
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); // This ensures it is centered exactly at the middle of the container
`;

export const Rocket = styled.div`
  position: absolute;
  width: 120px;
  aspect-ratio: 1 / 1;
  background-image: url("/games/crash/rocket.gif");
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 0.1s ease-out;
`;
