import {
  ConnectModal,
  useAccounts,
  useSuiClient,
  useCurrentAccount,
  useDisconnectWallet,
  useSwitchAccount,
} from "@mysten/dapp-kit";
import { useState, useEffect, useRef } from "react";
import round from "../assets/round.png";

export function ConnectWallet() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const accounts = useAccounts();
  const currentAccount = useCurrentAccount();
  const client = useSuiClient();
  const disconnect = useDisconnectWallet();
  const switchAccount = useSwitchAccount();

  const [balance, setBalance] = useState<number | null>(null);

  const trimmedAddress = (address?: string) => {
    if (!address) return "";
    const addr = address.toString();
    return addr.slice(0, 4) + "..." + addr.slice(-4);
  };
  const trimmed = trimmedAddress(currentAccount?.address);

  useEffect(() => {
    if (currentAccount?.address) {
      client
        .getBalance({
          owner: currentAccount.address,
          coinType: "0x2::sui::SUI",
        })
        .then((result: any) => {
          // result.totalBalance might be string/number; coerce to number
          setBalance(Number(result.totalBalance ?? 0));
        })
        .catch(() => setBalance(null));
    } else {
      setBalance(null);
    }
  }, [currentAccount, client]);

  // close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onDisconnect = async () => {
    setMenuOpen(false);
    await disconnect.mutateAsync();
  };

  const onSwitch = async () => {
    setMenuOpen(false);
    const nextAccount = accounts.find(
      (acc) => acc.address !== currentAccount?.address
    );
    if (nextAccount) {
      await switchAccount.mutateAsync({ account: nextAccount });
    } else {
      setConnectModalOpen(true);
    }
  };

  const onCopyAddress = async () => {
    if (currentAccount?.address) {
      await navigator.clipboard.writeText(currentAccount.address);
      setMenuOpen(false);
    }
  };

  return (
    <>
      {currentAccount ? (
        <div className="relative inline-block" ref={menuRef}>
          <div
            className="w-full text-center bg-[#FFFFFF2B] gap-4 text-white rounded-[90px] px-4 py-2 flex items-center justify-center cursor-pointer"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span className="mr-2">
              {balance !== null
                ? parseFloat((Number(balance) / 1e9).toFixed(2)) + " SUI"
                : "— SUI"}
            </span>
            <span className="flex items-center gap-2">
              <img src={round} alt="" />
              {trimmed}
            </span>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={onCopyAddress}
              >
                Copy address
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={onSwitch}
              >
                Switch account
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={onDisconnect}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className="text-white text-xs sm:text-sm rounded-[90px] py-2 md:py-3 px-3 md:px-6 bg-[linear-gradient(181.71deg,#373737_-39.78%,#FF9B7D_-8.23%,#FF3E00_106.05%)] whitespace-nowrap shrink-0 hover:opacity-90 transition" onClick={() => setConnectModalOpen(true)}>
          Connect Wallet
        </button>
      )}

     <ConnectModal
    open={connectModalOpen}
    onOpenChange={setConnectModalOpen}
/>
    </>
  );
}
