import Footer from '../components/footer'

function Dashboard() {
  return (
    <>
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard content will go here */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
            <p className="text-gray-400">No groups yet</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Your Contributions</h2>
            <p className="text-gray-400">No contributions yet</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Balance</h2>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Dashboard;
