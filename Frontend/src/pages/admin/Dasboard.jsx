import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Gamepad2, CheckCircle, XCircle, Wallet } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    tersedia: 0,
    disewa: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/units/read.php");
        const data = response.data.data;
        setStats({
          total: data.length,
          tersedia: data.filter((u) => u.status === "tersedia").length,
          disewa: data.filter((u) => u.status === "disewa").length,
        });
      } catch (err) {
        console.error("Gagal ambil statistik");
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Unit PS",
      value: stats.total,
      icon: <Gamepad2 />,
      color: "bg-indigo-600",
    },
    {
      title: "Unit Tersedia",
      value: stats.tersedia,
      icon: <CheckCircle />,
      color: "bg-emerald-600",
    },
    {
      title: "Sedang Disewa",
      value: stats.disewa,
      icon: <XCircle />,
      color: "bg-orange-600",
    },
    {
      title: "Pendapatan Hari Ini",
      value: "Rp 0",
      icon: <Wallet />,
      color: "bg-rose-600",
    },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
        <p className='text-slate-400'>
          Selamat datang kembali, Eri! Berikut ringkasan rentalmu hari ini.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statCards.map((card, index) => (
          <div
            key={index}
            className='bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg transition hover:scale-105'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-slate-400 text-sm font-medium'>
                  {card.title}
                </p>
                <h3 className='text-3xl font-bold text-white mt-1'>
                  {card.value}
                </h3>
              </div>
              <div className={`${card.color} p-3 rounded-xl text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder untuk grafik atau aktivitas terbaru */}
      <div className='bg-slate-800 border border-slate-700 p-8 rounded-2xl text-center'>
        <p className='text-slate-500 italic'>
          Grafik penyewaan akan muncul di sini setelah ada transaksi.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
