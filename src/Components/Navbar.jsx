const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-gray-200 fixed w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <div className="text-2xl font-bold bg-gray-800 py-2 px-4 rounded-xl shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(70,70,70,0.1)] border-t border-l border-gray-800">
            <a href="/">
            <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
              InvestPortal
            </span>
            </a>
          </div>
        </div>

        <ul className="flex space-x-8">
          {["Dashboard", "Investments", "Transactions", "Profile","Market","InvestHub"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase()}`}
                  className="relative py-2 px-4 rounded-lg bg-gray-800 shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 flex items-center justify-center overflow-hidden group border border-cyan-900"
                >
                  <span className="group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] transition-colors duration-300">
                    {item}
                  </span>
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
