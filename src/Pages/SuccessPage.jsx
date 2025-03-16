import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-xl shadow-lg shadow-emerald-500/30 border-2 border-emerald-500/50 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Purchase Successful!</h1>
        <p className="text-gray-400 mb-8">
          Your cryptocurrency purchase has been completed successfully. The
          transaction details have been sent to your email.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all w-full"
        >
          <ArrowLeft size={20} />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
