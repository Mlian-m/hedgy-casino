// src/referral/index.ts
import { fetchReferral, getRefererPda } from "./program";

import { PublicKey } from "@solana/web3.js";

const PLATFORM_CREATOR_ADDRESS = new PublicKey(
  process.env.NEXT_PUBLIC_PLATFORM_CREATOR as string,
);

export const extractReferralAddress = (): PublicKey | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get("code");
  if (!referralCode) return null;

  try {
    const publicKey = new PublicKey(referralCode);
    sessionStorage.setItem("referralAddress", referralCode);
    cleanUrlParams(urlParams);
    return publicKey;
  } catch (err) {
    console.error("Invalid referral address:", err);
    return null;
  }
};

export const fetchAndStoreReferral = async (
  anchorProvider: any,
  walletPublicKey: PublicKey | null,
) => {
  try {
    const pda = getRefererPda(
      PLATFORM_CREATOR_ADDRESS,
      walletPublicKey ?? PublicKey.default,
    );
    const referer = await fetchReferral(anchorProvider, pda);
    if (referer) {
      sessionStorage.setItem("referralAddressOnChain", referer.toString());
    }
  } catch (err) {
    console.error("Referral", err);
  }
};

export const cleanUrlAndExtractReferral = () => {
  try {
    const address = extractReferralAddress();
    if (address) {
      sessionStorage.setItem("referralAddress", address.toString());
    }
  } catch (err) {
    console.error("Error extracting or cleaning referral address:", err);
  }
};

const cleanUrlParams = (urlParams: URLSearchParams) => {
  urlParams.delete("code");
  const newUrl = `${window.location.pathname}${
    urlParams.toString() ? "?" + urlParams.toString() : ""
  }${window.location.hash}`;
  window.history.replaceState({}, "", newUrl);
};
