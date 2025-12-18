import DashboardHeader from "./DashboardHeader";

import bgGradient from '../../assets/bg-gradient.png';


export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat gap-y-4"
      style={{ backgroundImage: `url(${bgGradient})` }}
    >
      <DashboardHeader />
      <div className="dashboard-body">

      </div>
      
    </div>
  );
}