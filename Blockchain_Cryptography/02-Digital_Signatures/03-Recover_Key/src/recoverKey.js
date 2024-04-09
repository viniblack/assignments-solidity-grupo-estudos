const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");
const signMessage = require('./signMessage');
const { toHex } = require("ethereum-cryptography/utils");

async function recoverKey(message, signature, recoveryBit) {
  const publicKey = await secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
  console.log("publicKey");
  console.log(publicKey);

  let recovered = toHex(publicKey)
  console.log('hex recovered');
  console.log(recovered);

  const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
  const chavePublica = secp.getPublicKey(PRIVATE_KEY);

  let hexChavePublica = toHex(chavePublica)
  console.log('hexChavePublica');
  console.log(hexChavePublica);

  return publicKey;
}

async function test() {
  const [sig, recoveryBit] = await signMessage('hello world');

  recoverKey('hello world', sig, recoveryBit)  
}

test()

module.exports = recoverKey;