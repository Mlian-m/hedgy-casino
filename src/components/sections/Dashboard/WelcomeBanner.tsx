// src/components/sections/Dashboard/WelcomeBanner.tsx

import React from "react";

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center p-5 bg-gradient-to-br from-orange-300 via-pink-500 to-blue-500 bg-[length:300%_300%] animate-[welcomeFadeIn_0.5s_ease,backgroundGradient_30s_ease-infinite] rounded-lg md:grid md:grid-cols-3 md:p-0">
      <div className="md:col-span-2 md:p-10">
        <h1 className="text-xl font-bold">Welcome to Gamba v2 👋</h1>
        <p>A fair, simple and decentralized casino on Solana.</p>
      </div>
      <div className="grid grid-cols-1 gap-2.5 m-4">
        <button className="rounded-lg p-2 bg-white bg-opacity-90 hover:bg-white text-black transition-colors duration-200 ease-in-out cursor-pointer">
          🚀 Explore Transactions
        </button>
        <button className="rounded-lg p-2.5 bg-white bg-opacity-90 hover:bg-white text-black transition-colors duration-200 ease-in-out cursor-pointer">
          👨‍💻 Build your own
        </button>
        <button className="rounded-lg p-2.5 bg-white bg-opacity-90 hover:bg-white text-black transition-colors duration-200 ease-in-out cursor-pointer">
          💬 Docs
        </button>
      </div>
    </div>
  );
}
