import starLogo from '../../assets/star-logo.png'

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}


/* ---------------- PAYMENT ---------------- */
function Payment({ activity }) {
  return (
    <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
      <div className="flex items-center gap-8 flex-1 min-w-62.5">
        <img src={starLogo} alt="logo" className="w-12 h-12 object-contain" />
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg">
          {activity.user}  Paid {activity.amount} SUI to {activity.circle_name}
          </h1>
          <p className="text-xs text-gray-400 truncate">
            Contribution for round {activity.round}
          </p>
          {activity.tx_hash && (
            <p className="text-[10px] text-gray-400 truncate">
              Tx: {activity.tx_hash}
            </p>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-400 text-right">
        <p>{timeAgo(activity.created_at)}</p>
      </div>
    </div>
  )
}

/* ---------------- MISSED ---------------- */
function Missed({ activity }) {
  return (
    <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
      <div className="flex items-center gap-8 flex-1 min-w-62.5">
        <img src={starLogo} alt="logo" className="w-12 h-12 object-contain" />
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg">
            Missed payment for round {activity.round}
          </h1>
          <p className="text-xs text-gray-400 truncate">
            Please complete your contribution
          </p>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-right">
        <p>{timeAgo(activity.created_at)}</p>
      </div>
    </div>
  )
}

/* ---------------- PAYOUT ---------------- */
function Payout({ activity }) {
  return (
    <div className="mx-auto my-4 flex items-center justify-between gap-3 text-white p-6 bg-[#111111B2] rounded-2xl w-full max-w-6xl">
      <div className="flex items-center gap-8 flex-1 min-w-62.5">
        <img src={starLogo} alt="logo" className="w-12 h-12 object-contain" />
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg">
            Payout triggered for round {activity.round}
          </h1>
          <p className="text-xs text-gray-400 truncate">
            Sent to {activity.user_name}
          </p>
          {activity.tx_hash && (
            <p className="text-[10px] text-gray-400 truncate">
              Tx: {activity.tx_hash}
            </p>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-400 text-right">
        <p>{timeAgo(activity.created_at)}</p>
      </div>
    </div>
  )
}

/* ---------------- MAIN ---------------- */
export default function ActivityCards({ activities = [] }) {
  if (activities.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No recent activity for this circle.
      </p>
    )
  }

  return (
    <div className="flex flex-col">
      {activities.map((activity) => {
        switch (activity.type) {
          case 'contribution':
            return <Payment key={activity.type} activity={activity} />
          case 'missed':
            return <Missed key={activity.id} activity={activity} />
          case 'payout':
            return <Payout key={activity.id} activity={activity} />
          default:
            return null
        }
      })}
    </div>
  )
}
