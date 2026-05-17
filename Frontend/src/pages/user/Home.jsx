import React from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import { Gamepad2, Tv, MonitorPlay } from "lucide-react";
import { useState, useEffect } from "react";

const HomeUser = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthPublocUnits = async () => {
      try {
        const response = await api.get("units/read.php");

        //Hanya menapilkan Status Tersedia dan disewa
        setUnits(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("gagal memuat katalog PS", err);
        setLoading(false);
      }
    };
    fecthPublocUnits();
  }, []);
  return (
    <div className='min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30'>
      <Navbar />

      {/* Hero Section */}
      <header className='max-w-7xl mx-auto px-4 pt-16 pb-12 text-center space-y-4'>
        <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight'>
          Sewa PS Terbaik,{" "}
          <span className='text-indigo-500'>Mulai Main Sekarang!</span>
        </h1>
        <p className='text-slate-400 max-w-xl mx-auto text-base md:text-lg'>
          Rasakan sensasi gaming maksimal dengan konsol generasi terbaru, TV 4K,
          dan stik yang selalu prima. Datang dan amankan tokomu!
        </p>
      </header>

      {/* Katalog Utama */}
      <main className='max-w-7xl mx-auto px-4 pb-24'>
        <div className='flex items-center gap-2 mb-8 border-b border-slate-800 pb-4'>
          <MonitorPlay className='text-indigo-500' />
          <h2 className='text-2xl font-bold'>Katalog Konsol Ready</h2>
        </div>

        {loading ? (
          <div className='text-center text-slate-500 py-12'>
            Memuat katalog game...
          </div>
        ) : units.length === 0 ? (
          <div className='text-center text-slate-500 py-12 border border-dashed border-slate-800 rounded-2xl'>
            Belum ada unit PS yang terdaftar di sistem.
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {units.map((unit) => (
              <div
                key={unit._id}
                className='bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 hover:border-slate-700 transition flex flex-col justify-between shadow-xl'
              >
                <div>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='bg-indigo-600/10 p-3 rounded-xl text-indigo-400'>
                      <Gamepad2 size={24} />
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        unit.status === "tersedia"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      }`}
                    >
                      {unit.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className='text-xl font-bold mb-1'>{unit.nama_unit}</h3>
                  <p className='text-xs text-slate-500 mb-3'>{unit.jenis}</p>
                  <p className='text-slate-400 text-sm line-clamp-3 mb-6 bg-slate-950 p-3 rounded-xl min-h-[70px]'>
                    {unit.deskripsi || "Tidak ada deskripsi tambahan."}
                  </p>
                </div>

                <div className='pt-4 border-t border-slate-800 flex items-center justify-between'>
                  <div>
                    <span className='text-xs text-slate-500 block'>
                      Harga Sewa
                    </span>
                    <span className='text-lg font-extrabold text-emerald-400'>
                      Rp {unit.harga_per_jam.toLocaleString()}
                      <span className='text-xs font-normal text-slate-400'>
                        /jam
                      </span>
                    </span>
                  </div>
                  <button
                    disabled={unit.status !== "tersedia"}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                      unit.status === "tersedia"
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {unit.status === "tersedia"
                      ? "Sewa Sekarang"
                      : "Sedang Dipakai"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeUser;
