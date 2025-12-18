import DashboardHeader from "./DashboardHeader";

import bgGradient from "../../assets/bg-gradient.png";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
  const dashboardData = [
    {
      title: "Active Circles",
      count: 4,
      unit: "Circles",

      subtitle: "Next contribution in 20 hours",

      iconType: "active",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat gap-y-4"
      style={{ backgroundImage: `url(${bgGradient})` }}
    >
      <DashboardHeader />
      <div className="dashboard-body">
        <DashboardCard />
      </div>
    </div>
  );
}
