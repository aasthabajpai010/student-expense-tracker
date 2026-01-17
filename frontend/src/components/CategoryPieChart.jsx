import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export const CategoryPieChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="card p-4">
      <h3 className="mb-3 text-lg font-semibold">Spend by Category</h3>
      {labels.length === 0 ? (
        <p className="text-sm text-gray-500">No expenses yet</p>
      ) : (
        <Pie
          data={{
            labels,
            datasets: [
              {
                data: values,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { position: "bottom" },
            },
          }}
        />
      )}
    </div>
  );
};
