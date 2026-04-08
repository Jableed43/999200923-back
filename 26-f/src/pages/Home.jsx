import React, { useState } from 'react';
import { useGetProfesionales } from '../hooks/useGetProfesionales';
import ProfesionalCard from '../components/ProfesionalCard';
import { Search, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { profesionales, loading, error } = useGetProfesionales();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfesionales = profesionales.filter(p => 
    p.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Hero Section */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <Stethoscope size={40} color="var(--primary)" />
          <h1 style={{ fontSize: '3rem', color: 'var(--secondary)' }}>Clínica SePrise</h1>
        </div>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px' }}>
          Espacio de bienestar integral y salud mental. Profesionales comprometidos con tu equilibrio emocional.
        </p>
        
        {/* Role Access */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <Link to="/paciente" className="btn-primary">Reservar Turno</Link>
          <Link to="/mis-turnos" className="btn-primary" style={{ backgroundColor: 'var(--secondary)' }}>Mis Turnos</Link>
          <Link to="/profesional" className="btn-primary" style={{ backgroundColor: 'var(--accent)' }}>Gestor Administrativo</Link>
        </div>
      </header>

      {/* Staff Section */}
      <section>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <h2 style={{ color: 'var(--secondary)' }}>Nuestro Staff Médico</h2>
          
          {/* Filter */}
          <div style={{ position: 'relative', width: '300px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o especialidad..."
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #e2e8f0',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading && <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Cargando profesionales...</p>}
        {error && <p style={{ textAlign: 'center', color: 'var(--error)' }}>{error}</p>}
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px',
          justifyItems: 'center'
        }}>
          {!loading && filteredProfesionales.map(prof => (
            <ProfesionalCard key={prof._id} profesional={prof} />
          ))}
          {!loading && filteredProfesionales.length === 0 && (
            <p style={{ gridColumn: '1 / -1', color: 'var(--text-light)' }}>No se encontraron profesionales con ese criterio.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
