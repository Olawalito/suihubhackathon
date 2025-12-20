import bgGradient from '../assets/bg-gradient.png'
import logo from '../assets/logo.png'
import { useLocation } from 'react-router-dom';
import Activitycards from '../components/Activity/Activitycards';

export default function Circleactivity (){
    const location = useLocation();
    const { circle } = location.state || {};

    return(
        <>
        <div>
            <div style={{ backgroundImage: `url(${bgGradient})` }} className='min-h-screen flex flex-col'>
                <img src={logo} alt="logo" className='h-10 w-40 my-7 mx-7' />
                <h1 className='text-white my-6 mx-12 md:text-3xl sm:text-2xl'>
                    Circle Activity
                </h1>
            <div className='mw-full bg-gradient-to-br from-[#1b1b1b] via-[#0f0f0f] to-[#1a0b05] border border-white/10 p-6 rounded-4xl shadow-xs text-white md:mx-32 '>
                <h1 className='my-8'>Total number of rounds: <span className="text-orange-500 font-bold">{circle?.total_rounds || 'N/A'}</span></h1>
                <h2 className='my-8'>Current round: <span className="text-orange-500 font-bold">{circle?.current_round || 'N/A'}</span></h2>

                <h1 className=' text-2xl font-semibold'>
                    Members ({circle?.addresses?.length || 0}):
                </h1>
                {circle?.addresses?.map((member: any, idx: number) => (
                    <div key={idx} className="border-b border-white/10 pb-4 mb-4">
                        <p className='my-4'>Name: <span className="text-gray-300">{member.name}</span></p>
                        <p className='my-4 break-all'>Address: <span className="text-gray-300 font-mono text-sm">{member.address}</span></p>
                    </div>
                ))}

                <h1 className='text-2xl font-semibold mt-12 mb-6'>Recent Activities</h1>
                <Activitycards />
            </div>
            </div>
        </div>
        </>
    )
}