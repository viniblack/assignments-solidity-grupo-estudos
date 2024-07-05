const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

const priveteKey = secp.utils.randomPrivateKey();

console.log(`privateKey: ${toHex(priveteKey)}`);

const publicKey = secp.getPublicKey(priveteKey)

console.log(`publicKey: ${toHex(publicKey)}`);

const hashKey = keccak256(publicKey.slice(1, publicKey.length))
const key = hashKey.slice(-20)

console.log(`address: 0x${toHex(key)}`);
