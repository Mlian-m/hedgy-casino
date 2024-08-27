// src/components/sections/Profile.tsx

import { GambaButton } from "@/components/ui/GambaPlayButton";
import { GambaUi } from "gamba-react-ui-v2";
import { PLATFORM_REFERRAL_FEE } from "@/constants";
import React from "react";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const Profile: React.FC = () => {
  const wallet = useWallet();
  const walletModal = useWalletModal();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  const copyInvite = () => {
    if (!wallet.publicKey) {
      return walletModal.setVisible(true);
    }
    const referalLink = location.host + "?code=" + wallet.publicKey.toString();
    navigator.clipboard.writeText(referalLink);
    toast.success(
      `Copied! Share your link to earn a ${
        PLATFORM_REFERRAL_FEE * 100
      }% fee when players use this platform`,
    );
  };

  const truncateString = (s: string, startLen = 4, endLen = startLen) =>
    s.slice(0, startLen) + "..." + s.slice(-endLen);

  return (
    <div className="min-h-[75vh] flex flex-col gap-5 mt-24 pb-10 px-5 md:max-w-6xl mx-auto transition-all duration-250 ease-in-out">
      {wallet && wallet.connected ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Wallet Information
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={wallet.wallet?.adapter.icon}
                width={20}
                alt="Wallet Icon"
              />
              <span className="text-lg break-all ">
                {wallet.publicKey &&
                  truncateString(wallet.publicKey.toString(), 8, 8)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">Referral Link</h1>
            <p className="text-lg">
              Share your link to earn a {PLATFORM_REFERRAL_FEE}% fee on each
              play when players use this platform using your code.
            </p>
            Invite link:
            <div className="break-all  flex-wrap border border-gray-300 p-4 rounded-md">
              <p className="text-lg">
                {`${location.host}?code=${wallet.publicKey?.toString() || ""}`}
              </p>
            </div>
            <GambaButton onClick={copyInvite} text="Copy Invite Link" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-10 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold">Connect Wallet</h2>
          <GambaUi.Button onClick={connect}>
            {wallet.connecting ? "Connecting" : "Connect"}
          </GambaUi.Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
