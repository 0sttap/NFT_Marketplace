import React from 'react'
import patsoplaceLogo from "../assets/placeLogo.png"
import { connectWallet } from '../Blockchain.services'
import { useGlobalState, truncate } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <div className='w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto'>
        <div className='md: flex-[1.5] justify-center items-center'>
            <img className='w-48' src={patsoplaceLogo} alt="Logo" />
        </div>
        <ul className='md:flex-[0.7] text-white md:flex
        hidden list-none justify-between items-center flex-initial'>
          <li className='mx-4 cursor-pointer'>Market</li>
          <li className='mx-4 cursor-pointer'>Artist</li>
          <li className='mx-4 cursor-pointer'>Features</li>
          <li className='mx-4 cursor-pointer'>Community</li>
        </ul>

        {connectedAccount ? (
          <button className='mx-6 shadow-xl shadow-black text-white bg-[#630e6e] hover:bg-[#bd255f]
          md:text-sm p-3 rounded-full'
          >
            {truncate(connectedAccount, 4,4,11)}
          </button>
        ) : (
          <button className='mx-6 shadow-xl shadow-black text-white bg-[#630e6e] hover:bg-[#bd255f]
          md:text-sm p-3 rounded-full'
          onClick={connectWallet}
          >
            Connect Wallet
          </button>

        )}
    </div>
  )
}

export default Header