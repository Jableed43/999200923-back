# Documento Maestro de Arquitectura y Migración: Clínica SePrise

Este informe consolida la auditoría técnica profunda y el plan de migración para evolucionar el actual "Sistema de Turnos Médicos" (`26` y `26-f`) hacia el modelo integral exigido por el caso de estudio "Clínica SePrise" y su diseño relacional (`seprise.sql`).

Alcanzando el **100% de cobertura** sobre los requerimientos, este documento corrige discrepancias, unifica criterios de backend/frontend y define la hoja de ruta definitiva.

---

## 1. Auditoría y Refactorización de la Base de Datos (MongoDB)

El objetivo es aprovechar la flexibilidad de MongoDB pero garantizando la trazabilidad estricta (Circuitos A y B) y el control físico (Consultorios) que exige una clínica real.

### 1.1 Actualización de Modelos Existentes

*   **`Paciente.js`**:
    *   *Agregar*: `dni` (único), `numeroEmpadronamiento` (único, clave SePrise), `grupoSanguineo`, `telefono`, `obraSocialId` (Referencia).
    *   *Eliminar*: El array `historiaClinica` embebido. La historia clínica será el resultado de las "Atenciones" completadas para garantizar trazabilidad con el turno.
*   **`Profesional.js`**:
    *   *Agregar*: `dni` (único), `tipo` (Enum: `'medico'` | `'tecnico'`).
    *   *Mantiene*: La `disponibilidad` (agenda) embebida.
*   **`Turno.js`**:
    *   *Agregar*: `origen` (Ambulatorio/Internacion/Guardia), `modalidadSolicitud` (Call Center/Personal/Web), `fechaHoraLlegada` (Date, crítico para KPIs de espera), `formaPago`, `consultorioId` (Referencia).
    *   *Actualizar Estados*: Reflejar el viaje físico: `'Pendiente'` -> `'Acreditado'` (check-in) -> `'En_Atencion'` -> `'Completado'` / `'Ausente'` / `'Cancelado'`.

### 1.2 Nuevos Modelos a Crear (Los Faltantes Críticos)

*   **`Consultorio.js`**: (Gestión de Espacios Físicos). Controla dónde ocurre la atención (`nombre`: Ej. "Consultorio 1", "Sala Rayos X"). Evita la sobre-asignación de turnos a salas inexistentes.
*   **`Atencion.js`**: Unifica "Consulta" y "Estudio" vinculando OBLIGATORIAMENTE un `Turno`.
    *   Campos: `turnoId`, `profesionalId`, `tipo` (`'Consulta'`|`'Estudio'`). Si es consulta: `diagnostico`/`tratamiento`. Si es estudio: `resultado`, `insumosConsumidos` (`[{insumoId, cantidad}]`).
*   **`ObraSocial.js`**: `nombre`, `plan`.
*   **`Insumo.js`**: `nombre`, `stockActual`.
*   **`CajaDiaria.js` / `Cobro.js`**: (Módulo Financiero). Registra el dinero o cupones validados cuando el paciente se "Acredita" en Recepción.
*   **`Liquidacion.js`**: (Módulo Contable). Agrupa las `Atenciones` de un `Profesional` en un mes para emitir el pago.

---

## 2. Reestructuración de Roles Administrativos (Granularidad)

Actualmente existe un rol `administrativo` genérico. Según las encuestas de SePrise, los problemas varían por sector, lo que exige separar permisos e interfaces:

1.  **Rol `call_center`**: Acceso a la agenda completa. Pueden dar, cancelar y reprogramar turnos. **No** pueden cobrar, **no** pueden acreditar llegadas.
2.  **Rol `recepcion` (Mesa de Entrada)**: Son quienes ven a la persona físicamente. Validan DNI, cobran bonos (crean `CajaDiaria`), y cambian el turno a estado `'Acreditado'`.
3.  **Rol `director` (Back-office)**: Acceso exclusivo a los **Dashboards de KPIs** y a la generación de **Liquidaciones de Honorarios**.

---

## 3. Auditoría y Actualización del Frontend (`26-f`)

Las interfaces deben resolver los "cuellos de botella" operativos (recepción colapsada, ausentismo, falta de estadísticas).

### 3.1 Resolviendo el Cuello de Botella (Tótem y Sala)
*   **Tótem de Auto-Check In (`/totem`)**: Interfaz táctil simple. Ingreso de DNI/Empadronamiento -> Marca turno como `'Acreditado'` -> Guarda `fechaHoraLlegada`.
*   **Sala de Espera TV (`/sala-espera`) + WebSockets**: Una pantalla pasiva. Para evitar saturar el servidor con *polling*, se usará **Socket.io**. Cuando el médico haga clic en "Atender", emitirá un evento en tiempo real y la TV mostrará instantáneamente: *"Paciente X -> Consultorio Y"*.

### 3.2 Refinando los Portales
*   **Portal del Paciente (`/paciente`)**: Autogestión pura. Debe sumar la visualización/descarga de **Resultados de Estudios** (cerrando el Circuito B de cara al cliente).
*   **Portal del Profesional (`/profesional`)**:
    *   Debe diferenciar turnos "Acreditados" (ya están en sala) de los "Pendientes".
    *   **Formulario Dinámico**: Si el profesional logueado es `'medico'`, el modal pide Diagnóstico. Si es `'tecnico'`, pide Resultado y despliega un buscador para registrar **Insumos Consumidos** (descontando stock).

---

## 4. Plan de Acción Definitivo (Iteraciones)

Para garantizar un desarrollo ágil y sin romper el flujo actual, se aplicará esta secuencia:

*   **Fase 1: Cimientos y Roles (Backend)**
    *   Actualizar modelos `Paciente`, `Turno` y `Profesional`.
    *   Crear Modelos: `Consultorio`, `ObraSocial`, `Insumo`, `Atencion`.
    *   Implementar middleware de roles granulares (`call_center`, `recepcion`, `director`).
*   **Fase 2: Operación en Planta (Tótem, Caja y Sala)**
    *   Desarrollar vistas `/totem` y `/sala-espera`.
    *   Implementar **Socket.io** para el llamado en tiempo real.
    *   Desarrollar la vista de Recepción con gestión de cobros/caja diaria.
*   **Fase 3: Circuitos Médicos (Atención Diferenciada)**
    *   Modificar la UI del Profesional para soportar la dicotomía Consulta (Diagnóstico) vs. Estudio (Resultado + Insumos).
    *   Lógica de control de inventario al completar un estudio.
*   **Fase 4: Inteligencia, Finanzas y Automatización**
    *   Desarrollar el Motor de **Liquidación de Honorarios**.
    *   Crear la vista de **Dashboard Directivo** (Cálculo de Tiempos de Espera, Ausentismo).
    *   Activar **Cron-jobs** para notificaciones automáticas vía WhatsApp/SMS (reducción de ausentismo).
