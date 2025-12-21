import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardCard from "./DashboardCard";
import {
  useSuiClient,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../../../constant";

/* =======================
   TYPES
======================= */

type IconType = "active" | "time" | "give";

interface Circle {
  circle_id: string;
  name: string;
  current_round: number;
  total_rounds: number;
  contribution_amount: number;
  sui_object_id: string;
  has_paid: boolean;
}

interface DashboardResponse {
  circles: Circle[];
  next_payout: {
    total_next_payout: number;
    payout_amount: number;
    name: string;
  };
  next_contribution: {
    total: number;
  };
}

/* =======================
   INITIAL SAFE STATE
======================= */

const initialDashboard: DashboardResponse = {
  circles: [],
  next_payout: {
    total_next_payout: 0,
    payout_amount: 0,
    name: "",
  },
  next_contribution: {
    total: 0,
  },
};

/* =======================
   COMPONENT
======================= */

export default function Dashboard() {
  const account = useCurrentAccount();
  const walletAddress = account?.address ?? "";
  const client = useSuiClient();

  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction({
      execute: async ({ bytes, signature }) =>
        client.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            showRawEffects: true,
            showObjectChanges: true,
          },
        }),
    });

  const [dashboard, setDashboard] =
    useState<DashboardResponse>(initialDashboard);
  const [loading, setLoading] = useState(false);

  /* =======================
     FETCH DASHBOARD
  ======================= */

  const fetchDashboard = async () => {
    if (!walletAddress) return initialDashboard;

    const res = await fetch(
      `https://trust-circle-backend.onrender.com/api/dashboard/address/${walletAddress}`
    );
    if (!res.ok) throw new Error("Failed to fetch dashboard");
    return res.json();
  };

  const refetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await fetchDashboard();
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      setDashboard(initialDashboard);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!walletAddress) {
      setDashboard(initialDashboard);
      return;
    }
    refetchDashboard();
  }, [walletAddress]);

  /* =======================
     HELPERS
  ======================= */

  const mistToSui = (mist: number | string | undefined | null): string => {
    const n = Number(mist ?? 0);
    if (!isFinite(n)) return "0";
    return (n / 1_000_000_000).toFixed(6).replace(/\.?0+$/, "");
  };

  /* =======================
     PAY CONTRIBUTION
  ======================= */

  async function executePayContribution(
    contributionAmount: number,
    circleObjectId: string,
    currentRound: number
  ) {
    const txb = new Transaction();

    const [coin] = txb.splitCoins(txb.gas, [
      txb.pure.u64(contributionAmount),
    ]);

    txb.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::pay_contribution`,
      arguments: [txb.object(circleObjectId), coin],
    });

    const txResult = await signAndExecuteTransaction({ transaction: txb });

    await client.waitForTransaction({ digest: txResult.digest });

    const eventsResult = await client.queryEvents({
      query: { Transaction: txResult.digest },
    });
  console.log(eventsResult);
    if (eventsResult.data.length > 0) {
      const firstEvent = eventsResult.data[0]?.parsedJson;
      const result = firstEvent || "No events found for the given criteria.";
      console.log(result);
      const circleObject = await client.getObject({
        id: result?.circle_id,
        options: { showContent: true },
      });
      const fields = circleObject;
      console.log("Circle Object Fields:", fields);
let payoutexecuted  = eventsResult.data.length == 2 ? true : false;
      await fetch("https://trust-circle-backend.onrender.com/api/contributions/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sui_object_id:circleObjectid,
          user_address: wallet?.address,
          tx_digest: txResult.digest,
          round_number: currentRound,
          payout_executed: payoutexecuted, 
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Contribution synced:", data);
        });
    } else {
      console.log("No events found for the given criteria.");
    }
    // ✅ REFRESH DASHBOARD AFTER TX
    await refetchDashboard();
  }

  /* =======================
     LOADING STATE
  ======================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  /* =======================
     DASHBOARD CARDS
  ======================= */

  const dashboardCards = [
    {
      title: "Active Circles",
      count: dashboard.circles.length,
      unit: "Circles",
      subtitle: "Currently active",
      iconType: "active" as IconType,
    },
    {
      title: "Next Payout",
      count: mistToSui(dashboard.next_payout.payout_amount),
      unit: "SUI",
      subtitle: dashboard.next_payout.name
        ? `from ${dashboard.next_payout.name}`
        : "No upcoming payout",
      iconType: "give" as IconType,
    },
    {
      title: "Next Contribution Due",
      count: mistToSui(dashboard.next_contribution.total),
      unit: "SUI",
      subtitle: "Current round",
      iconType: "time" as IconType,
    },
  ];

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center">
      <DashboardHeader />

      <div className="w-[90%] pt-8 pb-16">
        {/* SUMMARY CARDS */}
        <div className="flex flex-col sm:flex-row gap-8 mb-12">
          {dashboardCards.map((card, i) => (
            <DashboardCard key={i} {...card} />
          ))}
        </div>

        {/* CIRCLES */}
        <h2 className="text-white text-2xl font-semibold mb-6">
          Your Circles
        </h2>

        <div className="space-y-6">
          {dashboard.circles.length === 0 && (
            <p className="text-gray-400">No active circles</p>
          )}

          {dashboard.circles.map((circle) => (
            <div
              key={circle.circle_id}
              className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {circle.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Round {circle.current_round} of {circle.total_rounds}
                </p>
              </div>

              {!circle.has_paid ? (
                <button
                  className="bg-amber-800 px-4 py-2 rounded-md text-white hover:bg-amber-700"
                  onClick={() =>
                    executePayContribution(
                      circle.contribution_amount,
                      circle.sui_object_id,
                      circle.current_round
                    )
                  }
                >
                  Contribute now →
                </button>
              ) : (
                <button
                  disabled
                  className="bg-emerald-900 px-4 py-2 rounded-md text-white opacity-70 cursor-not-allowed"
                >
                  Paid this round
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}