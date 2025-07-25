"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const result = await login(formData);

    if (result.success) {
      // Redirect to dashboard on successful login
      router.push("/admin/dashboard");
    } else {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-color">
            <i className="fa-solid fa-shield-halved text-white text-xl"></i>
          </div>
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Access the portfolio management dashboard
          </p>
        </div>

        <form className="mt-6 sm:mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color text-base"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color text-base"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-md text-sm">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <div className="space-y-1">
              <p>
                Username:{" "}
                <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded text-xs">
                  admin
                </code>
              </p>
              <p>
                Password:{" "}
                <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded text-xs">
                  admin123
                </code>
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-color hover:bg-primary-color/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 admin-touch-target"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sign-in-alt mr-2"></i>
                  Sign in
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminLogin = () => {
  return (
    <AdminAuthProvider>
      <LoginForm />
    </AdminAuthProvider>
  );
};

export default AdminLogin;
