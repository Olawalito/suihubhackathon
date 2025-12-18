import createicon from '../../assets/create-icon.png'

export default function Addcircle() {
  return (
    <div className="w-full mx-5 overflow-hidden">
      <div className="
        mx-auto
        flex
        items-center
        justify-between
        gap-3
        text-white
        p-6
        bg-[#111111B2]
        rounded-2xl
        flex-wrap
      ">
        <div className="flex gap-2 items-start">
          <img src={createicon} alt="create-icon" className="w-5 h-5 mt-1 shrink-0" />
          <div>
            <h1 className="text-base font-semibold whitespace-nowrap">Create a new circle</h1>
            <p className="text-xs text-white/70 whitespace-nowrap">
              Start a new saving circle with your trusted groups
            </p>
          </div>
        </div>

        <button className="
          shrink-0
          bg-[linear-gradient(180deg,#FC5016_0%,#FF8961_100%)]
          px-4 py-2
          rounded-3xl
          text-sm font-medium
        ">
          Create a circle
        </button>
        </div>
    </div>)}