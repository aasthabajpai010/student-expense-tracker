import { useNavigate } from "react-router-dom";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white/70 px-4 py-3 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <div className="flex items-center gap-3 md:hidden">
        <Bars3Icon className="h-6 w-6 text-gray-500" />
        <span className="font-semibold text-brand-600">Expense Tracker</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
        <div className="hidden items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200 md:flex">
          {user?.name || "Student"}
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="btn-secondary text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
