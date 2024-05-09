// src/components/sections/Dashboard/WelcomeBanner.tsx
import React from "react";

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-lg lg:grid lg:grid-cols-3 gap-4 lg:p-10 bg-transparent">
      <div
        style={{
          backgroundImage: "url(/seo.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "perspective(800px) rotateX(40deg)",
          transformOrigin: "top center",
          zIndex: -1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 transform rotate-12 scale-150 blur-xl pointer-events-none"></div>

      <div className="lg:col-span-2 text-center lg:text-left">
        <div className="flex items-center justify-center md:justify-start">
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
            Welcome to Gamba
          </h1>
          <img src="/wave.gif" className="h-14" alt="Gamba Logo" />
        </div>
        <p className="mt-4 text-white drop-shadow">
          The gambleFi protocol with end-to-end tools for on-chain degeneracy on
          Solana.
        </p>
      </div>
      <div className="whitespace-nowrap grid grid-cols-2 grid-rows-2 gap-2 mt-5 md:flex md:flex-col md:mt-0 md:justify-start">
        <button
          onClick={() =>
            window.open("https://github.com/BankkRoll/Gamba-V2-Next.js")
          }
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          👨‍💻 Build your own
        </button>
        <button
          onClick={() => window.open("https://explorer.gamba.so/create")}
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          🚀 Create Pool
        </button>
        <button
          onClick={() => window.open("https://gamba.so/docs")}
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          📖 Gamba Docs
        </button>
        <button
          onClick={() => window.open("https://discord.com/invite/HSTtFFwR")}
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          💬 Join Discord
        </button>
      </div>
    </div>
  );
}
