import { useGlobalState } from "../store"

const Loading = () => {
    const [loadModal] = useGlobalState('loadModal')
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50 
    transform transition-transform duration-300 
    ${loadModal.show ? 'scale-100' : 'scale-0'}`}
    >

        <div className="gradient-bg-addNFT shadow-xl shadow-[#e329da] rounded-xl
        min-w-min px-10 pb-2">

            <div className="flex flex-col text-white">
                <div className="flex justify-center items-center">
                    <div className="lds-dual-ring scale-50" />
                    <p className="text-lg">Proccesing...</p>
                </div>
                <small className="text-center">{loadModal.msg}</small>
            </div>
        </div>
    </div>
  )
}

export default Loading