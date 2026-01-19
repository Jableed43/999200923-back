# Tarea - Pilares de POO en TypeScript

## Objetivo

Aplicar los conceptos de **Encapsulación**, **Herencia** y **Polimorfismo** aprendidos en clase mediante la creación de un sistema de gestión de vehículos.

---

## Ejercicio 1: Encapsulación y Getters/Setters (30 puntos)

Crea una clase `Vehiculo` con las siguientes características:

### Requisitos:

1. **Propiedades:**
   - `marca` (public, readonly): marca del vehículo
   - `_precio` (private): precio del vehículo (debe ser mayor a 0)
   - `_kilometraje` (private): kilometraje del vehículo (debe ser mayor o igual a 0)
   - `_combustible` (private): nivel de combustible (0-100)

2. **Constructor:**
   - Recibe: `marca`, `precio`, `kilometraje` (opcional, por defecto 0), `combustible` (opcional, por defecto 100)

3. **Getters y Setters:**
   - `get precio()`: retorna el precio
   - `set precio(nuevoPrecio)`: valida que sea mayor a 0, si no lanza error
   - `get kilometraje()`: retorna el kilometraje
   - `set kilometraje(nuevoKm)`: valida que sea mayor o igual a 0
   - `get combustible()`: retorna el nivel de combustible
   - `set combustible(nivel)`: valida que esté entre 0 y 100

4. **Métodos públicos:**
   - `conducir(kilometros: number)`: aumenta el kilometraje y reduce el combustible (1 km = 0.1% de combustible)
   - `cargarCombustible(cantidad: number)`: aumenta el combustible hasta máximo 100

5. **Método privado:**
   - `_validarPrecio(precio: number)`: valida que el precio sea válido (reutilizar en setter)

### Ejemplo de uso esperado:

```typescript
let auto = new Vehiculo("Toyota", 50000, 0, 100);
console.log(auto.marca);        // "Toyota"
console.log(auto.precio);       // 50000
auto.precio = 45000;            // ✅ Funciona
// auto.precio = -1000;         // ❌ Error: "El precio debe ser mayor a 0"
auto.conducir(50);              // Aumenta kilometraje, reduce combustible
console.log(auto.kilometraje);  // 50
console.log(auto.combustible);  // 95
```

---

## Ejercicio 2: Herencia (35 puntos)

Crea un sistema de herencia para diferentes tipos de vehículos:

### Clase Base: `Vehiculo` (del ejercicio 1)

### Clase Hija 1: `Auto` extends `Vehiculo`

**Propiedades adicionales:**
- `puertas` (protected): número de puertas (2, 4 o 5)
- `tipoTransmision` (protected): "manual" o "automatica"

**Constructor:**
- Recibe todos los parámetros de `Vehiculo` + `puertas` y `tipoTransmision`
- Usa `super()` para inicializar la clase padre

**Métodos:**
- `getPuertas()`: retorna número de puertas
- `getTipoTransmision()`: retorna tipo de transmisión
- `abrirPuertas()`: muestra mensaje "Abriendo X puertas"

### Clase Hija 2: `Moto` extends `Vehiculo`

**Propiedades adicionales:**
- `cilindrada` (protected): cilindrada en cc (ej: 150, 250, 600)

**Constructor:**
- Recibe todos los parámetros de `Vehiculo` + `cilindrada`
- Usa `super()` para inicializar la clase padre

**Métodos:**
- `getCilindrada()`: retorna la cilindrada
- `hacerCaballito()`: muestra mensaje "Haciendo caballito con moto de Xcc"

### Clase Hija 3: `Camion` extends `Auto`

**Propiedades adicionales:**
- `capacidadCarga` (protected): capacidad en toneladas

**Constructor:**
- Recibe todos los parámetros de `Auto` + `capacidadCarga`
- Usa `super()` para inicializar la clase padre

**Métodos:**
- `getCapacidadCarga()`: retorna capacidad de carga
- `cargarMercaderia(peso: number)`: valida que el peso no exceda la capacidad

