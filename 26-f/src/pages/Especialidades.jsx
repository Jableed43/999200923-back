import React from 'react';
import { useGetProfesionales } from '../hooks/useGetProfesionales';

const Especialidades = () => {
    const { profesionales, loading, error } = useGetProfesionales();

    const formatRanges = (slots) => {
        if (!slots || slots.length === 0) return '';
        const sortedSlots = [...slots].sort();
        const ranges = [];
        let start = sortedSlots[0];
        let prev = sortedSlots[0];

        for (let i = 1; i <= sortedSlots.length; i++) {
            const current = sortedSlots[i];
            
            // Lógica de continuidad (asumiendo slots de 30 min)
            let isConsecutive = false;
            if (current) {
                const [hPrev, mPrev] = prev.split(':').map(Number);
                const [hCurr, mCurr] = current.split(':').map(Number);
                const diff = (hCurr * 60 + mCurr) - (hPrev * 60 + mPrev);
                if (diff === 30) isConsecutive = true;
            }

            if (!isConsecutive) {
                // Cerramos rango: El fin es el último slot + 30 min (para mostrar el bloque completo)
                const [hLast, mLast] = prev.split(':').map(Number);
                let endMin = hLast * 60 + mLast + 30;
                const hEnd = Math.floor(endMin / 60);
                const mEnd = endMin % 60;
                const endTime = `${String(hEnd).padStart(2, '0')}:${String(mEnd).padStart(2, '0')}`;
                
                ranges.push(`${start} - ${endTime}`);
                start = current;
            }
            prev = current;
        }
        return ranges.join(' | ');
    };

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}><i className="fa-solid fa-circle-notch fa-spin fa-3x" style={{ color: 'var(--primary)' }}></i></div>;
    if (error) return <div style={{ padding: '100px', textAlign: 'center', color: 'var(--error)' }}>Error al cargar especialidades.</div>;

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Header Especialidades */}
            <div style={{ 
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
                color: 'white', 
                padding: '80px 20px', 
                textAlign: 'center',
                marginBottom: '60px'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '15px' }}>Nuestras Especialidades</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
                    Conoce a nuestro equipo de expertos y encuentra el apoyo profesional que necesitas para tu bienestar mental.
                </p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {profesionales.map((prof) => (
                        <div key={prof._id} className="glass-card" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0'
                        }}>
                            {/* IMAGEN Y INFO BASICA */}
                            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', borderRight: '1px solid #f1f5f9' }}>
                                <div style={{ 
                                    width: '180px', height: '180px', borderRadius: '50%', 
                                    overflow: 'hidden', border: '5px solid var(--background)', 
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    marginBottom: '20px'
                                }}>
                                    {prof.imagen ? (
                                        <img src={`http://localhost:3000${prof.imagen}`} alt={prof.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa-solid fa-user-doctor fa-4x" style={{ color: '#cbd5e0' }}></i>
                                        </div>
                                    )}
                                </div>
                                <h2 style={{ color: 'var(--secondary)', fontWeight: '800', marginBottom: '5px' }}>{prof.nombre} {prof.apellido}</h2>
                                <span style={{ backgroundColor: '#ecfdf5', color: 'var(--primary)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700' }}>
                                    {prof.especialidad}
                                </span>
                                <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa-solid fa-id-card"></i> 
                                    <span>Matrícula: {prof.matricula}</span>
                                </div>
                            </div>

                            {/* TRAYECTORIA Y DISPONIBILIDAD */}
                            <div style={{ padding: '40px' }}>
                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{ color: 'var(--secondary)', marginBottom: '15px', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--primary)' }}></i> Trayectoria Profesional
                                    </h3>
                                    <p style={{ color: 'var(--text-light)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                                        {prof.trayectoria || `El Dr/a. ${prof.apellido} cuenta con una destacada carrera en ${prof.especialidad}, brindando atención integral a sus pacientes con compromiso y excelencia académica.`}
                                    </p>
                                </div>

                                <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', marginBottom: '30px' }} />

                                <div>
                                    <h3 style={{ color: 'var(--secondary)', marginBottom: '15px', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className="fa-solid fa-calendar-check" style={{ color: 'var(--primary)' }}></i> Horarios de Atención
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {prof.disponibilidad && prof.disponibilidad.length > 0 ? (
                                            prof.disponibilidad.filter(d => d.activa && d.slots.length > 0).map((disp, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ width: '100px', fontWeight: 'bold' }}>
                                                        <i className="fa-regular fa-clock" style={{ color: 'var(--primary)', marginRight: '8px', fontSize: '0.8rem' }}></i>
                                                        {disp.dia}:
                                                    </div>
                                                    <div style={{ backgroundColor: '#f0f9ff', padding: '6px 15px', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--secondary)', border: '1px solid #bae6fd', fontWeight: '700' }}>
                                                        {formatRanges(disp.slots)}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontStyle: 'italic' }}>Solicitar horarios por secretaría.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Especialidades;
