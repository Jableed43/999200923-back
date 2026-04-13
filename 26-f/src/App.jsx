import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Paciente from './pages/Paciente';
import MisTurnos from './pages/MisTurnos';
import Profesional from './pages/Profesional';
import AltaProfesional from './pages/AltaProfesional';
import Login from './pages/Login';
import Register from './pages/Register';
import Institucional from './pages/Institucional';
import Especialidades from './pages/Especialidades';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Aplicación principal SePrise
 * Maneja la estructura global, navegación y protección de rutas.
 */
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        {/* Contenido principal de la aplicación */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* RUTAS PÚBLICAS */}
            <Route path="/" element={<Home />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/especialidades" element={<Especialidades />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* RUTAS PROTEGIDAS: PACIENTE */}
            <Route path="/paciente" element={
              <ProtectedRoute allowedRoles={['paciente']}>
                <Paciente />
              </ProtectedRoute>
            } />
            <Route path="/mis-turnos" element={
              <ProtectedRoute allowedRoles={['paciente']}>
                <MisTurnos />
              </ProtectedRoute>
            } />

            {/* RUTAS PROTEGIDAS: STAFF (Profesional/Admin) */}
            <Route path="/profesional" element={
              <ProtectedRoute allowedRoles={['profesional', 'administrativo']}>
                <Profesional />
              </ProtectedRoute>
            } />

            {/* RUTAS PROTEGIDAS: ADMINISTRACIÓN EXCLUSIVA */}
            <Route path="/admin/alta-profesional" element={
              <ProtectedRoute allowedRoles={['administrativo']}>
                <AltaProfesional />
              </ProtectedRoute>
            } />
            <Route path="/admin/editar-profesional/:id" element={
              <ProtectedRoute allowedRoles={['administrativo', 'profesional']}>
                <AltaProfesional />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
