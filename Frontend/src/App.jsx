import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginAdmin from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import AdminLayout from "./layouts/AdminLayout";
import KelolaUits from "./pages/admin/Units";
import Dashboard from "./pages/admin/Dasboard";

// Komponen Halaman Sementara
const Dashboard = () => (
  <div className='text-white'>Isi Ringkasan Data di sini...</div>
);
const KelolaUnits = () => (
  <div className='text-white'>Tabel CRUD Unit PS di sini...</div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin/register' element={<Register />} />

        {/* Semua route di bawah ini akan masuk ke dalam Layout dengan Sidebar */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='units' element={<KelolaUnits />} />
        </Route>

        <Route path='/' element={<Navigate to='/admin/login' />} />
      </Routes>
    </Router>
  );
}

export default App;
