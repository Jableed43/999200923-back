# 🗓️ Planificación: Sistema de Gestión de Turnos (Salud Mental)

Como **Senior Fullstack Developer**, mi objetivo es construir una solución robusta, escalable y con una experiencia de usuario impecable. Vamos a transformar este MVP en una herramienta profesional.

---

## 🎯 Objetivo General
Optimizar la agenda de profesionales de salud mental (psicólogos/psiquiatras), eliminando la fricción del agendamiento manual y centralizando la información.

## 🛠️ Tech Stack Definido
- **Backend**: Node.js + Express.
- **Frontend**: React (Vite) + CSS Moderno.
- **Base de Datos**: MongoDB (Colección: `turnos`).
- **Librerías Clave**: `date-fns` (Manejo de fechas), `mongoose`.
- **Validaciones**: Joi o Zod.
- **Estado**: Context API o Redux Toolkit.

---

## 🚀 Fase 1: Backend Core (En Progreso)
Esta fase se centra en la lógica de negocio y la persistencia de datos.

### 1. Modelado de Datos (Lógico)
- **Profesionales**: ID, Nombre, Especialidad, Disponibilidad (Array de slots por día).
- **Turnos**: ID, Fecha (**Tipo Date**), Hora (String "HH:mm"), Motivo, Estado (`disponible`, `reservado`, `cancelado`), ID_Profesional, ID_Paciente.

### 2. Lógica de Disponibilidad Dinámica (Cálculo en Tiempo Real)
Para evitar la pre-generación masiva de documentos, la disponibilidad se calculará así:
- **Disponibilidad Total** = Slots estáticos del Profesional definidos en su modelo.
- **Ocupación** = Turnos existentes en la DB para una fecha/hora/médico con estado distinto a `cancelado`.
- **Resultado** = (Disponibilidad Total) - (Ocupación). Esto garantiza que si un turno se cancela, el slot vuelve a estar libre automáticamente.

---

## 🎨 Fase 2: Frontend & UX
- **Dashboard Profesional**: Vista de calendario mensual/semanal.
- **Booking Widget**: Proceso de agendamiento para pacientes y administrativos.
- **Vista Multi-Profesional (Solapamiento)**:
    - El sistema permitirá visualizar varios profesionales que ofrecen el mismo slot horario en paralelo.
    - Los turnos se agruparán por hora para facilitar la elección del paciente basado en la especialidad o preferencia de profesional.

---

## 🏗️ Modelado de Datos Extendido

### 👨‍⚕️ Profesional
- **Campos**: `nombre`, `apellido`, `antiguedad`, `matricula`, `especialidad`.
- **Franjas Horarias**: Campo `disponibilidad` (Array de Objetos).
    - *Solución*: `[{ dia: "Lunes", slots: ["09:00", "09:30"], activa: true }]`.

### 👤 Paciente
- **Campos**: `nombre`, `apellido`, `antiguedad`.
- **Historia Clínica**: Array de objetos embebidos.
    - *Solución*: `historiaClinica: [{ fecha: Date, profesionalId: ObjectId, notas: String, diagnostico: String }]`.

### 📅 Turno (Nexo)
- **Campos**: `fecha` (Tipo **Date**), `hora` (String), `motivo`, `estado`, `paciente` (Ref), `profesional` (Ref).
- **Auditoría de Creación**: Referencia dinámica a `Paciente` o `Administrativo`.

---

## ❓ Respuestas Técnicas (Senior Insights)

### 1. Manejo de Fechas (JS Nativo vs date-fns)
Hemos optado por **`date-fns`** por sobre el objeto `Date` nativo de JS porque:
- Es **inmutable** (evita efectos colaterales).
- Maneja **Timezones** de forma más robusta.
- Permite obtener nombres de días (`Martes`) y formatear fechas de forma legible e internacionalizable con muy poco código.

### 2. ¿Cómo distinguir quién generó el turno?
Utilizaremos **Referencias Dinámicas (Mongoose Dynamic Refs)** con `refPath`. Esto mantiene la separación física de las colecciones de usuarios pero permite una trazabilidad total.

---

## ✅ Próximos Pasos (Actualizado)
1.  **Migración de Tipos**: Cambiar el campo `fecha` de String a `Date` en los modelos de Mongoose.
2.  **Instalación**: Añadir `date-fns` al proyecto backend.
3.  **Refactor del Servicio**: Implementar la resta lógica (Slots - Turnos Ocupados) en `fetchDisponibles`.
4.  **Backend**: Implementar lógica de validación para no permitir turnos duplicados en la misma franja.

---

## 🛣️ Arquitectura de Endpoints (Propuesta)

Para que el sistema sea funcional y soporte los 3 roles, necesitaremos implementar los siguientes endpoints:

### 👨‍⚕️ Módulo: Profesionales (`/api/profesionales`)
- `GET /`: Listar todos los profesionales (filtros por especialidad).
- `POST /`: Registrar un nuevo profesional.
- `GET /:id`: Obtener detalle de un profesional y su disponibilidad.
- `PATCH /:id/disponibilidad`: Actualizar las franjas horarias de atención.

