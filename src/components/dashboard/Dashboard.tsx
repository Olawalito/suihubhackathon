import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import {
  ConnectButton,
  useSuiClient,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { upsertUser, createCircle, addWallet } from "./helpers";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../../../constant";

import DashboardCard from "./DashboardCard";

type IconType = "active" | "time" | "give";

interface Circle {
  circle_id: string;
  name: string;
  total?: number | string;
  curent_round: number;
  total_rounds: number;
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

export default function Dashboard() {
  const wallet = useCurrentAccount();
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
 const account = useCurrentAccount();
    const userAddress = account?.address || "";
    const client = useSuiClient();
    const { mutateAsync: signAndExecuteTransaction } =
      useSignAndExecuteTransaction({
        execute: async ({ bytes, signature }) =>
          await client.executeTransactionBlock({
            transactionBlock: bytes,
            signature,
            options: {
              // Raw effects are required so the effects can be reported back to the wallet
              showRawEffects: true,
              // Select additional data to return
              showObjectChanges: true,
            },
          }),
      });
  useEffect(() => {
    if (!wallet?.address) {
      setDashboard(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      try {
        const res = await fetch(
          `https://trust-circle-backend.onrender.com/api/dashboard/address/${wallet.address}`,
          { signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        const data: DashboardResponse = await res.json();
        setDashboard(data);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Failed to load dashboard:", err);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [wallet?.address]);

  const mistToSui = (mist: number | string | undefined | null): string => {
    const n = Number(mist ?? 0);
    if (!isFinite(n)) return "0";
    const sui = n / 1_000_000_000; // 1 SUI = 1,000,000,000 mist
    return Number(sui.toFixed(6)).toString(); // trim to 6 decimals, adjust as needed
  };

  const dashboardData: {
    title: string;
    count: number | string;
    unit: string;
    subtitle: string;
    iconType: IconType;
  }[] = [
    {
      title: "Active Circles",
      count: dashboard ? dashboard.circles.length : 0,
      unit: "Circles",
      subtitle: "Next contribution in 20 hours",
      iconType: "active",
    },
    {
      title: "Next Payout",
      count: dashboard ? mistToSui(dashboard.next_payout.payout_amount) : "0",
      unit: "SUI",
      subtitle: `from ${dashboard?.next_payout.name}`,
      iconType: "give",
    },
    {
      title: "Next Contribution Due",
      count: dashboard ? mistToSui(dashboard.next_contribution.total) : "0",
      unit: "SUI",
      subtitle: "Due in 20 hours",
      iconType: "time",
    },
  ];

  if (dashboard) {
    console.log("Dashboard data:", dashboard);
  }
  async function excecutepayContribution(
    contributionAmount: number,
    circleObjectid: string,
    currentRound: number,
    sui_object_id: string
  ) {
   
    const txb = new Transaction();
    const [splitCoin] = txb.splitCoins(txb.gas, [
      txb.pure.u64(Number(contributionAmount)),
    ]);
    txb.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::pay_contribution`,
      arguments: [txb.object(circleObjectid), splitCoin],
    });
    const txResult = await signAndExecuteTransaction({
      transaction: txb,
    });
    await client.waitForTransaction({
      digest: txResult.digest,
    });

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
  }

  return (
    <div className="min-h-screen bg-cover bg-center  bg-no-repeat gap-y-4 items-center flex flex-col">
      <DashboardHeader />
      <div className=" flex flex-col items-center w-[90%] ">
        <div className="dashboard-body flex gap-y-7 sm:gap-x-12 flex-col sm:flex-row     pt-8 pb-16">
          {dashboardData.map((data, index) => (
            <DashboardCard
              key={index}
              title={data.title}
              count={data.count}
              unit={data.unit}
              subtitle={data.subtitle}
              iconType={data.iconType}
              className="mb-4"
            />
          ))}
        </div>
        <div className="circle flex flex-col w-full mx-auto pb-16 ">
          <h2 className="text-white text-2xl font-semibold mb-6">
            Your Circles
          </h2>
          <div className=" mx-auto space-y-6 border-2  w-3/4">
            <h2 className="text-white text-xl font-semibold mb-6">
              Savings Club
            </h2>

            {(dashboard?.circles ?? []).map((circle) => (
              <div
                key={circle.circle_id}
                className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 flex items-center justify-between gap-6  w-full "
              >
                <div>
                  <h3 className="text-white text-lg font-semibold">
                    {circle.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    <span className="text-gray-300">{`Round ${circle.current_round} of ${circle.total_rounds}`}</span>
                    <span className="mx-3 text-gray-500">|</span>
                    <span></span>
                  </p>
                </div>

                <div>
                  {!circle.has_paid ? (
                    <button
                      className="bg-amber-800 text-amber-50 px-4 py-2 rounded-md hover:bg-amber-700 transition flex items-center gap-2"
                      onClick={() =>
                        excecutepayContribution(
                          circle.contribution_amount,
                          circle.sui_object_id,
                          circle.current_round,
                          circle.circle_id
                        )
                      }
                    >
                      <span>Contribute now</span>
                      <span className="text-xl leading-none">→</span>
                    </button>
                  ) : (
                    <button className="bg-emerald-900 text-emerald-50 px-4 py-2 rounded-md hover:bg-emerald-800 transition flex items-center gap-2">
                      <span>Ready for payout</span>
                      <span className="text-xl leading-none">→</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
