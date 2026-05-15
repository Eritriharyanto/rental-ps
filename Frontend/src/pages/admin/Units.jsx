import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Plus, Edit, Trash2, Gamepad2, X } from "lucide-react";

const KelolaUnits = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // State untuk Form
  const [formData, setFormData] = useState({
    nama_unit: "",
    jenis: "Console",
    harga_per_jam: "",
    status: "tersedia",
    deskripsi: "",
  });

  const fetchUnits = async () => {
    try {
      const response = await api.get("/units/read.php");
      setUnits(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal mengambil data", err);
      setLoading(false);
    }
  };

  // Fungsi untuk buka modal edit (Auto-fill form)
  const openEditModal = (unit) => {
    setEditId(unit._id);
    setFormData({
      nama_unit: unit.nama_unit,
      jenis: unit.jenis,
      harga_per_jam: unit.harga_per_jam,
      status: unit.status,
      deskripsi: unit.deskripsi,
    });
    setIsModalOpen(true);
  };

  // Fungsi simpan (Bisa Create atau Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editId) {
        // Jika ada editId, panggil API Update
        response = await api.put("/units/update.php", {
          ...formData,
          id: editId,
        });
      } else {
        // Jika tidak ada, panggil API Create
        response = await api.post("/units/create.php", formData);
      }

      if (response.data.status === "success") {
        setIsModalOpen(false);
        setEditId(null);
        setFormData({
          nama_unit: "",
          jenis: "Console",
          harga_per_jam: "",
          status: "tersedia",
          deskripsi: "",
        });
        fetchUnits();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Gagal memproses data");
    }
  };

  // Fungsi hapus unit
  const handleDelete = async (id, nama) => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus unit "${nama}"?`)) {
      try {
        const response = await api.delete(`/units/delete.php?id=${id}`);
        if (response.data.status === "success") {
          fetchUnits();
          alert("Unit berhasil dihapus");
        }
      } catch (err) {
        alert(err.response?.data?.message || "Gagal menghapus unit");
      }
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold flex items-center gap-2 text-white'>
          <Gamepad2 className='text-indigo-500' /> Kelola Unit PS
        </h1>
        <button
          onClick={() => {
            setEditId(null); // Pastikan bukan mode edit
            setFormData({
              nama_unit: "",
              jenis: "Console",
              harga_per_jam: "",
              status: "tersedia",
              deskripsi: "",
            });
            setIsModalOpen(true);
          }}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition'
        >
          <Plus size={18} /> Tambah Unit Baru
        </button>
      </div>

      {/* Tabel Data */}
      <div className='bg-slate-800 border border-slate-700 rounded-xl overflow-hidden text-white'>
        <table className='w-full text-left'>
          <thead className='bg-slate-700/50 text-slate-300 text-sm'>
            <tr>
              <th className='p-4 font-semibold'>Nama Unit</th>
              <th className='p-4 font-semibold'>Jenis</th>
              <th className='p-4 font-semibold'>Harga /Jam</th>
              <th className='p-4 font-semibold'>Status</th>
              <th className='p-4 text-center'>Aksi</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-700'>
            {loading ? (
              <tr>
                <td colSpan='5' className='p-8 text-center text-slate-500'>
                  Memuat data...
                </td>
              </tr>
            ) : (
              units.map((unit) => (
                <tr key={unit._id} className='hover:bg-slate-700/30 transition'>
                  <td className='p-4 font-medium'>{unit.nama_unit}</td>
                  <td className='p-4 text-slate-400'>{unit.jenis}</td>
                  <td className='p-4 text-emerald-400'>
                    Rp {unit.harga_per_jam.toLocaleString()}
                  </td>
                  <td className='p-4'>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${
                        unit.status === "tersedia"
                          ? "bg-green-500/10 text-green-500"
                          : unit.status === "disewa"
                            ? "bg-orange-500/10 text-orange-500"
                            : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {unit.status.toUpperCase()}
                    </span>
                  </td>
                  <td className='p-4 flex justify-center gap-3'>
                    <button
                      onClick={() => openEditModal(unit)}
                      className='text-blue-400 hover:text-blue-300'
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(unit._id, unit.nama_unit)}
                      className='text-red-400 hover:text-red-300'
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-white'>
          <div className='bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden'>
            <div className='p-6 border-b border-slate-700 flex justify-between items-center'>
              <h3 className='text-xl font-bold'>
                {editId ? "Edit Unit PS" : "Tambah Unit PS"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-slate-400 hover:text-white'
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
              <div>
                <label className='block text-sm text-slate-400 mb-1'>
                  Nama Unit
                </label>
                <input
                  type='text'
                  required
                  value={formData.nama_unit}
                  className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none'
                  onChange={(e) =>
                    setFormData({ ...formData, nama_unit: e.target.value })
                  }
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm text-slate-400 mb-1'>
                    Jenis
                  </label>
                  <select
                    value={formData.jenis}
                    className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none'
                    onChange={(e) =>
                      setFormData({ ...formData, jenis: e.target.value })
                    }
                  >
                    <option value='Console'>Console</option>
                    <option value='Handheld'>Handheld</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm text-slate-400 mb-1'>
                    Harga/Jam
                  </label>
                  <input
                    type='number'
                    required
                    value={formData.harga_per_jam}
                    className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none'
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        harga_per_jam: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Tampilkan Status Select HANYA saat Edit */}
              {editId && (
                <div>
                  <label className='block text-sm text-slate-400 mb-1'>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none'
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value='tersedia'>Tersedia</option>
                    <option value='disewa'>Disewa</option>
                    <option value='maintenance'>Maintenance</option>
                  </select>
                </div>
              )}

              <div>
                <label className='block text-sm text-slate-400 mb-1'>
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none h-24'
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                ></textarea>
              </div>
              <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition mt-2'>
                {editId ? "Perbarui Unit" : "Simpan Unit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaUnits;
