import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Calendar, DollarSign, BarChart2, Clock, Download, Check } from 'lucide-react';

const TransactionConfirmation = () => {
  const [downloadStatus, setDownloadStatus] = useState(null);
  
  const transaction = {
    type: 'BUY',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 10,
    price: 198.45,
    total: 1984.50,
    fee: 4.99,
    orderType: 'Market',
    date: 'Mar 15, 2025',
    time: '10:32 AM EST',
    accountName: 'Individual Investing',
    accountNumber: '****8742',
    confirmationNumber: 'TX-58291047',
    status: 'Completed'
  };

  // Function to generate PDF content as text (in a real app, you'd use a proper PDF library)
  const generateTransactionPDF = () => {
    setDownloadStatus('downloading');
    
    // Simulate download delay
    setTimeout(() => {
      // Create transaction details as text
      const transactionText = `
TRANSACTION CONFIRMATION
------------------------
InvestPro

Transaction Type: ${transaction.type}
Confirmation Number: ${transaction.confirmationNumber}
Status: ${transaction.status}

SECURITY DETAILS
---------------
Symbol: ${transaction.symbol}
Name: ${transaction.name}
Shares: ${transaction.shares}
Price: $${transaction.price.toFixed(2)}
Order Type: ${transaction.orderType}
Date: ${transaction.date}
Time: ${transaction.time}
Fee: $${transaction.fee.toFixed(2)}
Total Amount: $${transaction.total.toFixed(2)}

ACCOUNT INFORMATION
-----------------
Account: ${transaction.accountName}
Account Number: ${transaction.accountNumber}

Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      `;
      
      // Create a blob from the text
      const blob = new Blob([transactionText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor to trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `InvestPro_Transaction_${transaction.confirmationNumber}.txt`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Update status
      setDownloadStatus('completed');
      
      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 pt-20">
      {/* Header */}
      <header className="border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500"></div>
            <span className="font-bold text-xl">InvestPro</span>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <span className="font-bold">JD</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Confirmation Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-gray-800 border-2 border-indigo-500/50 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <CheckCircle size={24} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Transaction Confirmed</h1>
              <p className="text-gray-400">Your order has been successfully processed</p>
            </div>
          </div>

          {/* Transaction Card */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border-l-4 border-indigo-500 shadow-lg relative overflow-hidden" style={{
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.3), 0 0 8px rgba(99, 102, 241, 0.2)'
          }}>
            {/* Subtle glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 pointer-events-none"></div>
            
            {/* Download Button */}
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={generateTransactionPDF}
                disabled={downloadStatus === 'downloading'}
                className="flex items-center gap-1 py-1 px-3 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200 text-sm transition-all"
                style={{
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)'
                }}
              >
                {downloadStatus === 'downloading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
                    <span>Downloading</span>
                  </>
                ) : downloadStatus === 'completed' ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Transaction Type */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <span className={`py-1 px-3 rounded-full text-sm font-medium ${transaction.type === 'BUY' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}`}
                style={{
                  boxShadow: transaction.type === 'BUY' ? '0 0 15px rgba(16, 185, 129, 0.3)' : '0 0 15px rgba(239, 68, 68, 0.3)'
                }}>
                {transaction.type}
              </span>
              <span className="text-gray-400 text-sm">{transaction.confirmationNumber}</span>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="h-12 w-12 rounded-md bg-gradient-to-br from-indigo-500/30 to-violet-500/30 flex items-center justify-center border border-indigo-500/20"
                style={{
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)'
                }}>
                <span className="font-bold">{transaction.symbol.substring(0, 2)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{transaction.symbol}</h2>
                <p className="text-gray-400">{transaction.name}</p>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 relative z-10">
              <div className="p-3 bg-gray-900 rounded-md" style={{
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.2)'
              }}>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <BarChart2 size={14} />
                  <span>Shares</span>
                </div>
                <p className="font-bold">{transaction.shares}</p>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-md" style={{
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.2)'
              }}>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <DollarSign size={14} />
                  <span>Price</span>
                </div>
                <p className="font-bold">${transaction.price.toFixed(2)}</p>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-md" style={{
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.2)'
              }}>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Clock size={14} />
                  <span>Order Type</span>
                </div>
                <p className="font-bold">{transaction.orderType}</p>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-md" style={{
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.2)'
              }}>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Calendar size={14} />
                  <span>Date</span>
                </div>
                <p className="font-bold">{transaction.date}</p>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-md" style={{
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.2)'
              }}>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Clock size={14} />
                  <span>Time</span>
                </div>
                <p className="font-bold">{transaction.time}</p>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-md col-span-1" style={{
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.2)'
              }}>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <DollarSign size={14} />
                  <span>Fee</span>
                </div>
                <p className="font-bold">${transaction.fee.toFixed(2)}</p>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-700 pt-4 flex justify-between items-center relative z-10">
              <span className="text-gray-300">Total Amount</span>
              <span className="text-xl font-bold">${transaction.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6 relative overflow-hidden" style={{
            boxShadow: '0 0 20px rgba(45, 212, 191, 0.2), 0 0 8px rgba(45, 212, 191, 0.1)'
          }}>
            {/* Subtle glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 pointer-events-none"></div>
            
            <h3 className="text-lg font-medium mb-4 relative z-10">Account Information</h3>
            <div className="flex justify-between py-2 border-b border-gray-700 relative z-10">
              <span className="text-gray-400">Account</span>
              <span>{transaction.accountName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700 relative z-10">
              <span className="text-gray-400">Account Number</span>
              <span>{transaction.accountNumber}</span>
            </div>
            <div className="flex justify-between py-2 relative z-10">
              <span className="text-gray-400">Status</span>
              <span className="text-emerald-400 flex items-center gap-1" style={{
                textShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
              }}>
                <CheckCircle size={16} />
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white py-3 px-6 rounded-md font-medium flex-1 flex items-center justify-center gap-2" style={{
              boxShadow: '0 0 25px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3)'
            }}>
              View Portfolio
              <ArrowRight size={16} />
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-gray-100 py-3 px-6 rounded-md font-medium border border-gray-700 flex-1" style={{
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)'
            }}>
              New Transaction
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 text-sm text-center">
            &copy; 2025 InvestPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TransactionConfirmation;