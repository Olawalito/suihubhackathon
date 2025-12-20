import starLogo from '../../assets/star-logo.png'
function Payment(){
    return(
        <>
        <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
  
  <div className="flex items-center gap-8 flex-1 min-w-62.5 md:mr-100 sm:mr-50">
    <img src={starLogo} alt="logo" className="w-12 h-12 object-contain" />
    <div className="flex flex-col">
      <h1 className="font-semibold text-lg">Paid 1.0 SUI to Detty Decembizzy</h1>
      <p className="text-xs text-gray-400 truncate">Payment to Circle  </p>
      <p className="text-[10px] text-gray-400 truncate">Transaction hash:</p>
    </div>
  </div>
  <div className="text-xs text-gray-400 text-right min-w-12.5">
    <p>5m ago</p>
  </div>
</div>

        </>
    )
};
function Missed(){
    return(
        <>
        <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
            <div className="flex items-center gap-8 flex-1 min-w-62.5 md:mr-100 sm:mr-50">
    <img src={starLogo} alt="logo" className="w-12 h-12 object-contain" />
    <div className="flex flex-col">
      <h1 className="font-semibold text-lg">Missed Payment for Onwa December.</h1>
      <p className="text-xs text-gray-400 truncate">Missed Deposit,please look into this.</p>
    </div>
  </div>
  <div className="text-xs text-gray-400 text-right min-w-12.5">
    <p>12m ago</p>
  </div>
        </div>
        </>
    )
};
function Payout(){
    return(
        <>

            <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
            <div className="flex items-center gap-8 flex-1 min-w-62.5 md:mr-100 sm:mr-50">
    <img src={starLogo} alt="logo" className="w-12 h-12 object-contain" />
    <div className="flex flex-col">
      <h1 className="font-semibold text-lg">Payout triggered for round 5 in Sui Builders Pool</h1>
      <p className="text-xs text-gray-400 truncate">Payout sent to Balance-Sui
     </p>
     <p  className="text-[10px] text-gray-400 truncate">Transaction hash:</p>
    </div>
  </div>
  <div className="text-xs text-gray-400 text-right min-w-12.5">
    <p>12m ago</p>
  </div>
        </div>
        </>
    )
};

export default function ActivityCards() {
    return (
        (
            <div className=' flex flex-col'>
            <Payment/>
            <Missed/>
            <Payout/>
            </div>
        )
    )
}