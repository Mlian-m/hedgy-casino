// src/components/sections/Header.tsx

import React, { useState } from "react";
import { TokenValue, useCurrentPool, useUserBalance } from "gamba-react-ui-v2";

import Link from "next/link";
import { Modal } from "../Modal";
import TokenSelect from "./TokenSelect";
import { UserButton } from "./UserButton";
import styled from "styled-components";

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #003c00;
  border-radius: 10px;
  background: #03ffa4;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background 0.2s;
  &:hover {
    background: white;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: rgba(33, 34, 51, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`;

const Logo = styled.a`
  height: 35px;
  margin: 0 10px;
  cursor: pointer;
  & > img {
    height: 100%;
  }
`;

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
            There&apos;s <TokenValue amount={pool.jackpotBalance} /> in the Jackpot.
          </p>
        </Modal>
      )}
      <StyledHeader>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link href="/" passHref>
            <Logo>
              <img alt="Gamba logo" src="/logo.svg" />
            </Logo>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            position: "relative",
          }}
        >
          {pool.jackpotBalance > 0 && (
            <Bonus onClick={() => setJackpotHelp(true)}>
              <TokenValue amount={pool.jackpotBalance} />
            </Bonus>
          )}
          {balance.bonusBalance > 0 && (
            <Bonus onClick={() => setBonusHelp(true)}>
              +<TokenValue amount={balance.bonusBalance} />
            </Bonus>
          )}
          <TokenSelect />
          <UserButton />
        </div>
      </StyledHeader>
    </>
  );
}
