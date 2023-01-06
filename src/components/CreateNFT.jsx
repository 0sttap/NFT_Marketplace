import { useState } from 'react'
import createNFT from '../assets/createNFT.png'
import {FaTimes} from 'react-icons/fa'
import { setAlert, setGlobalState, setLoadModalMsg, useGlobalState } from '../store'
import { create } from 'ipfs-http-client'
import { mintNFT } from '../Blockchain.services'

const auth = 'Basic ' + Buffer.from(
    '2JvM9Kp8Vfa1KZjJsaucu5aUciU' + ':' + 'e60882127f8f6879cc5fb7dd3a526af4'
).toString('base64')

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
})

const CreateNFT = () => {
    const [modal] = useGlobalState('modal')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [imgBase64, setImgBase64] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (!title || !price || !description) return
    
        setGlobalState('modal', 'scale-0')
        setGlobalState('loadModal', { show: true, msg: 'Uploading IPFS data...' })
    
        try {
          const created = await client.add(fileUrl)
          const metadataURI = `https://ipfs.io/ipfs/${created.path}`
          const nft = { title, price, description, metadataURI }
    
          setLoadModalMsg('Intializing transaction...')
          setFileUrl(metadataURI)
          await mintNFT(nft)
    
          resetForm()
          setAlert('Minting completed...', 'green')
          window.location.reload()
        } catch (error) {
          console.log('Error uploading file: ', error)
          setAlert('Minting failed...', 'red')
        }
      }

    const changeImage = async (e) => {
        const reader = new FileReader()
        if(e.target.files[0]) reader.readAsDataURL(e.target.files[0])

        reader.onload = (readerEvent) => {
            const file = readerEvent.target.result
            setImgBase64(file)
            setFileUrl(e.target.files[0])
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setFileUrl('')
        setImgBase64(null)
        setTitle('')
        setDescription('')
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
                    <p className="font-semibold">Add NFT</p>
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
                        src={imgBase64 || createNFT} alt='NFT'>    
                        </img>
                    </div>
                </div>

                <div className='flex justify-between items-center bg-gray-700 rounded-xl mt-5'>
                    <label className='block'>
                        <span className='sr-only'>Choose Profile Photo</span>
                        <input type="file" 
                        accept='image/png, image/jpeg, image/jpg image/gif, image/webp'
                        className='block w-full text-sm text-slate-400 file:mr-4 file:py-2
                        file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                        focus:outline-none cursor-pointer focus:ring-0'
                        onChange={changeImage}
                        required/>
                    </label>
                </div>

                <div className='flex justify-between items-center bg-gray-700 rounded-xl mt-5'>
                        <input type="text" 
                        className='block w-full text-sm text-slate-300
                        focus:outline-none focus:ring-0
                        bg-transparent border-0 placeholder:text-slate-400'
                        placeholder='Title'
                        name='title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required/> 
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

                <div className='flex justify-between items-center bg-gray-700 rounded-xl mt-5'>
                        <textarea type="text" 
                        className='block w-full text-sm text-slate-300
                        focus:outline-none focus:ring-0
                        bg-transparent border-0 placeholder:text-slate-400 h-20 resize-none'
                        placeholder='Description'
                        name='description'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        /> 
                </div>

                <button 
                className="text-white shadow-lg shadow-black text-sm
                    bg-[#761883] hover:bg-[#bd255f]
                    rounded-full px-1.5 py-2 mt-4">
                Mint Now</button>
            </form>
        </div>
    </div>
  )
}

export default CreateNFT