### Ejemplo de uso esperado:

```typescript
let auto = new Auto("Ford", 30000, 0, 100, 4, "automatica");
console.log(auto.getPuertas());        // 4
auto.abrirPuertas();                    // "Abriendo 4 puertas"

let moto = new Moto("Yamaha", 5000, 0, 100, 250);
moto.hacerCaballito();                  // "Haciendo caballito con moto de 250cc"

let camion = new Camion("Volvo", 150000, 0, 100, 2, "manual", 10);
camion.cargarMercaderia(8);            // ✅ Funciona
// camion.cargarMercaderia(15);        // ❌ Error: "Excede la capacidad"
```

---

## Ejercicio 3: Polimorfismo (35 puntos)

### Parte A: Polimorfismo con Interfaces

Crea una interface `Conducible` con el método:
- `conducir(distancia: number): void`

Haz que las clases `Auto`, `Moto` y `Camion` implementen esta interface.

**Comportamiento esperado:**
- `Auto`: "Conduciendo auto por carretera X km"
- `Moto`: "Conduciendo moto por ciudad X km"
- `Camion`: "Conduciendo camión por autopista X km"

### Parte B: Polimorfismo con Clases

Crea una clase base `VehiculoElectrico` que extienda `Vehiculo`:

**Propiedades adicionales:**
- `bateria` (protected): nivel de batería (0-100)

**Métodos:**
- `cargarBateria(cantidad: number)`: carga la batería hasta máximo 100
- `usarBateria(cantidad: number)`: reduce la batería

Crea dos clases hijas:
1. `AutoElectrico` extends `VehiculoElectrico`
   - Override `conducir()`: debe reducir batería en lugar de combustible (1 km = 0.05% batería)
   
2. `MotoElectrica` extends `VehiculoElectrico`
   - Override `conducir()`: debe reducir batería (1 km = 0.08% batería)

### Ejemplo de uso esperado:

```typescript
// Polimorfismo con interfaces
let vehiculos: Conducible[] = [
    new Auto("Toyota", 30000, 0, 100, 4, "automatica"),
    new Moto("Honda", 5000, 0, 100, 150),
    new Camion("Mercedes", 200000, 0, 100, 2, "manual", 15)
];

vehiculos.forEach(v => v.conducir(100));
// Debe mostrar diferentes mensajes según el tipo

// Polimorfismo con clases
let autoElectrico = new AutoElectrico("Tesla", 80000, 0, 100);
autoElectrico.conducir(50);  // Reduce batería, no combustible
console.log(autoElectrico.bateria);  // Debe mostrar nivel de batería reducido
```

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| **Ejercicio 1:** Encapsulación correcta, getters/setters funcionando, validaciones | 30 |
| **Ejercicio 2:** Herencia correcta, uso de `super()`, métodos adicionales | 35 |
| **Ejercicio 3:** Interfaces implementadas, polimorfismo funcionando, override correcto | 35 |
| **Total** | **100** |

### Puntos Adicionales (+10):
- Código bien comentado
- Validaciones adicionales creativas
- Métodos útiles adicionales

---

## Formato de Entrega

1. Crea un archivo `tarea.ts` con todas las clases
2. Crea un archivo `test.ts` con ejemplos de uso de todas las clases
3. Asegúrate de que el código compile sin errores (`tsc --noEmit`)

---

## Fecha de Entrega

[Indicar fecha según corresponda]

---

## Preguntas Frecuentes

**P: ¿Puedo agregar más métodos de los solicitados?**  
R: Sí, siempre que no contradigan los requisitos.

**P: ¿Debo usar `#` o `_` para propiedades privadas?**  
R: Puedes usar cualquiera, pero `_` es más común y compatible.

**P: ¿Qué pasa si no implemento todos los métodos?**  
R: Se descontarán puntos proporcionalmente según lo que falte.

¡Éxitos con la tarea! 🚗🏍️🚚

