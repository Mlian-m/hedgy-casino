// src/components/sections/Header.tsx

import React, { useState } from "react";
import { TokenValue, useCurrentPool, useUserBalance } from "gamba-react-ui-v2";

import Link from "next/link";
import { Modal } from "../Modal";
import TokenSelect from "./TokenSelect";
import { UserButton } from "./UserButton";

export default function Header() {
  const pool = useCurrentPool();
  const balance = useUserBalance();
  const [bonusHelp, setBonusHelp] = useState(false);
  const [jackpotHelp, setJackpotHelp] = useState(false);

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>You have a bonus!</h1>
          <p>
            You have{" "}
            <b>
              <TokenValue amount={balance.bonusBalance} />
            </b>{" "}
            worth of free plays. This bonus will be applied automatically when
            you play.
          </p>
        </Modal>
      )}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot</h1>
          <p>
            There&apos;s <TokenValue amount={pool.jackpotBalance} /> in the
            Jackpot.
          </p>
        </Modal>
      )}
      <div className="flex items-center justify-between w-full p-2.5 bg-[rgba(33,34,51,0.9)] fixed top-0 left-0 z-50 backdrop-blur-[20px]">
        <div className="flex gap-5 items-center">
          <Link href="/" passHref>
            <a className="h-9 m-0 cursor-pointer">
              <img alt="Gamba logo" src="/logo.svg" className="h-full" />
            </a>
          </Link>
        </div>
        <div className="flex gap-2.5 items-center relative">
          {pool.jackpotBalance > 0 && (
            <button
              onClick={() => setJackpotHelp(true)}
              className="all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold transition-colors duration-200 hover:bg-white"
            >
              <TokenValue amount={pool.jackpotBalance} />
            </button>
          )}
          {balance.bonusBalance > 0 && (
            <button
              onClick={() => setBonusHelp(true)}
              className="all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold transition-colors duration-200 hover:bg-white"
            >
              +<TokenValue amount={balance.bonusBalance} />
            </button>
          )}
          <TokenSelect />
          <UserButton />
        </div>
      </div>
    </>
  );
}
