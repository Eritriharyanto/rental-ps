import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Plus, Edit, Trash2, Gamepad2, X } from 'lucide-react';

const KelolaUnits = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk Form
  const [formData, setFormData] = useState({
    nama_unit: '',
    jenis: 'Console',
    harga_per_jam: '',
    deskripsi: ''
  });

  const fetchUnits = async () => {
    try {
      const response = await api.get('/units/read.php');
      setUnits(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal mengambil data", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/units/create.php', formData);
      if (response.data.status === 'success') {
        setIsModalOpen(false); // Tutup modal
        setFormData({ nama_unit: '', jenis: 'Console', harga_per_jam: '', deskripsi: '' }); // Reset form
        fetchUnits(); // Refresh tabel
      }
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambah unit");
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
          <Gamepad2 className="text-indigo-500" /> Kelola Unit PS
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={18} /> Tambah Unit Baru
        </button>
      </div>

      {/* Tabel Data (Gunakan kode tabel sebelumnya di sini) */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-700/50 text-slate-300 text-sm">
            <tr>
              <th className="p-4 font-semibold">Nama Unit</th>
              <th className="p-4 font-semibold">Jenis</th>
              <th className="p-4 font-semibold">Harga /Jam</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {loading ? (
               <tr><td colSpan="5" className="p-8 text-center text-slate-500 text-white">Memuat data...</td></tr>
            ) : units.map((unit) => (
              <tr key={unit._id} className="hover:bg-slate-700/30 transition text-white">
                <td className="p-4 font-medium">{unit.nama_unit}</td>
                <td className="p-4 text-slate-400">{unit.jenis}</td>
                <td className="p-4 text-emerald-400">Rp {unit.harga_per_jam.toLocaleString()}</td>
                <td className="p-4">
                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-xs font-bold">
                    {unit.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <button className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                  <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Tambah Unit PS</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nama Unit</label>
                <input 
                  type="text" required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none"
                  placeholder="Contoh: PS5 Pro"
                  onChange={(e) => setFormData({...formData, nama_unit: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Jenis</label>
                  <select 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none"
                    onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                  >
                    <option value="Console">Console</option>
                    <option value="Handheld">Handheld</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Harga/Jam</label>
                  <input 
                    type="number" required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none"
                    placeholder="10000"
                    onChange={(e) => setFormData({...formData, harga_per_jam: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Deskripsi</label>
                <textarea 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none h-24"
                  placeholder="Keterangan unit..."
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                ></textarea>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition mt-2">
                Simpan Unit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaUnits;