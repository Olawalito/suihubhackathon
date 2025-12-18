import DashboardHeader from '../components/dashboard/DashboardHeader'
import Addcircle from '../components/Mycircle/addCircle'
import Footer from '../components/footer';

function Mycircle() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex justify-center mt-10 flex-1">
      <Addcircle />
      </div>
      <Footer />
    </div>
  );

}

export default Mycircle;