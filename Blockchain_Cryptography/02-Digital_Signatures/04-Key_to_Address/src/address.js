const hashMessage = require("../../03-Recover_Key/src/hashMessage");
const signMessage = require('../../03-Recover_Key/src//signMessage');

const { toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

async function address(message, signature, recoveryBit) {
  const publicKey = await secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);

  const hashKey = keccak256(publicKey.slice(1, publicKey.length))
  console.log('hashKey');
  console.log(hashKey);
  const key = hashKey.slice(-20);
  console.log('key');
  console.log(key);

  console.log('toHex key');
  console.log(`${toHex(key)}`);
}

async function test() {
  const [sig, recoveryBit] = await signMessage('hello world');

  address('hello world', sig, recoveryBit)  
}

test()

module.exports = address;