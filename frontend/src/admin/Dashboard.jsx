import { useEffect, useState } from "react";
import api from "../api/axios";
import { getToken, logout } from "../utils/auth";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        if (!token) {
          setMessage("No token found. Please login again.");
          return;
        }

        const response = await api.get("/admin/messages");

        if (response.data.success) {
          setData(response.data.messages || []);
          setMessage("");
        } else {
          setMessage(
            response.data.message || "Access denied"
          );
        }
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          setMessage(
            "Session expired. Please login again."
          );
        } else {
          setMessage(
            err.response?.data?.message ||
              "Server error or network issue"
          );
        }
      }
    };

    fetchData();
  }, []);

  const totalMessages = data.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-slate-900 md:flex md:flex-col">

        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              J
            </div>

            <div>
              <h1 className="font-bold text-white">
                JimmyTech
              </h1>

              <p className="text-xs text-slate-500">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">

          <button
            onClick={() => setActivePage("Dashboard")}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
              activePage === "Dashboard"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("Messages")}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
              activePage === "Messages"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>✉</span>
            Messages
          </button>

          <button
            onClick={() => setActivePage("Users")}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
              activePage === "Users"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>♙</span>
            Users
          </button>

        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="md:ml-64">

        {/* Top bar */}
        <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur">

          <div>
            <h2 className="text-xl font-semibold text-white">
              {activePage}
            </h2>

            <p className="text-sm text-slate-500">
              Welcome back, Administrator
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
            A
          </div>
        </header>

        {/* Content */}
        <section className="p-6">

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Total Messages
              </p>

              <div className="mt-3 flex items-end justify-between">
                <h3 className="text-3xl font-bold text-white">
                  {totalMessages}
                </h3>

                <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  Messages
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                System Status
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />

                <span className="font-medium text-emerald-400">
                  Operational
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Authentication
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />

                <span className="font-medium text-emerald-400">
                  Secure
                </span>
              </div>
            </div>

          </div>

          {/* Messages */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 px-6 py-5">
              <h3 className="text-lg font-semibold text-white">
                Recent Messages
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Messages submitted through your website.
              </p>
            </div>

            {message ? (
              <div className="p-8 text-center text-sm text-slate-400">
                {message}
              </div>
            ) : data.length === 0 ? (
              <div className="p-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-xl">
                  ✉
                </div>

                <p className="font-medium text-slate-300">
                  No messages yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  New contact messages will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">

                {data.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 transition hover:bg-slate-800/40"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <h4 className="font-semibold text-white">
                          {item.name}
                        </h4>

                        <p className="mt-1 text-sm text-blue-400">
                          {item.email}
                        </p>
                      </div>

                      {item.created_at && (
                        <span className="text-xs text-slate-500">
                          {new Date(
                            item.created_at
                          ).toLocaleString()}
                        </span>
                      )}

                    </div>

                    <p className="mt-4 leading-7 text-slate-400">
                      {item.message}
                    </p>
                  </div>
                ))}

              </div>
            )}

          </div>

        </section>
      </main>
    </div>
  );
}
