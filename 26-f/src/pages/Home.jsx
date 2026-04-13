import React, { useState } from 'react';
import { useGetProfesionales } from '../hooks/useGetProfesionales';
import ProfesionalCard from '../components/ProfesionalCard';
import { Link } from 'react-router-dom';
import img1 from '../assets/carousel/carousel_1.jpg';
import img2 from '../assets/carousel/carousel_2.jfif';
import img5 from '../assets/carousel/carousel_5.jpg';
import teamImg from '../assets/profesionales/seprise_team.png';

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
      <section style={{ textAlign: 'center', marginBottom: '40px', padding: '20px 0' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--secondary)', marginBottom: '15px', fontWeight: '900' }}>
          Bienvenido a SePrise
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Tu espacio de bienestar integral y salud mental. Conecta con los mejores profesionales y gestiona tu equilibrio emocional de forma sencilla y segura.
        </p>
      </section>

      {/* Carousel Section */}
      <section style={{ marginBottom: '60px' }}>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={teamImg} className="d-block w-100" alt="Nuestro Equipo" style={{ height: '500px', objectFit: 'contain' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '15px', padding: '20px' }}>
                <h5>Equipo Interdisciplinario</h5>
                <p>Unidos para brindarte la mejor cobertura en todas las áreas del bienestar emocional.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img1} className="d-block w-100" alt="Bienestar Integral" style={{ height: '500px', objectFit: 'cover' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '15px', padding: '20px' }}>
                <h5>Compromiso con tu Salud</h5>
                <p>Ofrecemos atención personalizada con un staff de médicos especialistas en salud mental.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="Espacio Seguro" style={{ height: '500px', objectFit: 'cover' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '15px', padding: '20px' }}>
                <h5>Ambiente de Empatía</h5>
                <p>Nuestra clínica está diseñada para brindarte la tranquilidad que necesitas en cada sesión.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>

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
            <i className="fa-solid fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', fontSize: '0.9rem' }}></i>
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
