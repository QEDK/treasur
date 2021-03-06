import React, { useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "../../store/actions/connectWalletAction";
import {Button, useToast} from "@chakra-ui/react";
import {IoIosWallet} from "react-icons/io";
// import WalletConnectProvider from "@walletconnect/web3-provider";

const YTVideo = require("../../config/YTVideo.json");
const Treasur = require("../../config/Treasur.json");
const IERC20 = require("../../config/IERC20.json");
let IERC20Contract = null;
let YTVideoContract = null;
let TreasurContract = null;
let web3 = null;

const index = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { address } = useSelector((state) => state.connectWallet);

  useEffect(() => {

    if(address) {
      return(toast({
        title: "Web3 Wallet Connected",
        description: "Your MetaMask wallet is connected successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      })
      )
    }else {
      return(toast({
        title: "Web3 Wallet Disconnected",
        description: "Your MetaMask wallet is not connected.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      })
)
    }
  }, [address])
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

     web3 = new Web3(provider);

    const matic = [
      {
        chainId: "0x89",
        chainName: "Matic Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
        blockExplorerUrls: ["https://explorer-mainnet.maticvigil.com/"],
      },
    ];
    const testnet = [
      {
        chainId: "0x13881",
        chainName: "Mumbai Testnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
      },
    ];
    web3.eth
      .getChainId()
      .then((chainId) => {
        if (chainId !== 80001) {
          // Change for deployment
          ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: testnet, // Change for deployment
            })
            .then((response) => {
              if (response === null) {
                console.log("Switch OK");
              }
            });
        }
      })
      .catch(console.log);
    const address = await web3.eth.getAccounts();
    YTVideoContract = new web3.eth.Contract(
      YTVideo,
      "0x30235F88dD53bb2c71ffD2C52a756aB798381857"
    );
    TreasurContract = new web3.eth.Contract(
      Treasur,
      "0x54b327694d71596128064b495C70Fe9F0d2919ad"
    );
    IERC20Contract = new web3.eth.Contract(IERC20, "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1")
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
export { YTVideoContract, TreasurContract, web3, IERC20Contract };
export default index;
