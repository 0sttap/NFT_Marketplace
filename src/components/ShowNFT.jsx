import Identicon from 'react-identicons'
import { useState } from 'react'
import createNFT from '../assets/createNFT.png'
import {FaTimes} from 'react-icons/fa'
import { setGlobalState, useGlobalState, truncate, setAlert } from '../store'
import { buyNFT } from '../Blockchain.services'
const ShowNFT = () => {
    const [modal] = useGlobalState('showModal')
    const [nft] = useGlobalState('nft')
    const [connectedAccount] = useGlobalState('connectedAccount')

const onChangePrice = () => {
    setGlobalState('nft', nft)
    setGlobalState('updateModal', 'scale-100')
}

const handleNFTPurchase = async () => {
    setGlobalState('showModal', 'scale-0')
    setGlobalState('loadModal', {
      show: true,
      msg: 'Initializing NFT transfer...',
    })

    try {
      await buyNFT(nft)
      setAlert('Transfer completed...', 'green')
      window.location.reload()
    } catch (error) {
      console.log('Error transfering NFT: ', error)
      setAlert('Purchase failed...', 'red')
    }
  }

   
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50 
    transform transition-transform duration-300 ${modal}`}>

        <div className="gradient-bg-addNFT shadow-xl shadow-[#e329da] rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6">

            <div className="flex flex-col">
                <div className="flex justify-between items-center text-gray-300">
                    <p className="font-semibold">Buy NFT</p>
                    <button
                    type="button"
                    onClick={() => setGlobalState('showModal', 'scale-0')}
                    className="border-0 bg-transparent focus:outline-none">
                        <FaTimes />
                    </button>
                </div>

                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 h-40 w-40 rounded-xl overflow-hidden '>
                        <img className='h-full w-full object-cover cursor-pointer' 
                        src={nft?.metadataURI} alt={nft?.title}>    
                        </img>
                    </div>
                </div>

                <div className='flex flex-col justify-start rounded-xl mt-5'>
                    <h4 className='text-white font-semibold'>{nft?.title}</h4>
                    <p className='text-gray-400 text-xs my-1'>
                    {nft?.description}
                    </p>

                    <div className='flex justify-between items-center mt-3 text-white'>
                        <div className='flex justify-start items-center'>
                            <Identicon 
                            className="h-10 w-10 object-contain rounded-full mr-3"
                            string={nft?.owner} 
                            size={50} />
                            <div className='flex flex-col justify-center items-start'>
                                <small className='font-semibold'>@owner</small>
                                <small className='text-pink-700 font-semibold'>
                                {nft?.owner ? truncate(nft.owner, 4, 4, 11) : '...'}
                                </small>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <small className='text-xs'>Current Price</small>
                            <p className='text-sm font font-semibold'>{nft?.cost} ETH</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center space-x-2'>
                {connectedAccount == nft?.owner ? (
                <button className="text-white shadow-lg shadow-black text-sm
                    bg-[#761883] hover:bg-[#bd255f]
                    rounded-full px-1.5 py-2 mt-4 w-full"
                    onClick={onChangePrice}>
                    Change Price
                </button>
                ) : (
                <button className="text-white shadow-lg shadow-black text-sm
                    bg-[#761883] hover:bg-[#bd255f]
                    rounded-full px-1.5 py-2 mt-4 w-full"
                    onClick={handleNFTPurchase}>
                    Purchase Now
                </button>
                )}
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ShowNFT