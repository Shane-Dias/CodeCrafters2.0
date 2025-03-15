import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

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
      const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        sessionStorage.setItem("access_token", data.access);
        setFormSuccess(true);
        console.log("User Data:", data.user);
      } else {
        setFormError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
      <div className="w-full max-w-md bg-navy-800 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-700 to-cyan-900 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-cyan-200 mt-1 text-sm">Sign in to your account</p>
        </div>
        
        {/* Form */}
        <div className="p-6">
          {formSuccess ? (
            <div className="bg-cyan-900/30 border border-cyan-500 text-cyan-100 rounded-md p-4 mb-6 text-center">
              <svg className="w-6 h-6 text-cyan-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p>Login successful! Redirecting you...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-900/30 border border-red-500 text-red-100 rounded-md p-3 text-sm">
                  {formError}
                </div>
              )}
              
              <div>
                <label className="block text-cyan-300 text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange} 
                  className="w-full bg-navy-950/50 border border-navy-600 focus:border-cyan-400 rounded-md px-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors" 
                  placeholder="your.email@example.com" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-cyan-300 text-sm font-medium mb-1">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange} 
                  className="w-full bg-navy-950/50 border border-navy-600 focus:border-cyan-400 rounded-md px-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors" 
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
                    className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-navy-600 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-cyan-300/80">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 transition-all duration-300 flex justify-center items-center mt-6"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isSubmitting ? "Signing in..." : "Sign In"}  
              </button>
              
              <div className="text-center mt-4 text-cyan-300/70 text-sm">
                Don't have an account yet? <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium">Sign Up</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;