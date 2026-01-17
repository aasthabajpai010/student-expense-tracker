import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Colors);

export const MonthlyBarChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="card p-4">
      <h3 className="mb-3 text-lg font-semibold">Monthly Spend</h3>
      {labels.length === 0 ? (
        <p className="text-sm text-gray-500">No expenses yet</p>
      ) : (
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Amount",
                data: values,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      )}
    </div>
  );
};
