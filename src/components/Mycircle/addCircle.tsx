import createicon from '../../assets/create-icon.png';
import { useState, useEffect } from 'react';
import React from 'react';
import bgGradient from '../../assets/bg-gradient.png';

export default function Addcircle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [circleDraft, setCircleDraft] = useState({
    name: '',
    amount: '',
    contributors: 0,
  });
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (isCreated && addresses.length === 0 && circleDraft.contributors > 0) {
      setAddresses(Array(circleDraft.contributors).fill(''));
    }
  }, [isCreated, circleDraft.contributors, addresses.length]);

  const handleSubmitCircle = (e) => {
    e.preventDefault();
    if (
      circleDraft.name &&
      circleDraft.amount &&
      circleDraft.contributors > 0
    ) {
      setIsCreated(true);
    }
  };

  const handleSubmitAddresses = (e) => {
    e.preventDefault();
    console.log('Circle Data:', circleDraft);
    console.log('Addresses:', addresses);
  };

  return (
    <div className="w-full mx-5 overflow-hidden">
      <div className="mx-auto flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl flex-wrap">
        <div className="flex gap-2 items-start">
          <img src={createicon} alt="create-icon" className="w-5 h-5 mt-1 shrink-0" />
          <div>
            <h1 className="text-base font-semibold whitespace-nowrap">Create a new circle</h1>
            <p className="text-xs text-white/70 whitespace-nowrap">
              Start a new saving circle with your trusted groups
            </p>
          </div>
        </div>

        <button
          className="shrink-0 bg-[linear-gradient(180deg,#FC5016_0%,#FF8961_100%)] px-4 py-2 rounded-3xl text-sm font-medium hover:bg-[linear-gradient(180deg,#E64410_0%,#FF6F45_100%)]"
          onClick={() => setIsOpen(true)}
        >
          Create a circle
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{ backgroundImage: `url(${bgGradient})` }}
          >
            {!isCreated && (
              <form
                className="max-w-md mx-auto bg-[#111111B2] p-5 rounded-2xl"
                onSubmit={handleSubmitCircle}
              >
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    value={circleDraft.name}
                    onChange={(e) => setCircleDraft({ ...circleDraft, name: e.target.value })}
                    className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Contribution group name:
                  </label>
                </div>

                <div className="amount relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    value={circleDraft.amount}
                    max={10}
                    min={2}
                    onChange={(e) => setCircleDraft({ ...circleDraft, amount: e.target.value })}
                    className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-[8px] text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Amount in SUI(To be paid for each round):
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    value={circleDraft.contributors}
                    onChange={(e) =>
                      setCircleDraft({ ...circleDraft, contributors: Number(e.target.value) })
                    }
                    className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-xs text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Number of contributors
                  </label>
                </div>

                <button
                  type="submit"
                  className="text-white bg-black rounded-2xl bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                >
                  Create circle
                </button>
              </form>
            )}

            {isCreated && (
              <form
                className="bg-[#111111B2] p-6 rounded-2xl text-white max-w-sm mx-5"
                onSubmit={handleSubmitAddresses}
              >
                <h1>Enter addresses of contributors:</h1>
                {addresses.map((address, index) => (
                  <input
                    required
                    key={index}
                    type="text"
                    value={address}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[index] = e.target.value;
                      setAddresses(newAddresses);
                    }}
                    placeholder={`Contributor ${index + 1} address`}
                    className="w-full mb-2 p-2 rounded bg-[#222] text-white"
                  />
                ))}
                <button
                  type="submit"
                  className="text-white bg-black rounded-2xl bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
