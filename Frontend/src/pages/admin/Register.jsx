import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, UserCircle } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log(formData);

    try {
      const response = await api.post("/register.php", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      if (response.data.status === "success") {
        setSuccess("Register Berhasil. Silahkan Login");
        setTimeout(() => navigate("/admin/login"), 2000);
      }
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Register Gagal");
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 px-4'>
      <div className='max-w-md w-full bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700'>
        <h2 className='text-3xl font-bold text-white text-center mb-2'>
          Daftar Akun
        </h2>
        <p className='text-slate-400 text-center mb-8 text-sm'>
          Silakan lengkapi data di bawah ini
        </p>

        {error && (
          <div className='bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm'>
            {error}
          </div>
        )}
        {success && (
          <div className='bg-green-500/10 border border-green-500 text-green-500 p-3 rounded mb-4 text-sm'>
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className='space-y-5'>
          <div>
            <label className='text-slate-300 block mb-1 text-sm'>
              Nama Lengkap
            </label>
            <div className='relative'>
              <UserCircle
                className='absolute left-3 top-3 text-slate-500'
                size={20}
              />
              <input
                type='text'
                required
                className='w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500'
                placeholder='Nama Anda'
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className='text-slate-300 block mb-1 text-sm'>
              Username
            </label>
            <div className='relative'>
              <User
                className='absolute left-3 top-3 text-slate-500'
                size={20}
              />
              <input
                type='text'
                required
                className='w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500'
                placeholder='Username'
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className='text-slate-300 block mb-1 text-sm'>
              Password
            </label>
            <div className='relative'>
              <Lock
                className='absolute left-3 top-3 text-slate-500'
                size={20}
              />
              <input
                type='password'
                required
                className='w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500'
                placeholder='••••••••'
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-200 mt-4'>
            Daftar Sekarang
          </button>
        </form>

        <p className='text-slate-400 text-center mt-6 text-sm'>
          Sudah punya akun?{" "}
          <Link to='/admin/login' className='text-indigo-400 hover:underline'>
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
