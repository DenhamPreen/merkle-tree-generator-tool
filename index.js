const { ethers } = require("ethers");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const greenlist = require("./greenlist.js");

let hashAddress = (account) => {
  return Buffer.from(
    ethers.utils.solidityKeccak256(["address"], [account]).slice(2),
    "hex"
  );
};

console.log(greenlist);

let merkleTree = new MerkleTree(
  greenlist.map((address) => hashAddress(address)),
  keccak256,
  { sortPairs: true }
);

let merkleTreeHash = merkleTree.getHexRoot();

console.log("Merkle Tree Hash: ", merkleTreeHash);

console.log("\n");

console.log(merkleTree.toString());

greenlist.forEach((address) => {
  console.log("address: ", address);
  let addressHash = hashAddress(address);
  let proof = merkleTree.getHexProof(addressHash);
  console.log("Address proof: ", proof);
  console.log("\n");
});
