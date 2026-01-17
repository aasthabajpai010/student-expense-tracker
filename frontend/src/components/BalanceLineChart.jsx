import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const formatCurrency = (value) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export const BalanceLineChart = ({ data = [], threshold = 1000, title = "Balance Over Time" }) => {
  const { theme } = useTheme();
  const [showThreshold, setShowThreshold] = useState(true);

  const hasLowBalance = data.some((d) => d.balance < threshold);

  const chartData = useMemo(() => {
    const labels = data.map((d) => d.date);
    const balances = data.map((d) => d.balance);

    return {
      labels,
      datasets: [
        {
          label: "Balance",
          data: balances,
          tension: 0.35,
          borderColor: (ctx) => {
            const { p0, p1 } = ctx.segment;
            return p0.parsed.y < threshold || p1.parsed.y < threshold ? "#F44336" : "#4CAF50";
          },
          pointBackgroundColor: (ctx) => (ctx.raw < threshold ? "#F44336" : "#4CAF50"),
          pointHoverRadius: 6,
          pointRadius: 4,
          fill: {
            target: "origin",
            above: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.chartArea.bottom);
              gradient.addColorStop(0, "rgba(76, 175, 80, 0.25)");
              gradient.addColorStop(1, "rgba(76, 175, 80, 0.02)");
              return gradient;
            },
            below: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.chartArea.bottom);
              gradient.addColorStop(0, "rgba(244, 67, 54, 0.25)");
              gradient.addColorStop(1, "rgba(244, 67, 54, 0.05)");
              return gradient;
            },
          },
          segment: {
            borderColor: (ctx) =>
              ctx.p0.parsed.y < threshold || ctx.p1.parsed.y < threshold ? "#F44336" : "#4CAF50",
            backgroundColor: "transparent",
          },
          borderWidth: 3,
          hoverBorderWidth: 4,
        },
        showThreshold && {
          label: `Low Balance (${formatCurrency(threshold)})`,
          data: balances.map(() => threshold),
          borderDash: [6, 6],
          borderWidth: 2,
          borderColor: "#FF9800",
          pointRadius: 0,
        },
      ].filter(Boolean),
    };
  }, [data, threshold, showThreshold]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 900,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: theme === "dark" ? "#e5e7eb" : "#374151",
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: theme === "dark" ? "#111827" : "#1f2937",
          titleColor: "#fff",
          bodyColor: "#f9fafb",
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: theme === "dark" ? "#9ca3af" : "#6b7280",
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: theme === "dark" ? "#9ca3af" : "#6b7280",
            callback: (value) => `₹${value / 1000}k`,
          },
          grid: {
            color: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          },
        },
      },
    }),
    [theme]
  );

  return (
    <div className="card relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50]/5 via-transparent to-[#2196F3]/5 blur-3xl" />
      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">Track your balance and avoid low funds.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowThreshold((v) => !v)}
            className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            {showThreshold ? "Hide" : "Show"} Threshold
          </button>
        </div>
      </div>

      <div className="relative mt-4 h-72 sm:h-80">
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">Add some data to see your balance trend.</p>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>

      {hasLowBalance && (
        <div className="relative mt-3 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">
          <span className="text-lg">⚠️</span>
          <span>Low Balance Alert — keep your balance above {formatCurrency(threshold)}.</span>
        </div>
      )}
    </div>
  );
};
