import logo from '../assets/logo.png'

export default function Header() {
    return(
    <>
    <div class="flex space-between flex-row justify-between items-center gap-4 md:gap-12 px-4 md:px-8 py-4 md:py-4">
        <img src={logo} alt="trust-circle logo" class="w-24 md:w-36 h-8" />
        <nav class="flex bg-[#FFFFFF2B] backdrop-blur-2xl w-full md:w-auto px-4 md:px-6 py-2 md:py-3 text-white gap-6 md:gap-12 rounded-[90px] justify-center items-center">
            <a href="#home" class="">Home</a>
            <a href="#About">About </a>
            <a href="#Security">Security</a>
            <a href="#Docs">Docs</a>
        </nav>
        <button class="text-white rounded-[90px] py-[11.81px] px-[18.89px] bg-[linear-gradient(181.71deg,#373737_-39.78%,#FF9B7D_-8.23%,#FF3E00_106.05%)]">Connect Wallet</button>
    </div>
    </>
    )
}
