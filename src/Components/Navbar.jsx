const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white fixed w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">InvestPortal</div>
        <ul className="flex space-x-6">
          <li>
            <a href="/dashboard" className="hover:text-gray-400">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#investments" className="hover:text-gray-400">
              Investments
            </a>
          </li>
          <li>
            <a href="/market" className="hover:text-gray-400">
              Market
            </a>
          </li>
          <li>
            <a href="#profile" className="hover:text-gray-400">
              Profile
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
