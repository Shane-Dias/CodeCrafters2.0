const Hero = () => {
  return (
    <section className="bg-blue-700 text-white text-center py-32">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to InvestPortal</h1>
        <p className="text-lg mb-6">
          Manage your investments with ease and confidence.
        </p>
        <a
          href="#dashboard"
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full text-lg font-semibold"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
