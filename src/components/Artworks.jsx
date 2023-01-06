import imgBayc from "../assets/imgBayc.png"
import { setGlobalState, useGlobalState } from "../store"

const Artworks = () => {
    const [nfts] = useGlobalState('nfts')

  return (
    <div className="bg-[#0a1420] gradient-bg-artworks">
        <div className="w-4/5 py-8 mx-auto">
            <h4 className="text-white text-3xl font-bold uppercase text-gradient">
            Top Artworks by 24h</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 
            lg:gap-3 py-2.5">
                {nfts.map((nft, i) => (
                    <Card key={i} nft={nft} />
                ))}
            </div>
                    <div className="text-center my-5">
            <button className="text-white shadow-lg shadow-black text-sm
                    bg-[#630e6e] hover:bg-[#bd255f]
                    rounded-full px-1.5 py-2">
                Load More</button>
            </div>
        </div>
    </div>
  )
}

const Card = ({nft}) => {

    const setNft = () => {
        setGlobalState('nft', nft)
        setGlobalState('showModal', 'scale-100')
    }

    return (
        <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden
       gradient-bg-artworks-NFT my-2 p-3">
        <img className="h-60 w-full object-cover shadow-lg shadow-black
        rounded-lg mg-3" 
        src={nft.metadataURI} alt={nft.title}/>
        <h4 className="text-white fond-semibold mt-2">
        {nft.title}</h4>
        <p className="text-gray-300 text-sm my-1">
        {nft.description}
        </p>
        <div className="flex justify-between items-center mt-3 text-white">
            <div className="flex flex-col">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">{nft.cost} ETH</p>
            </div>
            <button className="shadow-lg shadow-black text-sm
                    bg-[#630e6e] hover:bg-[#bd255f]
                    rounded-full px-1.5 py-1 flex flex-col justify-between"
                    onClick={setNft}
                    >
                View Details</button>
        </div>
    </div>
    )
}
    

export default Artworks