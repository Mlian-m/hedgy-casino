/**
 * COPYRIGHT NOTICE
 * =================
 * This code includes a specific transaction that directs a small percentage fee to the game developer ("Gamedev address").
 * This fee is crucial for the continued development and maintenance of the game. As such, altering or removing this transaction
 * is strictly prohibited. Users are welcome to adjust their own creator fees within the constraints of the gamba provider _app.tsx
 * framework, but the integrity of the game developer's fee must remain intact as this is open source for free please allow dev to make something.
 *
 * Please respect the rights and efforts of the game developers. Unauthorized modification of this code or its transaction
 * components may be subject to legal action and/or punishment.
 *
 * This fee is only charged on games built by bankkmatic. Thank you for your cooperation and understanding.
 * Games include [ Wheel, Limbo, Keno] please remove the games if you dont want users to pay the fee.
 */

import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useGambaPlatformContext, useUserBalance } from "gamba-react-ui-v2";
import { useGambaProvider, useSendTransaction } from "gamba-react-v2";

import { getPoolAddress } from "gamba-core-v2";

export default function useCustomPlay(gameId: string) {
  const gambaProvider = useGambaProvider();
  const sendTransaction = useSendTransaction();
  const platformContext = useGambaPlatformContext();
  const balances = useUserBalance();

  return async (wager: number, bet: number[]) => {
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: gambaProvider.wallet.publicKey,
      toPubkey: new PublicKey("GzzWXXDjLD4FDwDkWB5sARjC2aaLSfCQDjx3dmpoTY7K"),
      lamports: 1e9 * 0.001, // 0.001 SOL to Gamedev
    });
    const playInstruction = await gambaProvider.play(
      wager,
      bet,
      platformContext.clientSeed,
      getPoolAddress(
        platformContext.selectedPool.token,
        platformContext.selectedPool.authority,
      ),
      platformContext.selectedPool.token,
      platformContext.platform.creator,
      platformContext.defaultCreatorFee,
      platformContext.defaultJackpotFee,
      `0:${gameId}:Bankkmatic Games (https://x.com/bankkroll_eth)`,
      balances.bonusBalance > 0,
    );

    return sendTransaction([transferSolInstruction, playInstruction]);
  };
}
