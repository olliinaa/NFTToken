// https://alchemy.com/blog/how-to-mint-an-nft-using-web3-js Tutorial
// // require('dotenv').config();
// const API_URL = env.NEXT_PUBLIC_ALCHEMY_RPC_URL;
// const PRIVATE_KEY = env.METAMASK_PRIVATE_KEY;
// const PUBLIC_KEY = env.METAMASK_PUBLIC_KEY;

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(API_URL);

// const contract = require("../NFTToken.json");
// const contractAddress = env.SMART_CONTRACT_ADDRESS;
// const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// export async function mintNFT(mintAmount) {
//   const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

//   //the transaction
//   const tx = {
//     'from': PUBLIC_KEY,
//     'to': contractAddress,
//     'nonce': nonce,
//     'gas': 500000,
//     'maxPriorityFeePerGas': 2999999987,
//     'value': parseInt(web3.utils.toWei((0.08 * token).toString(),"ether")).toString(16),
//     'data': nftContract.methods.mintToken(mintAmount).encodeABI()
//   };

//   const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
//   const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
//   console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
// }
