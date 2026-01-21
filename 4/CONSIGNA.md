# Sistema de Administración de Concesionario - Aplicación Práctica de POO

## Objetivo
Desarrollar un sistema simplificado de administración de concesionario que demuestre los conceptos fundamentales de Programación Orientada a Objetos de forma clara y sin complejidad innecesaria.

## Nivel de Complejidad
**⭐ BÁSICO** - Este ejercicio es más simple y es ideal para comenzar con POO.

## Requisitos del Sistema

### Entidades Principales

1. **Auto** (Clase Base)
   - Propiedades: motor, chasis, ruedas, precio, patente, fechaAlta, fechaVenta
   - Métodos: encender(), apagar(), conducir()
   - Getters/Setters: getPrecio, setPrecio, getFechaAlta, getFechaVenta, setFechaVenta, getPatente, setPatente
   - Validación: Verifica compatibilidad entre tipo de motor y tipo de combustible

2. **Concesionario** (Sistema Administrador)
   - Propiedades: autosDisponibles[], autosVendidos[]
   - Métodos: fabricarAuto(), obtenerCantidadAutos(), venderAuto(patente), getAutosDisponibles, getAutosVendidos

### Componentes del Sistema

#### Motores
- **MotorDeCombustion**: Implementa interface Motor
  - Requiere TipoCombustible en constructor (NAFTA o DIESEL)
  - Valida estado antes de encender/apagar
- **MotorElectrico**: Implementa interface Motor
  - TipoCombustible por defecto: BATERIA
  - Tiene porcentajeBateria

#### Partes
- **Chasis**: Parte del vehículo con color
  - Getters/Setters: getColor, setColor
- **Ruedas**: Parte del vehículo con rodado y tipo
  - Getters/Setters: getRodado, setRodado, getTipo, setTipo

### Conceptos de POO Aplicados

#### 1. **Encapsulamiento**
- Uso de modificadores de acceso: `private`, `public`
- Propiedades privadas con getters/setters públicos para control de acceso
- Validación de datos en setters

#### 2. **Herencia**
- No se aplica en este ejercicio (solo clases base)

#### 3. **Polimorfismo**
- Implementación de interface Motor
- Diferentes tipos de motores que implementan la misma interface
- Comportamiento diferente según el tipo de motor

#### 4. **Composición**
- Auto compuesto por motor, chasis y ruedas
- Cada parte es una clase independiente

#### 5. **Interfaces**
- `Motor`: Contrato que define arrancar(), apagar(), estaEncendido, tipoCombustible

#### 6. **Enums**
- `TipoCombustible`: Bateria, Nafta, Diesel
- `TipoRueda`: Deportiva, Todo terreno, Calle

#### 7. **Validación de Reglas de Negocio**
- Validación en constructor de Auto: MotorDeCombustion no puede usar BATERIA
- Validación en MotorElectrico: Solo acepta BATERIA
- Validación de estado en motores antes de encender/apagar

## Estructura de Archivos

```
4/
├── CONSIGNA.md
├── interfaces.ts          # Interface Motor
├── partes.ts             # Chasis, Ruedas, TipoCombustible, TipoRueda
├── MotorDeCombustion.ts  # Implementación de Motor (requiere TipoCombustible)
├── MotorElectrico.ts     # Implementación de Motor (BATERIA por defecto)
├── Auto.ts               # Clase base con validaciones
├── Concesionario.ts      # Sistema administrador con venta por patente
├── index.ts              # Archivo principal de ejecución
└── tsconfig.json         # Configuración de TypeScript
```

## Funcionalidades Implementadas

1. **Fabricación de Vehículos**
   - Crear autos con diferentes características (motor, chasis, ruedas, precio, patente)
   - Validación automática de compatibilidad motor-combustible

2. **Gestión de Vehículos**
   - Encender y apagar motores (con validación de estado)
   - Conducir vehículos (requiere motor encendido)

3. **Administración**
   - Registrar vehículos fabricados
   - Consultar inventario disponible
   - Vender autos por patente
   - Registrar autos vendidos
   - Actualizar fecha de venta automáticamente

## Ejecución

Para ejecutar el sistema:
```bash
npx ts-node index.ts
```

O compilar y ejecutar:
```bash
tsc index.ts
node index.js
```

## Notas Importantes

- El código está simplificado para facilitar el aprendizaje
- Se enfoca en demostrar los conceptos principales de POO
- Usa `import` y `export` para modularizar el código
- Todas las clases son concretas (no se usan clases abstractas)
- **Validación de reglas de negocio**: Los motores validan su compatibilidad con el combustible
- **Gestión de estado**: Los motores verifican su estado antes de cambiar (encender/apagar)
- **Identificación única**: Cada auto tiene una patente que funciona como identificador único
- **Historial**: El concesionario mantiene registro de autos vendidos y disponibles

## Ejemplo de Uso

```typescript
// Crear concesionario
const concesionario = new Concesionario();

// Fabricar auto con motor de combustión
const auto1 = concesionario.fabricarAuto(
    new MotorDeCombustion(TipoCombustible.NAFTA),
    new Chasis("negro"),
    new Ruedas(15, TipoRueda.DEPORTIVA),
    4000000,
    "ABC123"
);

// Fabricar auto eléctrico
const auto2 = concesionario.fabricarAuto(
    new MotorElectrico(),
    new Chasis("gris"),
    new Ruedas(17, TipoRueda.TODO_TERRENO),
    14000000,
    "XYZ789"
);

// Vender auto por patente
const autoVendido = concesionario.venderAuto("ABC123");

// Consultar inventario
console.log(concesionario.getAutosDisponibles);
console.log(concesionario.getAutosVendidos);
```
