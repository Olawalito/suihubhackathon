import { useEffect, useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Footer from "../components/footer";
import bgGradient from "../assets/bg-gradient.png";
import starLogo from "../assets/star-logo.png";

/* ---------------- HELPERS ---------------- */
function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/* ---------------- ACTIVITY CARDS ---------------- */
function PaymentCard({ activity }) {
  return (
    <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
      <div className="flex items-center gap-6 flex-1">
        <img src={starLogo} alt="logo" className="w-12 h-12" />
        <div>
          <h1 className="font-semibold text-lg">
            You paid {activity.amount} SUI to {activity.circle_name}
          </h1>
          <p className="text-xs text-gray-400">
            Round {activity.round}
          </p>
          {activity.tx_hash && (
            <p className="text-[10px] text-gray-400 truncate">
              Tx: {activity.tx_hash}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400">
        {timeAgo(activity.created_at)}
      </p>
    </div>
  );
}

function PayoutCard({ activity }) {
  return (
    <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
      <div className="flex items-center gap-6 flex-1">
        <img src={starLogo} alt="logo" className="w-12 h-12" />
        <div>
          <h1 className="font-semibold text-lg">
            You received {activity.amount} SUI
          </h1>
          <p className="text-xs text-gray-400">
            From {activity.circle_name} • Round {activity.round}
          </p>
          {activity.tx_hash && (
            <p className="text-[10px] text-gray-400 truncate">
              Tx: {activity.tx_hash}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400">
        {timeAgo(activity.created_at)}
      </p>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function ActivityPage() {
  const account = useCurrentAccount();
  const wallet = account?.address;

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet) return;

    setLoading(true);

    fetch(
      `https://trust-circle-backend.onrender.com/api/users/activity/${wallet}`
    )
      .then(res => res.json())
      .then(data => {
        setActivities(data.activity || []);
      })
      .catch(err => {
        console.error("Activity fetch error:", err);
        setActivities([]);
      })
      .finally(() => setLoading(false));
  }, [wallet]);

  return (
    <div
      style={{ backgroundImage: `url(${bgGradient})` }}
      className="min-h-screen flex flex-col"
    >
      <DashboardHeader />

      <h1 className="text-white text-2xl md:text-3xl ml-6 md:ml-36 mt-8">
        Activity
      </h1>

      <div className="flex-1 flex flex-col items-center mt-8 px-4">
        {loading && (
          <p className="text-gray-400">Loading activity...</p>
        )}

        {!loading && activities.length === 0 && (
          <p className="text-gray-400">No activity yet.</p>
        )}

        {!loading &&
          activities.map(activity => {
            const key = activity.id || `${activity.type}-${activity.created_at}`;

            if (activity.type === "contribution") {
              return <PaymentCard key={key} activity={activity} />;
            }

            if (activity.type === "payout") {
              return <PayoutCard key={key} activity={activity} />;
            }

            return null;
          })}
      </div>

      <Footer />
    </div>
  );
}
