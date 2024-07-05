const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// 1- privateKey: ea6ed16cb55744aaa60f42734bebcbe4863b31619e95e3ff2b610e240875fa10
// 1- publicKey: 04f38db1953621b177b5537d5bd02744193878146e741d9b5ebca6834d431f4d4e7c8ea32009a101a37ff66e185a756f3e1b6823e17da751c4f9af8bc502edef85
// 2- privateKey: 7235b67c56a56424d7fcafebeb39739004ea2f3ce2a681a9a2624bd1a09b98ee
// 2- publicKey: 048a60243c507122cb03635272fa4e782bace7d8fee3fac092bee575737a7055a0beab0d3a9ba6e0c20915aa54fb3b7c071e79f5e52898f1489d39925bcc2d3c28
// 3- privateKey: 2036d6b31a426aae9e1a850b20918ae8fd0bcd45a728a591aa1c9c96d8598890
// 3- publicKey: 046eaf4bc6752671304492f7a8bface9fceda05cf7b2ef135ca0613bddaf4e1345afbf279379cf4e9055c24d1ae7b7bdef4a1ad87fd0035cb4a775c9e2d50f40eb

const balances = {
  "04f38db1953621b177b5537d5bd02744193878146e741d9b5ebca6834d431f4d4e7c8ea32009a101a37ff66e185a756f3e1b6823e17da751c4f9af8bc502edef85": 100,
  "048a60243c507122cb03635272fa4e782bace7d8fee3fac092bee575737a7055a0beab0d3a9ba6e0c20915aa54fb3b7c071e79f5e52898f1489d39925bcc2d3c28": 75,
  "046eaf4bc6752671304492f7a8bface9fceda05cf7b2ef135ca0613bddaf4e1345afbf279379cf4e9055c24d1ae7b7bdef4a1ad87fd0035cb4a775c9e2d50f40eb": 50,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature, recovery } = req.body;

  if (!signature) res.status(404).send({ message: "signature dont was provide" })
  if (!recovery) res.status(404).send({ message: "recovery dont was provide" })
    
  try {
    const bytes = utf8ToBytes(JSON.stringify({ sender, recipient, amount }));
    const hash = keccak256(bytes);

    const sig = new Uint8Array(signature);

    const publicKey = await secp.recoverPublicKey(hash, sig, recovery);

    if(toHex(publicKey) !== sender){
      res.status(400).send({ message: "signature no is valid" });
    }

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }

  } catch (error) {
    console.error(error.message);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
