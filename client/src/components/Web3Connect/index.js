import React from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";
import { Button } from "@chakra-ui/react";
// import WalletConnectProvider from "@walletconnect/web3-provider";


const index = () => {

    const setupWallet = async () => {
        const providerOptions = {
            //   walletconnect: {
            //     package: WalletConnectProvider, // required
            //     options: {
            //       infuraId: "INFURA_ID", // required
            //     },
            //   },
          };
          
          const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions, // required
          });
          
          const provider = await web3Modal.connect();
          
          const web3 = new Web3(provider);
        //   TODO: Store the wallet address from
        // Provider object
          console.log(provider)
    }
    
    return (
        <div>
           <Button onClick={setupWallet}>Connect wallet</Button> 
        </div>
    )
}

export default index
