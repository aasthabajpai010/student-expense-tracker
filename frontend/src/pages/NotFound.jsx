import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 text-center dark:bg-gray-900">
    <h1 className="text-3xl font-bold">404 - Page not found</h1>
    <p className="text-gray-500">The page you are looking for does not exist.</p>
    <Link className="btn-primary" to="/dashboard">
      Go Home
    </Link>
  </div>
);
