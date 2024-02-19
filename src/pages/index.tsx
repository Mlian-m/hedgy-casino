// src/pages/index.tsx
import Dashboard from "@/components/sections/Dashboard/Dashboard";
import Header from "@/components/sections/Header";
import React from "react";
import RecentPlays from "@/components/sections/RecentPlays/RecentPlays";
import { StyledSection } from "../components/Slider";

export default function HomePage() {
  return (
    <>
      <Header />
      <StyledSection>
        <Dashboard />
        <h2 className="text-2xl font-bold text-center">Recent Plays</h2>
        <RecentPlays />
      </StyledSection>
    </>
  );
}
