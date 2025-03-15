import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Home_Dash from "../Components/Home_Dash";
import InvestmentSuggestions from "../Components/InvestmentSuggestions";
import StockDetails from "../Components/StockDetails";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <StockDetails />
      <Home_Dash />
      <InvestmentSuggestions />
    </div>
  );
};

export default Home;
