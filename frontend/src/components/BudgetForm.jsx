import { useEffect, useState } from "react";

const defaultBudget = {
  month: new Date().toISOString().slice(0, 7),
  limit: "",
};

export const BudgetForm = ({ initial, onSubmit, submitLabel = "Save" }) => {
  const [budget, setBudget] = useState(defaultBudget);

  useEffect(() => {
    if (initial) {
      setBudget({ month: initial.month, limit: initial.limit });
    } else {
      setBudget(defaultBudget);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...budget, limit: Number(budget.limit) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Month</label>
        <input
          type="month"
          name="month"
          value={budget.month}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Limit</label>
        <input
          type="number"
          min="0"
          step="0.01"
          name="limit"
          value={budget.limit}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
