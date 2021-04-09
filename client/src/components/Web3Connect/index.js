import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import {useDispatch} from "react-redux";
import {connect} from '../../store/actions/connectWalletAction';
import {Button} from "@chakra-ui/react";
import {IoIosWallet} from "react-icons/io";
// import WalletConnectProvider from "@walletconnect/web3-provider";

const index = () => {
  const dispatch = useDispatch();
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
    console.log(provider);
    const address = await web3.eth.getAccounts();
    console.log(address[0]);
    dispatch(connect(address[0]))
  };

  return (
    <div>
      <Button leftIcon={<IoIosWallet />} onClick={setupWallet}>
        Connect wallet
      </Button>
    </div>
  );
};

export default index;
