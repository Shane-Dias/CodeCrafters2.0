const Dashboard = () => {
  return (
    <section id="dashboard" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Your Portfolio Overview</h2>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <p>
            Total Account Balance:{" "}
            <span className="font-semibold">$10,000</span>
          </p>
          <p>Stocks: $6,000 | Bonds: $3,000 | Insurance: $1,000</p>
        </div>
        {/* Add chart library here if needed */}
      </div>
    </section>
  );
};

export default Dashboard;
