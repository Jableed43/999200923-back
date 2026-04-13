import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/seprise_logo.svg';

const Footer = () => {
    return (
        <footer style={{ 
            backgroundColor: 'var(--secondary)', 
            color: 'white', 
            padding: '60px 40px 20px',
            marginTop: 'auto',
            borderTop: '4px solid var(--primary)'
        }}>
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '40px',
                marginBottom: '40px'
            }}>
                {/* COL 1: IDENTIDAD */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={logo} alt="SePrise" style={{ width: '40px', filter: 'brightness(0) invert(1)' }} />
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>SePrise</span>
                    </div>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6 }}>
                        Tu centro de salud mental de confianza. Cuidado profesional y humano para tu equilibrio emocional.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <a href="#" style={{ color: 'white', opacity: 0.6 }}><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" style={{ color: 'white', opacity: 0.6 }}><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" style={{ color: 'white', opacity: 0.6 }}><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" style={{ color: 'white', opacity: 0.6 }}><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>

                {/* COL 2: PLATAFORMA */}
                <div>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '20px', fontSize: '1rem', fontWeight: '700' }}>Plataforma</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link to="/" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', fontSize: '0.9rem' }}>Inicio</Link>
                        <Link to="/institucional" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', fontSize: '0.9rem' }}>Institucional</Link>
                        <Link to="/especialidades" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', fontSize: '0.9rem' }}>Especialidades</Link>
                        <Link to="/login" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', fontSize: '0.9rem' }}>Acceso Staff</Link>
                    </div>
                </div>

                {/* COL 3: CONTACTO */}
                <div>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '20px', fontSize: '1rem', fontWeight: '700' }}>Contacto</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: 0.7 }}>
                            <i className="fa-solid fa-map-marker-alt" style={{ color: 'var(--primary)', width: '16px' }}></i> Av. Siempre Viva 123, CABA
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: 0.7 }}>
                            <i className="fa-solid fa-phone" style={{ color: 'var(--primary)', width: '16px' }}></i> +54 11 4444-5555
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: 0.7 }}>
                            <i className="fa-solid fa-envelope" style={{ color: 'var(--primary)', width: '16px' }}></i> contacto@seprise.com
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ 
                borderTop: '1px solid rgba(255,255,255,0.1)', 
                paddingTop: '20px', 
                textAlign: 'center', 
                fontSize: '0.75rem', 
                opacity: 0.4 
            }}>
                &copy; {new Date().getFullYear()} Clínica SePrise. Comprometidos con tu bienestar integral.
            </div>
        </footer>
    );
};

export default Footer;
