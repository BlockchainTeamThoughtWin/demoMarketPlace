const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")


let addresses = ["0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", 
"0x976EA74026E726554dB657fA54763abd0C3a0aa9",
                ]

// Hash leaves
let leaves = addresses.map(addr => keccak256(addr))

// Create tree
let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})
const buf2hex = addr=> "0x"+ addr.toString('hex')
console.log("buf2hex",buf2hex(merkleTree.getRoot()))
let rootHash = merkleTree.getRoot().toString('hex')


console.log(merkleTree.toString())
console.log("Root",rootHash)

let address = addresses[1]
let hashedAddress = keccak256(address)
let proof = merkleTree.getProof(hashedAddress).map(x => buf2hex(x.data))
console.log("Proof",proof)

// let v = merkleTree.verify(proof, hashedAddress, rootHash)
// console.log(v) 