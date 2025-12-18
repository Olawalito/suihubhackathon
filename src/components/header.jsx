import logo from '../assets/logo.png'

export default function Header() {
    return(
    <>
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-8 px-4 md:px-8 py-4 md:py-6 w-full">
        <img src={logo} alt="trust-circle logo" className="w-20 md:w-36 h-uto max-h-10 md:max-h-14 object-contain shrink-0" />
        <nav className="flex bg-[#FFFFFF2B] backdrop-blur-2xl w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 text-white gap-3 md:gap-8 rounded-[90px] justify-center items-center shrink-0">
            <a href="#home" className="text-xs sm:text-sm md:text-base whitespace-nowrap">Home</a>
            <a href="#About" className="text-xs sm:text-sm md:text-base whitespace-nowrap">About</a>
            <a href="#Security" className="text-xs sm:text-sm md:text-base whitespace-nowrap">Security</a>
            <a href="#Docs" className="text-xs sm:text-sm md:text-base whitespace-nowrap">Docs</a>
        </nav>
        <button className="text-white text-xs sm:text-sm rounded-[90px] py-2 md:py-3 px-3 md:px-6 bg-[linear-gradient(181.71deg,#373737_-39.78%,#FF9B7D_-8.23%,#FF3E00_106.05%)] whitespace-nowrap shrink-0 hover:opacity-90 transition">Connect Wallet</button>
    </div>
    </>
    )
}
