// src/pages/_app.tsx
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import {
  BASE_SEO_CONFIG,
  LIVE_EVENT_TOAST,
  PLATFORM_CREATOR_FEE,
  PLATFORM_JACKPOT_FEE,
  TOKENLIST,
} from "../constants";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Footer from "@/components/layout/Footer";
import GameToast from "@/hooks/useGameEvent";
import Header from "@/components/layout/Header";
import { Toaster } from "sonner";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useDisclaimer } from "@/hooks/useDisclaimer";
import { useMemo } from "react";
import { useUserStore } from "@/hooks/useUserStore";
import { PublicKey } from "@solana/web3.js";

import { GambaPlatformProvider, TokenMetaProvider } from "gamba-react-ui-v2";
import { GambaProvider, SendTransactionProvider } from "gamba-react-v2";

// Dynamic imports
// import dynamic from "next/dynamic";

// const GambaPlatformProvider = dynamic(
//   () => import("gamba-react-ui-v2").then((mod) => mod.GambaPlatformProvider),
//   { ssr: false }
// );

// const TokenMetaProvider = dynamic(
//   () => import("gamba-react-ui-v2").then((mod) => mod.TokenMetaProvider),
//   { ssr: false }
// );

// const GambaProvider = dynamic(
//   () => import("gamba-react-v2").then((mod) => mod.GambaProvider),
//   { ssr: false }
// );

// const SendTransactionProvider = dynamic(
//   () => import("gamba-react-v2").then((mod) => mod.SendTransactionProvider),
//   { ssr: false }
// );

function MyApp({ Component, pageProps }: AppProps) {
  const { showDisclaimer, DisclaimerModal } = useDisclaimer();
  const { isPriorityFeeEnabled, priorityFee, set } = useUserStore((state) => ({
    isPriorityFeeEnabled: state.isPriorityFeeEnabled,
    priorityFee: state.priorityFee,
    set: state.set,
  }));

  const sendTransactionConfig = isPriorityFeeEnabled ? { priorityFee } : {};

  const network = WalletAdapterNetwork.Mainnet;

  const RPC_ENDPOINT =
    process.env.NEXT_PUBLIC_RPC_ENDPOINT ??
    "https://api.mainnet-beta.solana.com";

  if (!process.env.NEXT_PUBLIC_PLATFORM_CREATOR) {
    throw new Error(
      "NEXT_PUBLIC_PLATFORM_CREATOR environment variable is not set"
    );
  }

  const PLATFORM_CREATOR_ADDRESS = new PublicKey(
    process.env.NEXT_PUBLIC_PLATFORM_CREATOR as string
  );

  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider
      endpoint={RPC_ENDPOINT}
      config={{ commitment: "processed" }}
    >
      <WalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>
          <TokenMetaProvider tokens={TOKENLIST}>
            <SendTransactionProvider {...sendTransactionConfig}>
              <GambaProvider>
                <GambaPlatformProvider
                  creator={PLATFORM_CREATOR_ADDRESS}
                  defaultCreatorFee={PLATFORM_CREATOR_FEE}
                  defaultJackpotFee={PLATFORM_JACKPOT_FEE}
                >
                  <Header />
                  <DefaultSeo {...BASE_SEO_CONFIG} />
                  <Component {...pageProps} />
                  <Footer />
                  <Toaster
                    position="bottom-right"
                    richColors
                    toastOptions={{
                      style: {
                        backgroundImage:
                          "linear-gradient(to bottom right, #1e3a8a, #6b21a8)",
                      },
                    }}
                  />
                  {LIVE_EVENT_TOAST && <GameToast />}
                  {showDisclaimer && <DisclaimerModal />}
                </GambaPlatformProvider>
              </GambaProvider>
            </SendTransactionProvider>
          </TokenMetaProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
