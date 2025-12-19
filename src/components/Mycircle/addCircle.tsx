import createicon from '../../assets/create-icon.png'
import { useState, useEffect } from 'react'
import React from 'react'

export default function Addcircle() {
  const [isOpen, setIsOpen] = useState(false)
  const [viewCircle, setViewCircle] = useState(null)

  const [circleDraft, setCircleDraft] = useState({
    name: '',
    amount: '',
    contributors: 0,
    frequency: 'weekly',
  })

  const [addresses, setAddresses] = useState([])
  const [circles, setCircles] = useState([])

  /* Keep contributors count in sync */
  useEffect(() => {
    setCircleDraft((prev) => ({
      ...prev,
      contributors: addresses.length,
    }))
  }, [addresses.length])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (addresses.length === 0) return
    if (!addresses.every((addr) => addr.trim() !== '')) return

    setCircles([...circles, { ...circleDraft, addresses }])

    setCircleDraft({
      name: '',
      amount: '',
      contributors: 0,
      frequency: 'weekly',
    })
    setAddresses([])
    setIsOpen(false)
  }

  return (
    <div className="w-full mx-5 overflow-hidden">
      {/* Create Card */}
      <div className="mx-auto flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl flex-wrap">
        <div className="flex gap-2 items-start">
          <img src={createicon} alt="create-icon" className="w-5 h-5 mt-1 shrink-0" />
          <div>
            <h1 className="text-base font-semibold whitespace-nowrap">
              Create a new circle
            </h1>
            <p className="text-xs text-white/70 whitespace-nowrap">
              Start a new saving circle with your trusted groups
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="shrink-0 bg-[linear-gradient(180deg,#FC5016_0%,#FF8961_100%)]
                     px-4 py-2 rounded-3xl text-sm font-medium"
        >
          Create a circle
        </button>
      </div>

      {/* Circle Cards */}
      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {circles.map((circle, idx) => (
          <div key={idx} className="bg-[#111] p-4 rounded-lg text-white">
            <h2 className="font-semibold text-lg">{circle.name || 'Untitled Circle'}</h2>
            <p>Amount: {circle.amount} SUI</p>
            <p>Frequency: {circle.frequency}</p>
            <p>Members: {circle.contributors}</p>

            <button
              onClick={() => setViewCircle(circle)}
              className="mt-2 bg-orange-500 px-3 py-1 rounded"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md
                        grid place-items-center overflow-y-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto
                       rounded-3xl bg-gradient-to-br
                       from-[#1b1b1b] via-[#0f0f0f] to-[#1a0b05]
                       border border-white/10 p-6 text-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create Circle</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-orange-400 mb-6">
              These rules cannot be changed after creation.
            </p>
        <div className="mb-4">
              <label className="text-xs text-white/60 mb-1 block">
                Circle Name
              </label>
              <div className="flex items-center bg-black/40 rounded-xl px-4 py-3 border border-white/10">
                <input
                  type="text"
                  value={circleDraft.name}
                  onChange={(e) =>
                    setCircleDraft({ ...circleDraft, name: e.target.value})
                  }
                  className="bg-transparent outline-none w-full text-sm"
                  placeholder=""
                  required
                />
              </div>
            </div>
            {/* Contribution Amount */}
            <div className="mb-4">
              <label className="text-xs text-white/60 mb-1 block">
                Contribution Amount
              </label>
              <div className="flex items-center bg-black/40 rounded-xl px-4 py-3 border border-white/10">
                <input
                  type="number"
                  value={circleDraft.amount}
                  onChange={(e) =>
                    setCircleDraft({ ...circleDraft, amount: Number(e.target.value) })
                  }
                  className="bg-transparent outline-none w-full text-sm"
                  placeholder="1"
                  required
                />
                <span className="text-white/60 text-sm">SUI</span>
              </div>
            </div>

            {/* Frequency Dropdown */}
            <div className="mb-4">
              <label className="text-xs text-white/60 mb-1 block">
                Contribution Frequency
              </label>
              <select
                value={circleDraft.frequency}
                onChange={(e) =>
                  setCircleDraft({ ...circleDraft, frequency: e.target.value })
                }
                className="w-full bg-black/40 rounded-xl px-4 py-3
                           border border-white/10 text-sm outline-none"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Members */}
            <div className="mb-4">
              <label className="text-xs text-white/60 mb-2 block">
                Members ({addresses.length})
              </label>

              {addresses.map((address, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-black/40
                             border border-white/10 rounded-xl px-3 py-2 mb-2"
                >
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      const next = [...addresses]
                      next[idx] = e.target.value
                      setAddresses(next)
                    }}
                    placeholder={`0x... member ${idx + 1}`}
                    className="bg-transparent outline-none w-full text-sm"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setAddresses(addresses.filter((_, i) => i !== idx))
                    }
                    className="text-red-400 text-xs hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setAddresses([...addresses, ''])}
                className="text-sm text-white/70 hover:text-white mt-2"
              >
                + Add Member
              </button>
            </div>

            {/* Gas Fee */}
            <div className="text-sm text-white/60 mb-6">
              Gas Fee: <span className="text-white">0.03 SUI</span>
              <div className="text-xs text-white/40">
                Estimated based on current network conditions.
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full rounded-xl py-3 font-semibold
                         bg-gradient-to-r from-orange-400 to-orange-600
                         hover:from-orange-500 hover:to-orange-700
                         shadow-lg shadow-orange-500/30"
            >
              Create Circle
            </button>
          </form>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewCircle && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#111111B2] p-6 rounded-2xl text-white
                w-full max-w-2xl mx-5
">
            <h1 className="font-semibold text-lg mb-2">Circle Details</h1>
            <p className='my-4'>Amount: {viewCircle.amount} SUI</p>
            <p className='my-4'>Frequency: {viewCircle.frequency}</p>
            <p className='my-4'>Members: {viewCircle.contributors}</p>

            <h2 className="mt-4 font-semibold">Addresses</h2>
            {viewCircle.addresses.map((addr, idx) => (
              <p key={idx} className="text-xs bg-[#222] p-1 rounded my-1">
                {addr}
              </p>
            ))}

            <button
              onClick={() => setViewCircle(null)}
              className="mt-4 bg-black px-4 py-2 rounded-2xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
