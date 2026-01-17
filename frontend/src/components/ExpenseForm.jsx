import { useEffect, useState } from "react";

const defaultExpense = {
  title: "",
  amount: "",
  category: "Food",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

export const ExpenseForm = ({ initial, onSubmit, submitLabel = "Save" }) => {
  const [expense, setExpense] = useState(defaultExpense);

  useEffect(() => {
    if (initial) {
      setExpense({
        ...initial,
        date: initial.date ? initial.date.slice(0, 10) : defaultExpense.date,
      });
    } else {
      setExpense(defaultExpense);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...expense,
      amount: Number(expense.amount),
      date: new Date(expense.date).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
        <input
          name="title"
          value={expense.title}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          >
            {["Food", "Rent", "Travel", "Shopping", "Bills", "Other"].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Date</label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Note</label>
          <input
            name="note"
            value={expense.note}
            onChange={handleChange}
            placeholder="Optional"
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
