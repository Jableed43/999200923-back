import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Paciente from './pages/Paciente';
import MisTurnos from './pages/MisTurnos';
import Profesional from './pages/Profesional';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/mis-turnos" element={<MisTurnos />} />
          <Route path="/profesional" element={<Profesional />} />
          <Route path="/administrativo" element={<div style={{padding: '20px'}}>Dashboard Administrativo (En construcción)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
