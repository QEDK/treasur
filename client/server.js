require("dotenv").config();
const express = require("express");
const Web3 = require("web3");
const path = require("path");
const {Client} = require("pg");
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});
client.connect();
const app = express();
// var web3 = new Web3('https://rpc-mainnet.maticvigil.com/');
var web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com/")
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/offer", async (req, res) => {
  const {tokenURIStr, offerValue, offerAccount, offerName, offerAvatar} = req.body;
  try {
    const queryText = `INSERT INTO YTokens(yt_id, status) VALUES('${tokenURIStr}', 'offered') ; 
    INSERT INTO offers(yt_id, offervalue, offeraccount, offername, offeravatar, offertime) VALUES ('${tokenURIStr}', ${offerValue}, '${offerAccount}', '${offerName}', '${offerAvatar}', '${new Date().toISOString()}');`;
    client.query(queryText).then(console.log);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.post("/counterOffer", async (req, res) => {
  const {tokenURI} = req.body;
 const queryText = `SELECT offervalue, offeraccount, offername, offeravatar, offertime from Offers WHERE yt_id = '${tokenURI}'`
 client.query(queryText).then(console.log);
});
app.post("/mint", async (req, res) => {
  try {
    const {tokenUri, tokenURIStr, tokenCreator} = req.body;
    console.log(tokenUri, tokenURIStr, tokenCreator);
    const rv = await TreasurContract.methods
      .approveMint(tokenUri, tokenURIStr, tokenCreator)
      .send({
        from: "0xd1058ECCEE8102Bb8C1A7390b7d6Ea2CB6dA8E0e",
        gas: "500000",
      });
    console.log(rv);
    if (rv.status) {
      const queryText = `UPDATE YTokens SET tokenid = ${rv.events.Mint.returnValues.tokenId}, status = 'minted',\
        owner = '${rv.events.Mint.returnValues.addr}', creator = '${tokenCreator}' WHERE yt_id = '${tokenURIStr}'`;
      client.query(queryText).then(console.log);
      res.send(rv);
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
app.listen(8080);
