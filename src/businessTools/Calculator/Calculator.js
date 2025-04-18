
import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [profit, setProfit] = useState(100000);
  const [percentage, setPercentage] = useState(10);
  const [daysInMonth, setDaysInMonth] = useState(30);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [dailyAmount, setDailyAmount] = useState(0);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(days);
  }, []);

  useEffect(() => {
    const calculatedMonthly = (profit * percentage) / 100;
    const calculatedDaily = calculatedMonthly / daysInMonth;
    setMonthlyAmount(calculatedMonthly);
    setDailyAmount(calculatedDaily);
  }, [profit, percentage, daysInMonth]);

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Monthly Profit Calculator</h2>
      <div style={{ marginBottom: '15px' }}>
        <label>Profit Amount (₹):</label>
        <input
          type="number"
          value={profit}
          onChange={(e) => setProfit(+e.target.value)}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Profit Percentage (%):</label>
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(+e.target.value)}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>
      <div>
        <p><strong>Days in Month:</strong> {daysInMonth}</p>
        <p><strong>Monthly Profit:</strong> ₹{monthlyAmount.toFixed(2)}</p>
        <p><strong>Daily Profit:</strong> ₹{dailyAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Calculator;
