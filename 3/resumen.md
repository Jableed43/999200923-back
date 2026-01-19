# Resumen Teórico - Pilares de POO en TypeScript

## 1. Abstracción

**Definición:** Ocultar complejidad, mostrar solo lo necesario. Separar las características esenciales de un objeto o idea para formar conceptos generales, dejando de lado detalles particulares.

**Características:**
- **Clases abstractas:** Definen estructura pero sin implementación
- **Interfaces:** Definen contratos sin implementación
- Permite enfocarse en qué hace un objeto, no en cómo lo hace internamente

**Ejemplo práctico - Mouse:**
- **Complejidad oculta (PRIVADO/PROTEGIDO):** Circuitos, componentes electrónicos
- **Lo necesario para utilizarlo (PUBLICO):** Botones, rueda, sensor

---

## 2. Encapsulación

**Definición:** Proteger datos de accesos no autorizados. Controlar cómo se accede y modifica la información de un objeto, ocultando detalles de implementación.

### Modificadores de Acceso

Los modificadores de acceso son palabras reservadas que definen el tipo de acceso a propiedades y métodos:

#### `public` (por defecto)
- Accesible desde cualquier lugar
- Permite lectura y escritura directa de las propiedades
- No requiere palabra clave explícita

#### `private`
- Solo se accede desde dentro de la clase
- Oculta detalles de la implementación
- Convención: usar prefijo `_` (ej: `_masaKg`)
- Alternativa: usar `#` para privacidad real en runtime

#### `protected`
- Se puede acceder desde dentro de la clase y sus clases hijas (subclases)
- Útil para herencia

#### `readonly`
- Solo de lectura
- Solo se asigna el valor una vez (declaración o constructor)
- No modificable después de la inicialización
- Garantiza inmutabilidad

### Getters y Setters

**Getters (`get`):** Traer, obtener, leer, recuperar un valor
- Se acceden como propiedades (sin paréntesis)
- Permiten agregar lógica al leer un valor
- Sintaxis: `get nombrePropiedad(): tipo { return ... }`

**Setters (`set`):** Definir, configurar, asignar un valor
- Se asignan como propiedades (usando `=`)
- Permiten validación antes de asignar
- No retornan valor (tipo `void`)
- Sintaxis: `set nombrePropiedad(valor: tipo) { ... }`

**Ventajas:**
- Sintaxis más natural (parecen propiedades normales)
- Validación automática en setters
- Cálculos dinámicos en getters
- Mantienen la encapsulación

**Ejemplo:**
```typescript
class Planeta {
    private _masaKg: number;
    
    get masaKg(): number {
        return this._masaKg;
    }
    
    set masaKg(nuevaMasa: number) {
        if(nuevaMasa <= 0) {
            throw new Error("La masa debe ser mayor a 0");
        }
        this._masaKg = nuevaMasa;
    }
}

// Uso:
let planeta = new Planeta("Tierra", 5000);
console.log(planeta.masaKg);  // Getter
planeta.masaKg = 6000;         // Setter
```

### Métodos Privados

- Solo accesibles desde dentro de la clase
- Reducen la complejidad de la clase expuesta al usuario
- Sirven para la lógica interna de funcionamiento
- Evitan que sean mal utilizados y "rompan" la clase

**Principio:** Al usuario que utiliza la clase no le importa cómo está construido el software, le importa para qué lo puede utilizar.

---

## 3. Herencia

**Definición:** Proceso de transmisión de información de padres a hijos, determinando características que se combinan para crear una combinación única en cada individuo, resultando en similitudes familiares pero también variaciones únicas.

**Características heredadas:**
- Propiedades
- Métodos
- Constructor (a través de `super()`)
- Modificadores de acceso

### Sintaxis

```typescript
class ClasePadre {
    // Propiedades y métodos
}

class ClaseHija extends ClasePadre {
    constructor(...) {
        super(...);  // Llama al constructor de la clase padre
        // Propiedades y métodos adicionales
    }
}
```

### Palabra clave `super`

- `super` representa a la superclase (clase padre)
- `super()` llama al constructor de la clase padre
- Debe llamarse antes de usar `this` en el constructor hijo

### Herencia Multinivel

Una clase hija puede ser superclase de otra clase:

```typescript
class CuerpoCeleste { }
class Estrella extends CuerpoCeleste { }
class EnanaBlanca extends Estrella { }
```

**Ventajas:**
- Reutilización de código
- Organización jerárquica
- Extensibilidad sin modificar código existente

---

## 4. Polimorfismo

**Definición:** Utilización de la misma información para crear diferentes clases. Mismo método pero diferentes comportamientos.

### Polimorfismo con Interfaces (`implements`)

- Las interfaces NO tienen implementación
- Definen un contrato que las clases deben cumplir
- Múltiples clases pueden implementar la misma interface
- Cada clase implementa el método según sus necesidades

**Ejemplo:**
```typescript
interface Vehiculo {
    conducir(): void;
}

class Auto implements Vehiculo {
    conducir(): void {
        console.log("Conduce por carretera");
    }
}

class Avion implements Vehiculo {
    conducir(): void {
        console.log("Conduce por aire");
    }
}
```

### Polimorfismo con Clases (`extends`)

- La clase padre SÍ tiene implementación
- Las clases hijas pueden reescribir (override) la implementación
- Se usa `extends` para heredar
- Permite personalizar el comportamiento heredado

**Ejemplo:**
```typescript
class Animal {
    hacerSonido(): void {
        console.log("Hace un sonido");
    }
}

class Perro extends Animal {
    hacerSonido(): void {  // Override
        console.log("Guau guau");
    }
}

class Gato extends Animal {
    hacerSonido(): void {  // Override
        console.log("Miau miau");
    }
}
```

**Diferencia clave:**
- **Interface (`implements`):** Contrato sin implementación
- **Clase (`extends`):** Herencia con implementación que puede ser sobrescrita

---

## 5. Composición (No es un pilar, pero es importante)

**Definición:** De varias clases/interfaces/types creamos una más compleja. Un objeto está compuesto por otros objetos.

**Ejemplo:**
```typescript
class Auto {
    marca: Marca;
    color: Color;
    nacionalidad: Pais;
}
```

La composición permite construir objetos complejos a partir de objetos más simples, promoviendo la reutilización y el diseño modular.

---

## Resumen de Conceptos Clave

| Concepto | Palabra Clave | Propósito |
|----------|---------------|-----------|
| **Encapsulación** | `private`, `protected`, `public`, `readonly` | Proteger datos y controlar acceso |
| **Getters/Setters** | `get`, `set` | Acceso controlado a propiedades privadas |
| **Herencia** | `extends`, `super` | Reutilizar código y crear jerarquías |
| **Polimorfismo (Interface)** | `implements` | Contrato sin implementación |
| **Polimorfismo (Clase)** | `extends` + override | Herencia con reescritura de métodos |
| **Composición** | Propiedades de tipo objeto | Construir objetos complejos |

---

## Buenas Prácticas

1. **Encapsulación:** Usa `private` para propiedades internas, expón solo lo necesario
2. **Getters/Setters:** Úsalos para propiedades privadas que necesitan acceso controlado
3. **Herencia:** Úsala cuando haya una relación "es-un" (ej: Perro ES-UN Animal)
4. **Composición:** Úsala cuando haya una relación "tiene-un" (ej: Auto TIENE-UNA Marca)
5. **Validación:** Siempre valida en setters antes de asignar valores
6. **Nombres:** Usa prefijo `_` para propiedades privadas (convención)