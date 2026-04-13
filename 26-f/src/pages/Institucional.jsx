import React from 'react';
import logo from '../assets/seprise_logo.svg';
import teamImg from '../assets/profesionales/seprise_team.png';

const Institucional = () => {
    return (
        <div style={{ paddingBottom: '80px', backgroundColor: 'var(--background)' }}>
            {/* HERO SECTION */}
            <header style={{ 
                background: 'linear-gradient(135deg, var(--secondary) 0%, #0f172a 100%)', 
                color: 'white', 
                padding: '80px 20px', 
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px', filter: 'brightness(0) invert(1)' }} />
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '15px' }}>Conoce SePrise</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                    Comprometidos con la salud mental integral y el bienestar de nuestra comunidad.
                </p>
            </header>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                {/* MISION Y VISION */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                    <div className="glass-card" style={{ padding: '35px', borderLeft: '6px solid var(--primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                             <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '12px' }}>
                                <i className="fa-solid fa-bullseye" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}></i>
                             </div>
                             <h2 style={{ color: 'var(--secondary)', fontWeight: '800' }}>Misión</h2>
                        </div>
                        <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                            Ofrecer una atención psiquiátrica y psicológica de excelencia, centrada en la singularidad de cada paciente a través de un enfoque interdisciplinario.
                        </p>
                    </div>
                    <div className="glass-card" style={{ padding: '35px', borderLeft: '6px solid var(--accent)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                             <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '12px' }}>
                                <i className="fa-solid fa-eye" style={{ color: 'var(--accent)', fontSize: '1.5rem' }}></i>
                             </div>
                             <h2 style={{ color: 'var(--secondary)', fontWeight: '800' }}>Visión</h2>
                        </div>
                        <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                            Ser reconocidos como el centro líder en rehabilitación e integración emocional en toda la región, transformando la percepción de la salud mental.
                        </p>
                    </div>
                </div>

                {/* HISTORIA */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center', marginBottom: '80px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <i className="fa-solid fa-landmark" style={{ color: 'var(--primary)', fontSize: '1.8rem' }}></i>
                            <h2 style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: '800' }}>Nuestra Historia</h2>
                        </div>
                        <p style={{ color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '20px' }}>
                            Fundada en 2010 por un grupo de especialistas apasionados, SePrise nació de la necesidad de crear un espacio donde la salud mental fuera tratada con la dignidad y el profesionalismo que merece cada ser humano.
                        </p>
                        <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                            Lo que comenzó como un pequeño consultorio privado se ha transformado hoy en una clínica de vanguardia con más de 20 especialistas dedicados a la sanación integral.
                        </p>
                    </div>
                    <div style={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                        <img src={teamImg} alt="Nuestro Equipo" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                {/* EQUIPO */}
                <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '30px', boxShadow: 'var(--shadow-md)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'inline-block', backgroundColor: '#ecfdf5', padding: '20px', borderRadius: '50%', marginBottom: '20px' }}>
                        <i className="fa-solid fa-users-rays" style={{ color: 'var(--primary)', fontSize: '2rem' }}></i>
                    </div>
                    <h2 style={{ color: 'var(--secondary)', marginBottom: '15px' }}>Un equipo humano a tu disposición</h2>
                    <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
                        En SePrise creemos que el vínculo terapéutico es la piedra angular de la recuperación. Por eso, acompañamos a cada paciente con respeto, calidez y solidez científica.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Institucional;