### 👤 Módulo: Pacientes (`/api/pacientes`)
- `POST /`: Registrar un nuevo paciente.
- `GET /:id`: Obtener datos del paciente.
- `GET /:id/historia`: Ver historia clínica completa.
- `POST /:id/historia`: Agregar una nueva entrada a la historia clínica (solo profesionales).

### 📅 Módulo: Turnos (`/api/turnos`)
- `POST /reservar`: Crear un turno vinculado a paciente y profesional.
- `GET /disponibles`: Consultar slots libres cruzando disponibilidad vs turnos ocupados.
- `GET /profesional/:id`: Ver todos los turnos de un médico específico (Vista Administrativo/Profesional).
- `GET /paciente/:id`: Ver historial de turnos de un paciente.
- `PATCH /:id/estado`: Cambiar estado a `cancelado` o `completado`.

### 💼 Módulo: Administrativos (`/api/administrativos`)
- `POST /`: Registrar personal administrativo.
- `GET /dashboard-stats`: (Plus) Ver métricas de turnos del día.

---

---

## 🎨 Fase 2: Desarrollo del Frontend (Diseño & UX)

### 🧩 Stack de Tecnologías Frontend
- **Framework**: React.js (Vite).
- **Estalización**: CSS Puro (Variables CSS + Flexbox/Grid) para estética Premium.
- **Componentes UI**: **MUI (Material UI)** exclusivamente para modales de confirmación y diálogos complejos.
- **Notificaciones**: **SweetAlert2** para alertas de éxito, errores de colisión y confirmaciones de cancelación.
- **Iconografía**: Lucide React o FontAwesome.
- **Gestión de Fechas**: `date-fns` (espejo del backend).

---

### 🏛️ Arquitectura de Vistas (User Journey)

#### 1. Home Institucional (Landing Page)
- **Hero Section**: Introducción a la clínica con estética calmada y minimalista.
- **Staff Médico**: Sección con 3 tarjetas de profesionales destacados.
- **Filtros**: Buscador por especialidad para filtrar los profesionales mostrados en tiempo real.
- **Acceso Directo**: Botonera clara para elegir rol (Paciente, Profesional, Administrativo) sin necesidad de login.

#### 2. Vista del Paciente (Flujo de Reserva)
- **Calendario de Reserva**: Navegación desde el día actual hasta un máximo de +3 meses.
- **Restricción Temporal**: Los slots anteriores a la fecha/hora actual estarán deshabilitados visualmente para evitar errores.
- **Booking Flow**:
    1. Click en slot disponible.
    2. **Modal MUI**: Resumen del turno (Médico, Fecha, Hora) + Input para el motivo de la consulta.
    3. **SweetAlert2**: Notificación de éxito tras la reserva definitiva.

#### 3. Vista del Profesional (Agenda Clínica)
- **Calendario Personal**: Vista de turnos ocupados con código de colores:
    - *Azul (Reservado)*, *Verde (Completado)*, *Rojo (Cancelado)*.
- **Panel de Historia Clínica**: Al seleccionar un turno, se despliega un panel lateral para consultar el historial y registrar la evolución de la sesión.

#### 4. Vista del Administrativo (Gestión Centralizada)
- **Calendario Maestro**: Capacidad de ver y solapar las agendas de múltiples profesionales simultáneamente.
- **Buscador de Pacientes**: Autocomplete para asignar turnos de forma ágil a pacientes registrados.
- **Gestor de Estados**: Acciones rápidas para cancelar o reprogramar turnos desde la vista general.

---

### 🎨 Lineamientos de Diseño "Premium & Calm"
- **Tokens de Color**: Fondo #F8FAFC (blanco hueso), Acentos en Verde Eucalipto y Azul Petróleo.
- **Tipografía**: Fuentes modernas y limpias (ej. Inter u Outfit).
- **Efectos**: Sombras suaves, bordes muy redondeados y toques de Glassmorphism para una sensación state-of-the-art.

---

## ✅ Próximos Pasos (Frontend)
1. **Setup**: Inicializar proyecto con Vite + React.
2. **Dependencias**: Instalar MUI, SweetAlert2 y date-fns.
3. **Layout & Routing**: Crear la navegación base y la estructura de roles.
4. **Desarrollo Home**: Implementar la landing y las tarjetas de profesionales.


Para la proxima clase:
- quitar de la home el boton de "reservar turno", ya que no anda bien
- en el dashboard del medico, ademas quiero poder leer el motivo de la consulta en las cards
- quiero desde el dashboard medico poder acceder a la historia clinica del paciente (aun no esta desarrollada la funcionalidad de ver la historia clinica)
- Quiero poder desde el dashboard modificar el turno del paciente, la idea es que no tenga que dar de baja el turno, sino modificarlo sin darlo de baja, para poder hacer esto, nos llevara al calendario y podremos elegir otro dia/horario
- en la agenda de turnos, quiero poder ver los turnos solicitados en cada fecha y con un click poder acceder al detalle del turno
- pantalla de login/registro y manejo de sesion
- el paciente se crea a si mismo el usuario, pero el profesional es creado por el administrativo
