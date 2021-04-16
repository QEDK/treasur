require("dotenv").config();
const express = require("express");
const Web3 = require("web3");
const path = require("path");
const app = express();
// var web3 = new Web3('https://rpc-mainnet.maticvigil.com/');
var web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com/")
);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

web3.eth.accounts.wallet.add(account);

const Treasur = require("./src/config/Treasur.json");
const TreasurContract = new web3.eth.Contract(
  Treasur,
  "0x54b327694d71596128064b495C70Fe9F0d2919ad"
);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/mint", async (req, res) => {
  try {
    const {tokenUri, tokenURIStr, tokenCreator} = req.body;
    const rv = await TreasurContract.methods
      .approveMint(tokenUri, tokenURIStr, tokenCreator)
      .send({
        from: "0xd1058ECCEE8102Bb8C1A7390b7d6Ea2CB6dA8E0e",
        gasPrice: "20",
        gas: "200000",
      });
    res.send(rv);
  } catch (e) {
    console.error(e);
  }
});
app.listen(8080);
