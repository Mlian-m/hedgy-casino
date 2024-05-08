// src/games/Crash/slider.tsx
import React from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 40px;
`;

const SliderLabel = styled.label`
  position: absolute;
  right: 40px;
`;

const Slider = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url("/games/crash/rocket.gif");
    background-size: 100% 100%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url("/games/crash/rocket.gif");
    background-size: 100% 100%;
    cursor: pointer;
  }
`;

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function CustomSlider({ value, onChange }: CustomSliderProps) {
  const multipliers = React.useMemo(
    () =>
      Array.from({ length: 99 }).map((_, i) => {
        // Generate values between 2 and 100
        return 2 + i;
      }),
    [],
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(multipliers[Number(e.target.value)]);
  };

  const sliderValue = multipliers.indexOf(value);
  const percentage = (sliderValue / 98) * 100;

  return (
    <SliderContainer>
      <SliderLabel style={{ top: "-10px" }}>Target</SliderLabel>
      <Slider
        style={{
          background: `linear-gradient(to right, #007bff ${percentage}%, #d3d3d3 ${percentage}%)`,
        }}
        min="0"
        max="98"
        value={sliderValue.toString()}
        onChange={handleSliderChange}
      />
      <SliderLabel style={{ bottom: "-10px" }}>{value.toFixed(2)}x</SliderLabel>
    </SliderContainer>
  );
}
