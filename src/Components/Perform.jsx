import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { year: 2018, market: 4.5, wealthGrow: 8.2 },
  { year: 2019, market: 6.8, wealthGrow: 12.5 },
  { year: 2020, market: 2.3, wealthGrow: 9.7 },
  { year: 2021, market: 9.2, wealthGrow: 15.8 },
  { year: 2022, market: -1.5, wealthGrow: 3.6 },
  { year: 2023, market: 7.5, wealthGrow: 14.2 },
  { year: 2024, market: 5.8, wealthGrow: 11.9 },
];

const PerformanceChart = () => {
  return (
    <div className="bg-gray-800/30 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-medium text-white mb-6">Historical Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={performanceData}>
          <XAxis dataKey="year" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip wrapperClassName="bg-gray-900 p-2 rounded-lg text-white" />
          <Bar dataKey="wealthGrow" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          <Bar dataKey="market" fill="#a855f7" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-white/80">WealthGrow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-sm text-white/80">Market Average</span>
        </div>
      </div>
    </div>
  );
};

const PerformanceSection = () => {
  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Market-Beating Performance</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Our investment strategies consistently outperform market averages while maintaining risk control.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <PerformanceChart />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-medium text-white mb-6">Consistent Results</h3>
            <div className="space-y-6">
              {['Superior Returns', 'Risk Management', 'Growth Focus'].map((title, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <span className="text-lg text-blue-400">✔</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">{title}</h4>
                    <p className="text-white/60">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
