// src/components/sections/UserButton.tsx

import React, { useState } from "react";

import { GambaButton } from "./GambaPlayButton";
import { GambaUi } from "gamba-react-ui-v2";
import { Modal } from "./Modal";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletAddress } from "gamba-react-v2";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function ConnectedButton() {
  const [modal, setModal] = useState(false);
  const wallet = useWallet();
  const address = useWalletAddress();

  const truncateString = (s: string, startLen = 4, endLen = startLen) =>
    s.slice(0, startLen) + "..." + s.slice(-endLen);

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <h1 className="min-w-64">
            {truncateString(address.toBase58(), 8, 8)}
          </h1>
          <GambaButton onClick={() => wallet.disconnect()} text="Disconnect" />
        </Modal>
      )}
      <div className="max-sm:text-xs whitespace-nowrap">
        <GambaUi.Button onClick={() => setModal(true)}>
          <div className="flex gap-2 items-center">
            <img src={wallet.wallet?.adapter.icon} width={20} />
            {truncateString(address.toBase58(), 3)}
          </div>
        </GambaUi.Button>
      </div>
    </>
  );
}

export function UserButton() {
  const walletModal = useWalletModal();
  const wallet = useWallet();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  return (
    <>
      {wallet.connected ? (
        <ConnectedButton />
      ) : (
        <GambaUi.Button onClick={connect}>
          {wallet.connecting ? "Connecting" : "Connect"}
        </GambaUi.Button>
      )}
    </>
  );
}
