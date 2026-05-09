import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard, Gamepad2, LogOut, User } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className='flex min-h-screen bg-slate-900 text-white'>
      {/* Sidebar */}
      <aside className='w-64 bg-slate-800 border-r border-slate-700'>
        <div className='p-6'>
          <h1 className='text-xl font-bold text-indigo-400'>Admin Rental PS</h1>
        </div>
        <nav className='mt-6 px-4 space-y-2'>
          <Link
            to='/admin/dashboard'
            className='flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 transition'
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to='/admin/units'
            className='flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 transition'
          >
            <Gamepad2 size={20} />
            <span>Kelola Unit PS</span>
          </Link>
          <button
            onClick={handleLogout}
            className='w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/10 text-red-400 transition mt-auto'
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8'>
        <header className='flex justify-between items-center mb-8'>
          <h2 className='text-lg font-semibold text-slate-400'>
            Panel Kendali
          </h2>
          <div className='flex items-center space-x-2 text-sm text-slate-300'>
            <User size={16} />
            <span>Administrator</span>
          </div>
        </header>
        {/* Outlet adalah tempat halaman (seperti Dashboard/Units) muncul */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
