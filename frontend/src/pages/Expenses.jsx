import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { ExpenseForm } from "../components/ExpenseForm.jsx";
import { Modal } from "../components/Modal.jsx";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    try {
      const { data } = await api.get("/expenses");
      setExpenses(data.expenses || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await api.put(`/expenses/${editing._id}`, payload);
      } else {
        await api.post("/expenses", payload);
      }
      setModalOpen(false);
      setEditing(null);
      fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save expense");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-sm text-gray-500">Manage your daily spending.</p>
        </div>
        <button
          className="btn-primary flex items-center gap-2"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          <PlusIcon className="h-5 w-5" />
          Add Expense
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {["Title", "Category", "Amount", "Date", "Note", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
              {expenses.map((exp) => (
                <tr key={exp._id} className="text-sm">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {exp.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{exp.category}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">₹{exp.amount}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {exp.date?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{exp.note}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                        onClick={() => {
                          setEditing(exp);
                          setModalOpen(true);
                        }}
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                        onClick={() => handleDelete(exp._id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                    No expenses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Expense" : "Add Expense"}
      >
        <ExpenseForm initial={editing} onSubmit={handleSave} submitLabel={editing ? "Update" : "Save"} />
      </Modal>
    </div>
  );
};
