import { useEffect, useState, useCallback } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardCard from "./DashboardCard";
import DashboardCardSkeleton from "../loader/DashboardCardSkeleton";
import CircleRowSkeleton from "../loader/CircleRowSkeleton";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import {
  useCurrentAccount,
  useSuiClient,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../../../constant";

/* ---------------- TYPES ---------------- */

interface Circle {
  circle_id: string;
  sui_object_id: string;
  name: string;
  current_round: number;
  total_rounds: number;
  contribution_amount: number;
  has_paid: boolean;
}

interface DashboardResponse {
  circles: Circle[];
  next_payout: {
    payout_amount: number;
    name: string;
  } | null;
  next_contribution: {
    total: number;
  } | null;
}

/* ---------------- UTILS ---------------- */

const mistToSui = (mist?: number | null) => {
  const n = Number(mist ?? 0);
  return (n / 1_000_000_000).toFixed(2).replace(/\.00$/, "");
};

/* ---------------- COMPONENT ---------------- */

export default function Dashboard() {
  const account = useCurrentAccount();
  const address = account?.address;

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

  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DASHBOARD ---------------- */

  const fetchDashboard = useCallback(async () => {
    if (!address) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://trust-circle-backend.onrender.com/api/dashboard/address/${address}`
      );
      const data = await res.json();
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  /* ---------------- PAY CONTRIBUTION ---------------- */

  async function executePayContribution(
    contributionAmount: number,
    circleObjectId: string,
    currentRound: number
  ) {
    if (!address) return;

    const txb = new Transaction();
    const [coin] = txb.splitCoins(txb.gas, [txb.pure.u64(contributionAmount)]);

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
      let payoutexecuted = eventsResult.data.length == 2 ? true : false;
      await fetch(
        "https://trust-circle-backend.onrender.com/api/contributions/sync",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sui_object_id: circleObjectId,
            user_address: address,
            tx_digest: txResult.digest,
            round_number: currentRound,
            payout_executed: payoutexecuted,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Contribution synced:", data);
          if (payoutexecuted) {
            toast.success("Contribution and Payout executed successfully!");
          } else {
            toast.success("Contribution executed successfully!");
          }
        });
    } else {
      console.log("No events found for the given criteria.");
    }

    fetchDashboard();
  }

  const cards = [
    {
      title: "Active Circles",
      count: dashboard?.circles.length ?? 0,
      unit: "Circles",
      subtitle: "Your active savings circles",
      iconType: "active",
    },
    {
      title: "Next Payout",
      count: mistToSui(dashboard?.next_payout?.payout_amount),
      unit: "SUI",
      subtitle: dashboard?.next_payout?.name ?? "—",
      iconType: "give",
    },
    {
      title: "Next Contribution",
      count: mistToSui(dashboard?.next_contribution?.total),
      unit: "SUI",
      subtitle: "Due this round",
      iconType: "time",
    },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center">
      <DashboardHeader />

      {/* SUMMARY */}
      <div className="flex gap-6 flex-wrap mt-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <DashboardCardSkeleton key={i} />
            ))
          : cards.map((c, i) => <DashboardCard key={i} {...c} />)}
      </div>

      {/* CIRCLES */}
      <div className="w-3/4 mt-12 space-y-6">
        <h2 className="text-white text-2xl font-semibold">Your Circles</h2>

        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <CircleRowSkeleton key={i} />)
        ) : dashboard?.circles?.length === 0 ? (
          <p className="text-gray-400">You are not in any circles yet. <NavLink to={`mycircle`} className="text-blue-700 underline">create circle now </NavLink></p>
        ) : (
          dashboard?.circles.map((circle) => (
            <div
              key={circle.circle_id}
              className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 flex justify-between items-center"
            >
              <NavLink to={`/circle/${circle.circle_id}`}>
                <div>
                  <h3 className="text-white text-lg font-semibold">
                    {circle.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Round {circle.current_round} of {circle.total_rounds}
                  </p>
                </div>
              </NavLink>
              {!circle.has_paid ? (
                <button
                  onClick={() =>
                    executePayContribution(
                      circle.contribution_amount,
                      circle.sui_object_id,
                      circle.current_round
                    )
                  }
                  className="bg-amber-800 px-4 py-2 rounded-md text-white hover:bg-amber-700"
                >
                  Contribute →
                </button>
              ) : (
                <button
                  disabled
                  className="bg-emerald-900 px-4 py-2 rounded-md text-white opacity-70"
                >
                  Paid this round
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
