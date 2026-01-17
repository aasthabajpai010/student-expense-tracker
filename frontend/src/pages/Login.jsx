import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = "Please enter your email or username.";
    }
    if (!form.password.trim()) {
      next.password = "Password is required.";
    } else if (form.password.length < 6) {
      next.password = "Password should be at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ form: err.response?.data?.message || "Login failed, try again." });
    } finally {
      setLoading(false);
    }
  };

  const bgPattern = useMemo(
    () =>
      "radial-gradient(circle at 20% 20%, rgba(76, 175, 80, 0.18), transparent 35%)," +
      "radial-gradient(circle at 80% 0%, rgba(255, 152, 0, 0.2), transparent 32%)," +
      "radial-gradient(circle at 50% 100%, rgba(33, 150, 243, 0.16), transparent 36%)",
    []
  );

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 text-gray-900 dark:text-gray-100"
      style={{ background: bgPattern, backgroundColor: "#f5f5f5" }}
    >
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 blur-3xl">
        <div className="absolute left-10 top-16 h-40 w-40 rounded-full bg-[#4CAF50]/25 animate-pulse" />
        <div className="absolute right-8 top-24 h-32 w-32 rounded-full bg-[#2196F3]/20 animate-[pulse_5s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#FF9800]/16 animate-[pulse_7s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid gap-8 rounded-3xl bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-900/80 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#4CAF50]/10 px-3 py-1 text-xs font-semibold text-[#4CAF50]">
              <span className="h-2 w-2 rounded-full bg-[#4CAF50] animate-ping" />
              Student Expense Tracker
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <span className="text-lg">{theme === "dark" ? "🌙" : "🌞"}</span>
              <span>{theme === "dark" ? "Dark" : "Light"} mode</span>
            </button>
          </div>

          <div className="mt-10 space-y-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-[#2196F3]/10 px-4 py-2 text-sm font-medium text-[#0d6efd]">
              <span className="text-xl animate-bounce">💰</span>
              Stay on top of every rupee, effortlessly.
            </div>
            <h1 className="text-3xl font-bold leading-tight text-[#2b2b2b] dark:text-white md:text-4xl">
              Login to your smart Expense Tracker
        </h1>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Track budgets, visualize spend, and manage allowances with a modern, student-friendly dashboard.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1 rounded-full bg-[#4CAF50]/10 px-3 py-1">
                <span className="text-[#4CAF50]">●</span> Secure login
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#FF9800]/10 px-3 py-1">
                <span className="text-[#FF9800]">●</span> Budget insights
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#2196F3]/10 px-3 py-1">
                <span className="text-[#2196F3]">●</span> Real-time charts
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="h-10 w-10 rounded-2xl bg-[#2196F3]/10 text-center text-2xl leading-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              📊
            </div>
            <div className="h-10 w-10 rounded-2xl bg-[#FF9800]/10 text-center text-2xl leading-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              💡
            </div>
            <div className="h-10 w-10 rounded-2xl bg-[#4CAF50]/10 text-center text-2xl leading-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              🏦
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-6 -top-6 h-16 w-16 rounded-2xl bg-white/70 shadow-lg backdrop-blur dark:bg-gray-800/80" />
          <div className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            {loading && (
              <div className="absolute inset-0 z-10 rounded-2xl bg-white/60 backdrop-blur-sm dark:bg-gray-900/60" aria-label="Loading">
                <div className="absolute left-1/2 top-3 h-1 w-32 -translate-x-1/2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div className="h-full w-1/2 animate-[ping_1.2s_ease-in-out_infinite] rounded-full bg-[#2196F3]" />
                </div>
              </div>
            )}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#2196F3]">Welcome back</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in</h2>
              </div>
              <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#4CAF50] via-[#2196F3] to-[#FF9800] p-3 text-white shadow-lg">
                <div className="h-10 w-10 rounded-xl bg-white/20 text-center text-2xl leading-10 shadow-inner transition hover:scale-110">
                  🪙
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
          <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Email / Username</label>
                <div className="relative mt-2">
            <input
                    type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
                    autoComplete="username"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 shadow-inner transition focus:border-[#2196F3] focus:bg-white focus:ring-2 focus:ring-[#2196F3]/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-[#2196F3]"
                    placeholder="you@example.com"
            />
                  <span className="pointer-events-none absolute right-4 top-3 text-lg text-[#2196F3] transition hover:scale-110">
                    📧
                  </span>
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Password</label>
                <div className="relative mt-2">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 shadow-inner transition focus:border-[#4CAF50] focus:bg-white focus:ring-2 focus:ring-[#4CAF50]/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-[#4CAF50]"
                    placeholder="••••••••"
                  />
                  <span className="pointer-events-none absolute right-4 top-3 text-lg text-[#4CAF50] transition hover:scale-110">
                    🔒
                  </span>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-[#4CAF50] focus:ring-[#4CAF50]"
            />
                  Remember me
                </label>
                <Link to="/forgot" className="font-semibold text-[#2196F3] transition hover:text-[#0d6efd]">
                  Forgot password?
                </Link>
          </div>

              {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#2196F3] px-4 py-3 text-white shadow-lg transition hover:scale-[1.01] hover:bg-[#1c7ed6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2196F3] disabled:cursor-not-allowed disabled:opacity-80"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#2196F3] to-[#FF9800] opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2 font-semibold">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Login
                      <span className="text-lg transition duration-300 group-hover:translate-x-1 group-hover:scale-110">→</span>
                    </>
                  )}
                </span>
          </button>
        </form>

            <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-300">
              New here?{" "}
              <Link className="font-semibold text-[#4CAF50] underline decoration-[#4CAF50]/50 underline-offset-4 transition hover:text-[#2e7d32]" to="/signup">
                Create an account
          </Link>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
};
