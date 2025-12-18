import Information from "./info-component"
import infoicon1 from '../assets/info-icon1.png'
import infoicon2 from '../assets/info-icon2.png'
import infoicon3 from '../assets/info-icon3.png'
import infoicon4 from '../assets/info-icon4.png'


export default function Explanation() {
    return(
        <div className="text-white text-center mt-12 px-4">
            <h1 className="text-3xl font-semibold">How it works</h1>
                     <div className="mt-6">
                        <div className="first-set grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-items-center">
                            <Information step="01" img={infoicon1} heading="Create a Circle" info="Define contribution amount, members, and payout order."/>
                            <Information step="02" img={infoicon2} heading="Contribute On-Chain" info="Each member sends an exact contribution from their wallet." />
                            <Information step="03" img={infoicon3} heading="Funds Locked in Escrow" info="Smart contract holds pooled funds securely." />
                        </div>
                        <div className="mt-6 flex justify-center">
                            <Information step="04" img={infoicon4} heading="Automatic Payouts" info="Once all contribute, payout is released automatically." large />
                        </div>
                     </div>
        </div>
    )
}