const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  console.log("bytes");
  console.log(bytes);
  const hash = keccak256(bytes);
  console.log("hash");
  console.log(hash);

  return hash
}

hashMessage('hello world')

module.exports = hashMessage;