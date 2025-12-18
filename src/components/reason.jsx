import icon from '../assets/icon.png'

export default function Reason() {
    return(
        <div className="mt-2 text-center">
        <h1 className="text-white text-xl md:text-3xl">Why Trust Circle?</h1>

        <div className="justify-center items-center text-center text-sm py-3">
            <div className="text-white bg-transparent border-2 border-[#FFFFFF33] grid grid-cols-2 items-center mt-10 mx-6 md:mx-60 rounded-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-center gap-2 p-4 border-r border-gray-500/20 bg-transparent">
                    <img src={icon} className="w-4 h-4" />
                    <span>Decentralized Savings</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-4">
                    <img src={icon} className="w-4 h-4" />
                    <span>Automated Smart Contracts</span>
                </div>
            </div>
        </div>
        <div className="justify-center items-center text-center text-sm py-3">
            <div className="text-white border-2 border-[#FFFFFF33] grid grid-cols-2 items-center mt-1 mx-6 md:mx-60 rounded-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-center gap-2 p-4 border-r border-gray-500/20">
                    One Person holds money
                </div>
                <div className="flex items-center justify-center gap-2 p-4">
                    Smart contract holds funds
                </div>
            </div>
        </div>
        <div className="justify-center items-center text-center text-sm py-3">
            <div className="text-white border-2 border-[#FFFFFF33] grid grid-cols-2 items-center mt-1 mx-6 md:mx-60 rounded-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-center gap-2 p-4 border-r border-gray-500/20">
                    Trust-based
                </div>
                <div className="flex items-center justify-center gap-2 p-4">
                    Code-enforced
                </div>
            </div>
        </div>
        <div className="justify-center items-center text-center text-sm py-3">
            <div className="text-white border-2 border-[#FFFFFF33] grid grid-cols-2 items-center mt-1 mx-6 md:mx-60 rounded-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-center gap-2 p-4 border-r border-gray-500/20">
                    Disputes
                </div>
                <div className="flex items-center justify-center gap-2 p-4">
                    Deterministic Outcomes
                </div>
            </div>
        </div>
        </div>
    )
}