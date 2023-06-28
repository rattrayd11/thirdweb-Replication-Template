import { useState, useEffect } from "react";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
  ThirdwebNftMedia,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x0Ae3359B31697f352118cf7CE1C7bea0E4e285F0";
  const { contract } = useContract(contractAddress);
  const { data: nft } = useNFT(contract, 0);
  const { data: ownedNFTs } = useOwnedNFTs(contract, address);
  const [gasCost, setGasCost] = useState<string | null>(null);
// CONNECT WALLET COMPONENT
  useEffect(() => {
    const prepareAndEstimateGasCost = async () => {
      if (contract) {
        try {
          const tx = await contract.erc721.claim.prepare(1);
          const gasCost = await tx.estimateGasCost();
          setGasCost(gasCost.ether);
          console.log("gasCost");
          console.log(gasCost);
        } catch (error) {
          console.error("Error preparing and estimating gas cost:", error);
        }
      }
    };

    prepareAndEstimateGasCost();
  }, [contract]);

// CONNECT WALLET  & WEB3 BUTTON COMPONENTS

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="http://thirdweb.com/">thirdweb</a> Replication Template
        </h1>

        <p className={styles.description}>
          1. Configure your desired network and supported wallets in{" "}
          <code className={styles.code}>pages/_app.tsx</code>
          <br></br>
          2. Modify the{" "}
          <code className={styles.code}>pages/index.tsx</code> file with your contract address and any code needed to replicate errors.
        </p>

        <h2>Connect Wallet</h2>
        <div className={styles.connect}>
          <ConnectWallet modalTitle="login" />
        </div>
        <h2>Web3Button</h2>

        
        <div className={styles.connect}>
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) =>
              contract.erc721.claim(1)
            }
            onSuccess={(result) => {
              console.log(result);
              alert("Success!");
            }}
          >
            Do something cool!!
          </Web3Button>
        </div>

        <div>{gasCost !== null && <p>Estimated Gas Cost: {gasCost}</p>}</div>

        <div className={styles.grid}>
          {ownedNFTs && ownedNFTs.length > 0 && (
            <button>Tokengated Button</button>
          )}
        </div>
        <p>NFT Token ID #0:</p>
        <div className={styles.grid}>
          {nft && <ThirdwebNftMedia metadata={nft.metadata} />}
        </div>

        <p>Owned NFTs:</p>
        <div className={styles.nftBoxGrid}>
          {ownedNFTs?.map((nft) => (
              <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
              <h3>{nft.metadata.name}</h3>
              </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
