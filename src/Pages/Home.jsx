import Navbar from "../Components/Navbar";

import Landing from "../Components/Landing";
import Features from "../Components/Features";
import Testimony from "../Components/Testimony";
import Perform from "../Components/Perform";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Landing />
      <Features />
      <Perform />
      <Testimony />
    </div>
  );
};

export default Home;
