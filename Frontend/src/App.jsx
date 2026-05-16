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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin/register' element={<Register />} />

        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='units' element={<Units />} />
        </Route>

        <Route path='/' element={<Navigate to='/admin/login' />} />
      </Routes>
    </Router>
  );
}

export default App;
