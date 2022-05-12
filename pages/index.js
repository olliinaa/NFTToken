import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full items-center justify-center h-screen bg-gray-200 p-10'>
      <div className='flex flex-col items-center pt-32 min-h-screen'>
			  <div className='trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out'>
			  </div>
        <h2 className='text-3xl font-bold mb-20'>
          NFT 1155 TOKEN 
        </h2>
			  {/* {currentAccount === '' ? ( */}
				<button
				className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
				// onClick={connectWallet}
				>
				Connect Wallet
				</button>
				{/* ) : ( */}
          <div className='flex flex-col'>
            <div className='flex items-center justify-evenly space-x-7 pb-6 '>
              <button className='font-bold text-4xl px-3 rounded-lg hover:scale-105 transition duration-500 ease-in-out bg-slate-500'>-</button>
              <p className='text-3xl font-bold'>1</p>
              <button className='font-bold text-4xl px-3 rounded-lg hover:scale-105 transition duration-500 ease-in-out bg-slate-500'>+</button>
            </div>
            <button className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'>
              MINT TOKEN
            </button>
          </div>
        {/* )} */}
      </div>
    </div>
  )
}
