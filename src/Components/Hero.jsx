const Hero = () => {
  return (
    <section className="bg-gray-900 text-gray-200 py-32 relative">
      {/* Subtle background glow effect */}
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-80"></div>

      {/* Glowing orbs in background */}
      <div className="absolute w-32 h-32 top-1/4 left-1/4 rounded-full bg-cyan-900 blur-3xl opacity-20"></div>
      <div className="absolute w-24 h-24 bottom-1/3 right-1/3 rounded-full bg-cyan-900 blur-3xl opacity-15"></div>

      <div className="container mx-auto text-center px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-[10px_10px_20px_rgba(0,0,0,0.4),-10px_-10px_20px_rgba(70,70,70,0.1)] border border-cyan-900/30">
          <h1 className="text-4xl font-bold mb-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
            Welcome to InvestPortal
          </h1>

          <p className="text-lg mb-8 text-gray-300">
            Manage your investments with ease and confidence.
          </p>

          <a
            href="#dashboard"
            className="inline-block bg-gray-800 px-8 py-4 rounded-xl text-lg font-medium shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(70,70,70,0.1)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.3),inset_-5px_-5px_10px_rgba(70,70,70,0.1)] transition-all duration-300 border border-cyan-700 relative overflow-hidden group"
          >
            <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-500">
              Get Started
            </span>
            <div className="absolute inset-0 bg-cyan-900/10 group-hover:bg-cyan-900/20 transition-colors duration-300"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
