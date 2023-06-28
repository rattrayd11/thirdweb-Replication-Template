import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  coinbaseWallet,
  magicLink,
  metamaskWallet,
  paperWallet,
  safeWallet,
  walletConnect,
} from "@thirdweb-dev/react";
// import { FantomTestnet } from "@thirdweb-dev/chains";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

// const emailWallet = magicLink({
//   apiKey: process.env.NEXT_PUBLIC_MAGIC_API as string,
// });

// const emailWallet2 = paperWallet({
//   clientId: "",
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={"goerli"}
       supportedWallets={[
        metamaskWallet(),
        // coinbaseWallet(),
        // safeWallet(),
        // walletConnect(),
        // emailWallet,
       // emailWallet2,
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
