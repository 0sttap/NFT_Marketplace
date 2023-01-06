import { useState } from 'react'
import createNFT from '../assets/createNFT.png'
import {FaTimes} from 'react-icons/fa'
import { setAlert, setGlobalState, setLoadModalMsg, useGlobalState } from '../store'
import { updateNFT } from '../Blockchain.services'
const UpdateNFT = () => {
    const [modal] = useGlobalState('updateModal')
    const [nft] = useGlobalState('nft')
    const [price, setPrice] = useState(nft?.cost)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!price || price <= 0) return

        setGlobalState('modal', 'scale-0')
        setLoadModalMsg('Initialazing price update...')

        try {
            setLoadModalMsg('Price updating...')
            setGlobalState('updateModal', 'scale-0')

            await updateNFT({ id: nft.id, cost: price })
            setAlert('Price update!')
            window.location.reload()
        } catch (error) {
            console.log('Error updating price: ', error)
            setAlert('Update failed', 'red')
        }
    }

    const closeModal = () => {
        setGlobalState('updateModal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setPrice('')
    }
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50 
    transform transition-transform duration-300 ${modal}`}>

        <div className="gradient-bg-addNFT shadow-xl shadow-[#e329da] rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6">

            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex justify-between items-center text-gray-300">
                    <p className="font-semibold">Candy NFT</p>
                    <button
                    type="button"
                    onClick={closeModal}
                    className="border-0 bg-transparent focus:outline-none">
                        <FaTimes />
                    </button>
                </div>

                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 h-20 w-20 rounded-xl overflow-hidden '>
                        <img className='h-full w-full object-cover cursor-pointer' 
                        src={nft?.metadataURI} alt='NFT'>    
                        </img>
                    </div>
                </div>

                <div className='flex justify-between items-center bg-gray-700 rounded-xl mt-5'>
                        <input type="number" 
                        className='block w-full text-sm text-slate-300
                        focus:outline-none focus:ring-0
                        bg-transparent border-0 placeholder:text-slate-400'
                        placeholder='Price (ETH)'
                        min={0.01}
                        step={0.01}
                        name='price'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required/> 
                </div>


                <button className="text-white shadow-lg shadow-black text-sm
                    bg-[#761883] hover:bg-[#bd255f]
                    rounded-full px-1.5 py-2 mt-4">
                Update Price</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateNFT