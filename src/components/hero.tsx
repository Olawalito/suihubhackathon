import spark from "../assets/spark.png";

export default function Hero() {
  return (
    <>
      <div className="text-white flex flex-col items-center justify-center text-center space-y-10 ">
        <div className="flex rounded-[100px] border-2 md:w-63 px-4 mt-10 py-1.5 border-[#6A6A6A] gap-2">
          <img alt="label-sparkle" src={spark} className="w-5 h-5" />
          <p className="text-[14px]">Sui-native Savings Protocol</p>
        </div>
        <div className="  text-5xl ">
          <h1 className="md:font-normal">
            Save Together without
            <br />
            Trusting{" "}
            <span className="italic font-[Instrument_Serif] font-light leading-22.5 size-18.75 tracking-[-0.04em]">
              Anyone
            </span>
          </h1>
          <p className="text-sm mt-3 leading-5.75 font-normal tracking-[-0.04rem]">
            Trust Circle automates rotational savings using smart contracts on
            Sui <br /> locking funds on-chain and releasing payouts
            automatically
          </p>
        </div>
        <div className=" flex gap-x-10  flex-col sm:flex-row">
          <button
            className="bg-[linear-gradient(181.71deg,#373737_-39.78%,#FF9B7D_-8.23%,#FF3E00_106.05%)] w-40 rounded-[100px] py-2 px-2 shadow-[inset_0px_-2px_2px_0px_rgba(255,255,255,0.5)]
]"
          >
            Start Saving Today
          </button>
          <button className="bg-white text-black shadow-[inset_0px_0px_16px_0px_rgba(255,255,255,0.5)] rounded-[100px] py-2 px-6 invisible sm:visible ">
            {" "}
            Watch Demo
          </button>
        </div>
      </div>
    </>
  );
}
