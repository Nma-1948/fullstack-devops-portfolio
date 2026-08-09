import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-slate-900 md:flex md:flex-col">

        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
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

          <Link
            to="/admin"
            className="flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            to="/admin/messages"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <span>✉</span>
            Messages
          </Link>

        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <span>←</span>
            Back to Website
          </Link>
        </div>

      </aside>

      {/* Main */}
      <main className="md:ml-64">

        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">

          <div>
            <h2 className="text-xl font-semibold text-white">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your website administration.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            A
          </div>

        </header>

        {/* Content */}
        <section className="p-6">

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">
              Welcome back, Administrator 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your website from the administration panel.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Messages */}
            <Link
              to="/admin/messages"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                  ✉
                </div>

                <span className="text-slate-600 transition group-hover:text-blue-400">
                  →
                </span>

              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Messages
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View and manage messages submitted through your website.
              </p>
            </Link>

            {/* Security */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-400">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Security
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                JWT authentication is protecting the administration area.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-emerald-400">
                  Protected
                </span>
              </div>

            </div>

            {/* System */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-xl text-purple-400">
                ⚙
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                System
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Backend and administration services are configured.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-emerald-400">
                  Operational
                </span>
              </div>

            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-lg font-semibold text-white">
              Quick Actions
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used administration tools.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <Link
                to="/admin/messages"
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                View Messages
              </Link>

              <Link
                to="/"
                className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                View Website
              </Link>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}
