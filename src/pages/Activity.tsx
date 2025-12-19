import DashboardHeader from '../components/dashboard/DashboardHeader'
import Footer from '../components/footer';
import bgGradient from '../assets/bg-gradient.png'

function Activity() {
  return (
    <div style={{ backgroundImage: `url(${bgGradient})` }} className='min-h-screen flex flex-col'>
      <DashboardHeader />
      <div className="flex justify-center mt-10 flex-1">
      
      </div>
      <Footer />
    </div>
  );

}

export default Activity;