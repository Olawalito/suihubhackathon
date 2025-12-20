import createicon from '../../assets/create-icon.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import React from 'react'
import {
  useSuiClient,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../../../constant";

export default function Addcircle() {
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const userAddress = account?.address || "";
  const client = useSuiClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [viewCircle, setViewCircle] = useState(null);

  const [circleDraft, setCircleDraft] = useState({
    name: '',
    amount: '',
    status: true,
    contributors: 0,
    frequency: 'weekly',
  });

  const [addresses, setAddresses] = useState([]);
  const [circles, setCircles] = useState([]); // This stores your created cards
  const [isLoaded, setIsLoaded] = useState(false);
  
  const uniqueAddresses = addresses.filter(m => m.address !== userAddress);
  let members = [userAddress, ...uniqueAddresses.map(m => m.address)];

  function suiToMist(sui) {
    if (!sui) return "0";
    const [whole, fraction = ""] = sui.toString().split(".");
    const paddedFraction = (fraction + "000000000").slice(0, 9);
    return (BigInt(whole) * 1_000_000_000n + BigInt(paddedFraction)).toString();
  }

  useEffect(() => {
    setCircleDraft((prev) => ({
      ...prev,
      contributors: members.length,
    }));
  }, [addresses.length]);

  // Load circles from local storage when user connects
  useEffect(() => {
    if (userAddress) {
      const saved = localStorage.getItem(`circles_${userAddress}`);
      if (saved) {
        setCircles(JSON.parse(saved));
      }
      setIsLoaded(true);
    } else {
      setCircles([]);
      setIsLoaded(false);
    }
  }, [userAddress]);

  // Save circles to local storage whenever they change
  useEffect(() => {
    if (isLoaded && userAddress) {
      localStorage.setItem(`circles_${userAddress}`, JSON.stringify(circles));
    }
  }, [circles, userAddress, isLoaded]);

  const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addresses.every((m) => m.address.trim() !== '')) return;

    setIsLoading(true);

    try {
      const contribution = suiToMist(circleDraft.amount);
      const txb = new Transaction();

      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_circle`,
        arguments: [
          txb.pure.u64(contribution),
          txb.pure("vector<address>", members),
          txb.pure("vector<address>", members),
        ],
      });

      const txResult = await signAndExecuteTransaction({ transaction: txb });
      await client.waitForTransaction({ digest: txResult.digest });

      const eventsResult = await client.queryEvents({
        query: { Transaction: txResult.digest },
      });

      if (eventsResult.data.length > 0) {
        const firstEvent = eventsResult.data[0]?.parsedJson;
        
        const circleObject = await client.getObject({
          id: firstEvent?.circle_id,
          options: { showContent: true },
        });

        const fields = circleObject?.data?.content?.fields;

        // 1. Add to local state so the card shows up immediately
        const allMembers = [{ name: 'You', address: userAddress }, ...uniqueAddresses];
        setCircles([...circles, { 
          ...circleDraft, 
          addresses: allMembers, 
          contributors: allMembers.length,
          total_rounds: fields?.total_rounds, 
          current_round: 1 
        }]);

        const res = await fetch("https://trust-circle-backend.onrender.com/api/circles/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: circleDraft.name,
            description: "### New Circle Created via Dapp",
            sui_object_id: firstEvent?.circle_id,
            creator_address: firstEvent?.creator,
            members: members,
            contribution_amount: contribution,
            current_round: 1,
            total_rounds: fields?.total_rounds,
            active: fields?.active,
            payout_order: fields?.payout_order,
          }),
        });

        if (res.ok) {
          setCircleDraft({ name: '', amount: '', contributors: 0, frequency: 'weekly' });
          setAddresses([]);
          setIsOpen(false);
          // Redirect to the list of circles
          navigate('/mycircle');
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full mx-5 overflow-hidden">
      {/* Create Card Header */}
      <div className="mx-auto flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl flex-wrap">
        <div className="flex gap-2 items-start">
          <img src={createicon} alt="create-icon" className="w-5 h-5 mt-1 shrink-0" />
          <div>
            <h1 className="text-base font-semibold whitespace-nowrap">Create a new circle</h1>
            <p className="text-xs text-white/70 whitespace-nowrap">Start a new saving circle with your trusted groups</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="shrink-0 bg-[linear-gradient(180deg,#FC5016_0%,#FF8961_100%)] px-4 py-2 rounded-3xl text-sm font-medium"
        >
          Create a circle
        </button>
      </div>

      {/* RESTORED: Circle Cards Grid */}
      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {circles.map((circle, idx) => (
          <div key={idx} className="bg-[#111] p-4 rounded-lg text-white border border-white/5">
            <h2 className="font-semibold text-lg">{circle.name || 'Untitled Circle'}</h2>
            <span>Status: <span className={`w-4 h-4 rounded-full inline-block ml-2 ${circle.status ? 'bg-green-500' : 'bg-gray-500'}`} /></span>
            <p className="text-sm text-white/60">Amount: {circle.amount} SUI</p>
            <p className="text-sm text-white/60">Frequency: {circle.frequency}</p>
            <p className="text-sm text-white/60">Members: {circle.contributors}</p>

            <button
              onClick={() => navigate('/circleactivity', { state: { circle } })}
              className="mt-3 bg-orange-600 hover:bg-orange-700 transition-colors px-4 py-1.5 rounded text-sm font-medium"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md grid place-items-center overflow-y-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#1b1b1b] via-[#0f0f0f] to-[#1a0b05] border border-white/10 p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create Circle</h2>
              <button type="button" onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Circle Name"
                  value={circleDraft.name}
                  onChange={(e) => setCircleDraft({ ...circleDraft, name: e.target.value })}
                  className="w-full bg-black/40 rounded-xl px-4 py-3 border border-white/10 outline-none text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount (SUI)"
                  value={circleDraft.amount}
                  onChange={(e) => setCircleDraft({ ...circleDraft, amount: e.target.value })}
                  className="w-full bg-black/40 rounded-xl px-4 py-3 border border-white/10 outline-none text-sm"
                  required
                />
                
                <div>
                  <label className="text-xs text-white/60 mb-2 block">Members ({addresses.length})</label>
                  {addresses.map((member, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        className="flex-1 bg-black/40 rounded-xl px-3 py-2 border border-white/10 text-xs" 
                        placeholder='Enter Name...' 
                        value={member.name}
                        onChange={(e) => {
                          const next = [...addresses];
                          next[idx] = { ...next[idx], name: e.target.value };
                          setAddresses(next);
                        }}
                      />
                      <input
                        type="text"
                        value={member.address}
                        onChange={(e) => {
                          const next = [...addresses];
                          next[idx] = { ...next[idx], address: e.target.value };
                          setAddresses(next);
                        }}
                        placeholder="Enter address 0x..."
                        className="flex-1 bg-black/40 rounded-xl px-3 py-2 border border-white/10 text-xs"
                        required
                      />
                      <button type="button" onClick={() => setAddresses(addresses.filter((_, i) => i !== idx))} className="text-red-400">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setAddresses([...addresses, { name: '', address: '' }])} className="text-xs text-orange-400">+ Add Member</button>
                </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-xl py-3 font-semibold ${
                isLoading ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 to-orange-700"
              }`}
            >
              {isLoading ? "Processing..." : "Create Circle"}
            </button>
          </form>
        </div>
      )}

      {/* RESTORED: VIEW MODAL */}
      {viewCircle && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-[#111] p-6 rounded-2xl text-white w-full max-w-2xl mx-5 border border-white/10 shadow-2xl">
            <h1 className="font-semibold text-xl mb-4 text-orange-500">Circle Details</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-xs text-white/40">Amount</p>
                <p className="text-lg font-medium">{viewCircle.amount} SUI</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-xs text-white/40">Frequency</p>
                <p className="text-lg font-medium capitalize">{viewCircle.frequency}</p>
              </div>
            </div>

            <h2 className="font-semibold text-sm mb-2 text-white/60">Participating Addresses</h2>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {viewCircle.addresses?.map((member, idx) => (
                <div key={idx} className="bg-black/50 p-2 rounded border border-white/5 break-all">
                  <p className="text-xs font-semibold text-white/80">{member.name || 'Unknown'}</p>
                  <p className="text-[10px] font-mono text-white/60">{member.address}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setViewCircle(null)}
              className="mt-6 w-full bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-xl text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}