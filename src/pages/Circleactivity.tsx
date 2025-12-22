import bgGradient from '../assets/bg-gradient.png'
import logo from '../assets/logo.png'
import ActivityCards from '../components/Activity/ActivityCards'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import DashboardCardSkeleton from "../loader/DashboardCardSkeleton";

export default function Circleactivity() {
  const { circleId } = useParams()

  const [circleData, setCircleData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCircleActivity() {
    try {
      setLoading(true)
      const res = await fetch(`https://trust-circle-backend.onrender.com/api/circles/${circleId}`)

      if (!res.ok) {
        throw new Error('Failed to fetch circle data')
      }

      const data = await res.json()
      setCircleData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCircleActivity()
  }, [circleId])
  

  return (
    <div style={{ backgroundImage: `url(${bgGradient})` }} className="min-h-screen flex flex-col">
            <DashboardHeader />

      <h1 className="text-white my-6 mx-12 md:text-3xl sm:text-2xl">
        Circle Activity
      </h1>

      <div className="mw-full bg-gradient-to-br from-[#1b1b1b] via-[#0f0f0f] to-[#1a0b05] border border-white/10 p-6 rounded-4xl shadow-xs text-white md:mx-32">

        {/* Loading */}
        {loading && (
          <p className="text-gray-400 animate-pulse">Loading circle data...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* Data */}
        {!loading && !error && circleData && (
          <>
            <h1 className="my-8">
              Total number of rounds:{' '}
              <span className="text-orange-500 font-bold">
                {circleData.circle?.total_rounds ?? 'N/A'}
              </span>
            </h1>

            <h2 className="my-8">
              Current round:{' '}
              <span className="text-orange-500 font-bold">
                {circleData.circle?.current_round ?? 'N/A'}
              </span>
            </h2>

            <h1 className="text-2xl font-semibold">
              Members ({circleData.members?.length || 0}):
            </h1>

            {circleData.members?.length === 0 && (
              <p className="text-gray-400 mt-4">No members yet</p>
            )}

            {circleData.members?.map((member, idx) => (
              <div key={idx} className="border-b border-white/10 pb-4 mb-4">
                <p className="my-4">
                  Name:{' '}
                  <span className="text-gray-300">
                    {member.name || 'Anonymous'}
                  </span>
                </p>

                <p className="my-4 break-all">
                  Address:{' '}
                  <span className="text-gray-300 font-mono text-sm">
                    {member.address}
                  </span>
                </p>

                <p className="my-2">
                  Status:{' '}
                  <span
                    className={
                      member.has_paid_current_round
                        ? 'text-green-400'
                        : 'text-red-400'
                    }
                  >
                    {member.has_paid_current_round ? 'Paid' : 'Not Paid'}
                  </span>
                </p>
              </div>
            ))}

            <h1 className="text-2xl font-semibold mt-12 mb-6">
              Recent Activities
            </h1>

            {circleData.activity?.length === 0 ? (
              <p className="text-gray-400">No activity yet</p>
            ) : (
              <ActivityCards activities={circleData.activity} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
