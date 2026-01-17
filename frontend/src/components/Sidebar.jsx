import { NavLink } from "react-router-dom";
import { ChartPieIcon, HomeModernIcon, WalletIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: HomeModernIcon },
  { to: "/expenses", label: "Expenses", icon: WalletIcon },
  { to: "/budgets", label: "Budgets", icon: ChartPieIcon },
];

export const Sidebar = () => {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-gray-200 bg-white/60 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60 md:block">
      <div className="p-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-brand-600 dark:text-brand-100">
          <div className="h-3 w-3 rounded-full bg-brand-600" />
          Expense Tracker
        </div>
      </div>
      <nav className="px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
