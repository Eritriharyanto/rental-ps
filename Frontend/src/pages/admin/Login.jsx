import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User } from "lucide-react";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Tombol login diklik");

    try {
      const response = await api.post("/login.php", {
        username,
        password,
      });

      console.log(response.data);

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "admin");

        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);

      setError(err.response?.data?.message || err.message || "Login Gagal");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 px-4'>
      <div className='max-w-md w-full bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700'>
        <h2 className='text-3xl font-bold text-white text-center mb-8'>
          Admin Rental PS
        </h2>

        {error && (
          <div className='bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className='space-y-6'>
          <div>
            <label className='text-slate-300 block mb-2 text-sm'>
              Username
            </label>
            <div className='relative'>
              <User
                className='absolute left-3 top-3 text-slate-500'
                size={20}
              />
              <input
                type='text'
                className='w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500'
                placeholder='Username admin'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className='text-slate-300 block mb-2 text-sm'>
              Password
            </label>
            <div className='relative'>
              <Lock
                className='absolute left-3 top-3 text-slate-500'
                size={20}
              />
              <input
                type='password'
                className='w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-200'>
            Masuk ke Dashboard
          </button>
          <p className='text-slate-400 text-center mt-6 text-sm'>
            Belum punya akun?{" "}
            <Link
              to='/admin/register'
              className='text-indigo-400 hover:underline'
            >
              Daftar di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
