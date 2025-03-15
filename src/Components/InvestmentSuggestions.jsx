const InvestmentSuggestions = () => {
  const suggestions = [
    { name: "Stock XYZ", return: "8%" },
    { name: "Stock ABC", return: "5%" },
    { name: "Bond 123", return: "3%" },
  ];

  return (
    <section id="investments" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Investment Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestions.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p>Potential Return: {item.return}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentSuggestions;
