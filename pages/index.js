require('dotenv').config()
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { connectWallet, getCurrentWalletConnected } from "../utils/connect.js";
import { mintNFT } from '../utils/mint-nft.js'

const PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY
const PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URI);

import contract from '../ABI/NFTToken.json'
const contractAddress = process.env.SMART_CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


export default function Home() {

  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  // Increment and Decrement states
  const [mintAmount, setMintAmount] = useState(1);
  const [maxPerTransaction, setMaxPerTransaction] = useState(0);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
    setStatus(walletResponse.status);
  };

  //called only once
  useEffect(()=> {
    const prepare = async () => {
      // const { address, status } = await getCurrentWalletConnected()
      const walletResponse = await getCurrentWalletConnected()
      setWalletAddress(walletResponse.address)
      setStatus(walletResponse.status)
    
      addWalletListener()
    }
    prepare()
  }, [])

  const addWalletListener = () => {
    if(window.ethereum){
        window.ethereum.on("accountChanged", async (accounts) => {
            if(accounts.length > 0){
                setWalletAddress(accounts[0])
                setStatus('Connected! Now you can mint. ')
            }else{
                setWalletAddress('')
                setStatus('🦊 Connect to metamask')
            }
        })
    }
  }

  const handleIncrement = () => {
    if (mintAmount < 3) {
      setMintAmount(mintAmount + 1);
    }
  };

  const handleDecrement = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  // Mint NFT using alchemy web3
  const mintToken = async (token) => { 
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    
    //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'maxPriorityFeePerGas': 2999999987,
      // 'value': parseInt(web3.utils.toWei("80000000000000000", "ether") * token).toString(16),
      // 'value': parseInt(web3.utils.toWei((0.08 * token).toString(),"ether")).toString(16),
      'data': nftContract.methods.mintToken(token).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
  }

  return (
    <div className='w-full items-center justify-center h-screen bg-gray-200 p-10'>
      <div className='flex flex-col items-center pt-32 min-h-screen'>
			  <div className='trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out'>
			  </div>
        <h2 className='text-3xl font-bold mb-20'>
          NFT 1155 TOKEN 
        </h2>
			  {walletAddress === '' ? (
          <button
            className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
            onClick={connectWalletPressed}
          >
            Connect Wallet
          </button>
				) : ( 
          <div className='flex flex-col'>
            <div className='flex items-center justify-evenly space-x-7 pb-6 '>
              <button className='font-bold text-4xl px-3 rounded-lg hover:scale-105 transition duration-500 ease-in-out bg-slate-500'
              onClick={handleDecrement}
              >-</button>
              <p className='text-3xl font-bold'>{mintAmount}</p>
              <button className='font-bold text-4xl px-3 rounded-lg hover:scale-105 transition duration-500 ease-in-out bg-slate-500'
                onClick={handleIncrement}
              >+</button>
            </div>
            <button 
              className='text-2xl font-bold py-3 px-12 bg-orange-400 rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
              // onClick={()=> mintNFT(mintAmount)}
              onClick={()=> mintToken(mintAmount)}
            >
              MINT TOKEN
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
