// src/pages/index.tsx
import Dashboard from "@/components/sections/Dashboard/Dashboard";
import Header from "@/components/sections/Header";
import React from "react";
import RecentPlays from "@/components/sections/RecentPlays/RecentPlays";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="relative mx-auto flex flex-col gap-5 max-sm:pt-20 md:pt-20 pb-10 px-2.5 transition-all duration-250 ease-in-out sm:px-5 sm:pt-5 md:max-w-6xl">
        <Dashboard />
        <h2 className="text-2xl font-bold text-center">Recent Plays</h2>
        <RecentPlays />
      </div>
    </>
  );
}
