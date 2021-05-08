require("dotenv").config();
const express = require("express");
const Web3 = require("web3");
const path = require("path");
const {Client} = require("pg");
const {convertObjectToBinary} = require("./src/utils/binary");
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

app.get('/live', async (req, res) => {
  const queryText = `SELECT yt_id from YTokens LIMIT 10;`;
  const data = await client.query(queryText);
  // console.log("DATA", data.rows);
  res.send(data.rows);
})

app.post("/offer", async (req, res) => {
  const {tokenURIStr, offerValue, offerAccount, offerName, offerAvatar} = req.body;
  try {
    const lastOfferObj = [{
      timestamp: new Date().toISOString(),
      offerValue: offerValue,
      offerAccount: offerAccount,
      offerName: offerName,
      offerAvatar: offerAvatar,
    }];
    const queryText = `INSERT INTO YTokens(yt_id, status) VALUES('${tokenURIStr}', 'offered');
    INSERT INTO offers(yt_id, offervalue, offeraccount, offername, offeravatar, offertime, history) VALUES
    ('${tokenURIStr}', ${offerValue}, '${offerAccount}', '${offerName}', '${offerAvatar}',
    '${new Date().toISOString()}', '${JSON.stringify(lastOfferObj)}');`;
    client.query(queryText).then(console.log);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.post("/counterOffer", async (req, res) => {
  const { offerValue, offerAccount, offerName, offerAvatar, tokenURI} = req.body;
  const queryText = `SELECT history from Offers WHERE yt_id = '${tokenURI}'`;
  const lastOffer = await client.query(queryText);
  const {
    history: history,
  } = lastOffer.rows[0];

  const lastOfferObj = history.concat({
      timestamp: new Date().toISOString(),
      offerValue: offerValue,
      offerAccount: offerAccount,
      offerName: offerName,
      offerAvatar: offerAvatar,
  });
  console.log(lastOfferObj);
  const insertText = `UPDATE offers SET offervalue = ${offerValue}, offeraccount = '${offerAccount}',
  offername = '${offerName}', offeravatar = '${offerAvatar}', offertime = '${new Date().toISOString()}',
  history = '${JSON.stringify(lastOfferObj)}' WHERE yt_id = '${tokenURI}'`;
  client.query(insertText).then(console.log);
  res.sendStatus(200);
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

app.post("/declinemint", async (req, res) => {
  const { tokenUri } = req.body;
    const successfulDecline = await TreasurContract.methods.declineMint(tokenUri).send({})
    res.send(successfulDecline);
})
app.get("/info", async (req, res) => {
  const { uri } = req.body;
  const queryText = `SELECT history from OFFERS where yt_id = ${uri};`
  const rv = await client.query(queryText)
  console.log(rv);
})

app.get("/myvideos", async(req, res) => {
  const queryText = `SELECT yt_id, offeraccount, offervalue FROM offers;`
  const rv = await client.query(queryText);
  res.send(rv.rows)
})

app.get("/history/:tokenuri", async (req, res) => {
  console.log("QUERY SHOTTTT")
    const { tokenUri } = req.params;
    const queryText = `SELECT history from offers where yt_id = '${tokenUri}';`
    const rv = await client.query(queryText);
    console.log(rv.rows);
})
app.get("/owned/:address", async (req, res) => {
  const { address } = req.params;
  const queryText = `SELECT * from YTokens where owner = '${address}';`
  const rv = await client.query(queryText);
  console.log(rv.rows);
  // res.send(rv.rows)
})
app.listen(8080);
