import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import {useDispatch} from "react-redux";
import {connect} from '../../store/actions/connectWalletAction';
import {Button} from "@chakra-ui/react";
import {IoIosWallet} from "react-icons/io";
// import WalletConnectProvider from "@walletconnect/web3-provider";

const YTVideo = require('../../config/YTVideo.json');
const Treasur = require('../../config/Treasur.json');

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
      cacheProvider: true, // optional
      providerOptions, // required
    });

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    const matic = [{
      chainId: '0x89',
      chainName: 'Matic Mainnet',
      nativeCurrency:
          {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
          },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com/'],
    }];
    const testnet = [{
      chainId: '0x13881',
      chainName: 'Mumbai Testnet',
      nativeCurrency:
          {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
          },
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
    }];
    web3.eth.getChainId().then((chainId) => {
      if (chainId !== 80001) { // Change for deployment
          ethereum
            .request({
            method: 'wallet_addEthereumChain',
            params: testnet, // Change for deployment
          }).then((response) => {
            if (response === null) {
              console.log('Switch OK');
            }
          });
      }
    }).catch(console.log);
    console.log(provider);
    const address = await web3.eth.getAccounts();
    console.log(address[0]);
    const YTVideoContract = new web3.eth.Contract(YTVideo, "0x30235F88dD53bb2c71ffD2C52a756aB798381857");
    const TreasurContract = new web3.eth.Contract(Treasur, "0x8F4DD7dCBea687CabaADc604e66Be3d435B8715F");
    dispatch(connect(address[0]));
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
