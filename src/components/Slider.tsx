// src/components/Slider.tsx

import React from "react";
import styled from "styled-components";

export const StyledSection = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  transition:
    width 0.25s ease,
    padding 0.25s ease;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;

  @media (min-width: 600px) {
    padding: 20px;
    width: 1000px;
  }
  @media (min-width: 1280px) {
    padding: 20px;
    width: 1100px;
  }
`;

export function SlideSection(props: React.PropsWithChildren) {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden mx-2 md:mx-4 lg:mx-6 xl:mx-8 2xl:mx-10">
      <div
        className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        ref={ref}
      >
        {React.Children.map(props.children, (child) => (
          <div
            className="snap-start shrink-0"
            style={{ width: "auto", maxWidth: "100%" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
