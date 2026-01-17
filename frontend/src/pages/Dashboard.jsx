import { useEffect, useMemo, useState } from "react";
import api from "../utils/api.js";
import { CategoryPieChart } from "../components/CategoryPieChart.jsx";
import { MonthlyBarChart } from "../components/MonthlyBarChart.jsx";
import { BalanceLineChart } from "../components/BalanceLineChart.jsx";

export const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, budRes] = await Promise.all([api.get("/expenses"), api.get("/budgets")]);
        setExpenses(expRes.data.expenses || []);
        setBudgets(budRes.data.budgets || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totals = useMemo(() => {
    const totalSpend = expenses.reduce((sum, e) => sum + e.amount, 0);
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlySpend = expenses
      .filter((e) => e.date.slice(0, 7) === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0);
    const currentBudget = budgets.find((b) => b.month === currentMonth)?.limit || 0;
    const remaining = Math.max(currentBudget - monthlySpend, 0);
    return { totalSpend, monthlySpend, currentBudget, remaining };
  }, [expenses, budgets]);

  const categoryData = useMemo(() => {
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
  }, [expenses]);

  const monthlyData = useMemo(() => {
    const grouped = {};
    expenses.forEach((e) => {
      const key = e.date.slice(0, 7);
      grouped[key] = (grouped[key] || 0) + e.amount;
    });
    return grouped;
  }, [expenses]);

  const sampleBalance = useMemo(
    () => [
      { date: "Jan", balance: 4200 },
      { date: "Feb", balance: 3600 },
      { date: "Mar", balance: 2100 },
      { date: "Apr", balance: 950 },
      { date: "May", balance: 1800 },
      { date: "Jun", balance: 1200 },
      { date: "Jul", balance: 600 },
      { date: "Aug", balance: 1900 },
      { date: "Sep", balance: 2400 },
      { date: "Oct", balance: 1500 },
      { date: "Nov", balance: 800 },
      { date: "Dec", balance: 2200 },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Snapshot of your spending and budgets.</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Spend" value={totals.totalSpend} />
            <StatCard label="This Month" value={totals.monthlySpend} />
            <StatCard label="Budget (month)" value={totals.currentBudget} />
            <StatCard label="Remaining" value={totals.remaining} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <CategoryPieChart data={categoryData} />
            <MonthlyBarChart data={monthlyData} />
          </div>
          <BalanceLineChart data={sampleBalance} threshold={1000} title="Account Balance Trend" />
        </>
      )}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="card p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold">₹{value.toFixed(2)}</p>
  </div>
);
