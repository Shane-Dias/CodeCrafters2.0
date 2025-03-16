"use client";

import { useState, useEffect } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    // Load particles.js script dynamically
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.particlesJS !== "undefined") {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#00E0C7", "#8C52FF"] },
            shape: { type: "circle" },
            opacity: { value: 100, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "26C6DA",
              opacity: 1.15,
              width: 1,
            },
            move: { enable: true, speed: 2, random: true, out_mode: "out" },
          },
          interactivity: {
            events: {
              onhover: { enable: true },
            },
          },
          retina_detect: true,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing again
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("access_token", data.tokens.access);
        setFormSuccess(true);
        console.log("User Data:", data.user);
      } else {
        setFormError(
          data.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setFormError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      {/* Particles.js background */}
      <div className="absolute w-full h-full top-0 left-0 opacity-80 overflow-hidden">
        <div id="particles-js"></div>
      </div>

      {/* Glowing orbs in background */}
      <div className="absolute w-32 h-32 top-1/4 left-1/4 rounded-full bg-cyan-900 blur-3xl opacity-20"></div>
      <div className="absolute w-24 h-24 bottom-1/3 right-1/3 rounded-full bg-cyan-900 blur-3xl opacity-15"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gray-800 rounded-2xl shadow-[10px_10px_20px_rgba(0,0,0,0.4),-10px_-10px_20px_rgba(70,70,70,0.1)] border border-cyan-900/30 overflow-hidden">
          {/* Header */}
          <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
              Welcome Back
            </h2>
            <p className="text-gray-300 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="p-6">
            {formSuccess ? (
              <div
                className="bg-gray-800 border border-cyan-700 text-cyan-400 rounded-xl p-6 mb-6 text-center shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(70,70,70,0.1)]"
                style={{ width: "32rem" }}
              >
                <svg
                  className="w-12 h-12 text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-lg">Login successful! Redirecting you...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div className="bg-gray-800 border border-red-700 text-red-400 rounded-xl p-4 text-sm shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(70,70,70,0.1)]">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-cyan-900/50 focus:border-cyan-400 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)]"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-cyan-900/50 focus:border-cyan-400 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)]"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-700 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-cyan-400/80 drop-shadow-[0_0_3px_rgba(34,211,238,0.3)]"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-cyan-400 hover:text-cyan-300 font-medium drop-shadow-[0_0_5px_rgba(34,211,238,0.4)] transition-all duration-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 px-8 py-4 rounded-xl text-lg font-medium shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(70,70,70,0.1)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.3),inset_-5px_-5px_10px_rgba(70,70,70,0.1)] transition-all duration-300 border border-cyan-700 relative overflow-hidden group mt-6"
                >
                  <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-500 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-cyan-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-cyan-900/10 group-hover:bg-cyan-900/20 transition-colors duration-300"></div>
                </button>

                <div className="text-center mt-6 text-gray-300 text-sm">
                  Don't have an account yet?{" "}
                  <a
                    href="/register"
                    className="text-cyan-400 hover:text-cyan-300 font-medium drop-shadow-[0_0_5px_rgba(34,211,238,0.4)] transition-all duration-300"
                  >
                    Sign Up
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
