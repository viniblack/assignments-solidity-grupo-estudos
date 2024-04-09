const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// as possíveis cores que o hash poderia representar
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// dado um hash, retorna a cor que criou o hash
function findColor(hash) {
  return COLORS.find(color => toHex(sha256(utf8ToBytes(color))) === hash);
}

const red = "red"
console.log("string: " )
console.log(red)
console.log("utf8ToBytes:")
console.log(utf8ToBytes(red))
console.log("utf8ToBytes + sha256:")
console.log(sha256(utf8ToBytes(red)))
console.log("toHex")
console.log(toHex(sha256(utf8ToBytes(red))))
console.log("findColor")
console.log(findColor(toHex(sha256(utf8ToBytes(red)))))


module.exports = findColor;