import DashboardHeader from '../components/dashboard/DashboardHeader'
import Footer from '../components/footer';
import bgGradient from '../assets/bg-gradient.png'
import Activitycards from '../components/Activity/activitycards';

function Activity() {
  return (
    <div style={{ backgroundImage: `url(${bgGradient})` }} className='min-h-screen flex flex-col'>
      <DashboardHeader />
      <h1 className='text-white text-2xl md:text-3xl ml-5 md:ml-36 mb-1 mt-7'>Activity</h1>
      <div className="flex justify-center mt-10 flex-1">
      <Activitycards />
      </div>
      <Footer />
    </div>
  );

}

export default Activity;