import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gamepad2, LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <nav className='bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <Gamepad2 className='text-indigo-500' size={28} />
            <span className='text-xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent tracking-wider'>
              ERI RENTAL
            </span>
          </div>

          {/* Menu */}
          <div className='flex items-center gap-6 text-sm font-medium'>
            <Link to='/' className='text-slate-300 hover:text-white transition'>
              Beranda
            </Link>
            <Link
              to='/admin/login'
              className='flex items-center gap-1.5 bg-indigo-600/10 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-indigo-400 hover:bg-indigo-600 hover:text-white transition'
            >
              <LogIn size={16} />
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
