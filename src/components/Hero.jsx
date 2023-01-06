import imgFont from "../assets/imgMarketplace.png"
import Identicon from 'react-identicons'
import { setGlobalState, useGlobalState, truncate } from '../store'

const Hero = () => {

    const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center
    mx-auto py-10">
        <div className="md:w-3/6 w-full">
            <div>
                <h1 className="text-white text-5xl font-bold">
                    The Best Ethereum Marketplace <br />
                    <span className="text-gradient">for NFTs</span> Artworks
                </h1>
                <p className="text-gray-500 font-semibold text-sm mt-3">
                    Mint and collect the hottest NFTs around.</p>
            </div>

            <div className="flex mt-3">
                <button
                className='shadow-xl shadow-black text-white 
                bg-[#630e6e] hover:bg-[#bd255f]
                p-4 rounded-full'
                onClick={() => setGlobalState('modal', 'scale-100')}
                >
            Create NFT</button>
            </div>

            <div className="w-2/4 flex justify-between items-center mt-6">
                <div className="text-white">
                    <p className="font-bold">52146</p>
                    <small className="text-gray-300">Users</small>
                </div>
                <div className="text-white">
                    <p className="font-bold">11545</p>
                    <small className="text-gray-300">Artworks</small>
                </div>
                <div className="text-white">
                    <p className="font-bold">5114</p>
                    <small className="text-gray-300">Artist</small>
                </div>
            </div>
         </div>

         <div className="shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0
             rounded-md overflow-hidden bg-gray-800">
            <img className="h-80 w-full object-cover" 
                src={imgFont} alt="Hero" />

            <div className="flex justify-start items-center p-3">
                <Identicon 
                className="h-10 w-10 object-contain rounded-full mr-3"
                string={connectedAccount} 
                size={50} />

                <div>
                    <p className="text-white font-semibold">
                        {truncate(connectedAccount, 4,4,11)}
                    </p>
                    <small className="text-pink-800 font-bold">@you</small>
                </div>
            </div>
            <div>

            </div>
         </div>
     </div>
  )
}

export default Hero