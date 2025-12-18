import cat from '../assets/cat-emoji.png';

export default function Footer() {
    return(
        <>
        <div className="bg-black shadow-[0_-8px_30px_rgba(255,140,0,0.6)] mt-16 py-6 px-4 md:px-8 text-white flex items-center justify-center gap-2">
            <img src={cat} alt="cat emoji" className="w-4 h-4" />
            <p className="text-sm">Built with rage and anger on SUI</p>
        </div>

        </>
    )
}