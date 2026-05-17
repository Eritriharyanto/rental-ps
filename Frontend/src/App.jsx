import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginAdmin from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Units from "./pages/admin/Units";
import HomeUser from "./pages/user/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* USER */}
        <Route path='/' element={<HomeUser />} />

        {/* ADMIN AUTH */}
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin/register' element={<Register />} />

        {/* ADMIN */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='units' element={<Units />} />
        </Route>

        {/* DEFAULT */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;
