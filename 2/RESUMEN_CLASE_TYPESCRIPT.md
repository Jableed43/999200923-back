# 📚 Resumen: Primera Clase de TypeScript
## De Cero a Clases y OOP

---

## 🚀 Instalación y Configuración Inicial

### Paso 1: Instalar TypeScript Globalmente

Abre tu terminal (PowerShell, CMD, o Terminal) y ejecuta:

```bash
npm install -g typescript
```

Esto instala TypeScript de forma global en tu computadora, permitiéndote usar el comando `tsc` desde cualquier lugar.

**Verificar instalación:**
```bash
tsc --version
```

Deberías ver algo como: `Version 5.x.x`

---

### Paso 2: Configurar PowerShell (Solo Windows)

Si estás usando PowerShell en Windows y tienes problemas con la ejecución de scripts, ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Esto permite ejecutar scripts npm de forma segura.

**¿Qué hace esto?**
- Permite ejecutar scripts firmados remotamente
- Solo afecta a tu usuario actual (no requiere permisos de administrador)
- Es necesario para que npm pueda ejecutar scripts de paquetes instalados

---

### Paso 3: Instalar ts-node (Opcional pero Recomendado)

`ts-node` permite ejecutar archivos TypeScript directamente sin compilarlos primero.

```bash
npm i ts-node
```

O si prefieres instalarlo globalmente:

```bash
npm install -g ts-node
```

**¿Para qué sirve ts-node?**
- Ejecuta archivos `.ts` directamente: `ts-node archivo.ts`
- No necesitas compilar manualmente con `tsc`
- Ideal para desarrollo y aprendizaje

**Uso básico:**
```bash
# Con ts-node instalado localmente
npx ts-node index.ts

# Con ts-node instalado globalmente
ts-node index.ts
```

---

### Paso 4: Crear tu Primer Archivo TypeScript

1. Crea un archivo llamado `hola.ts`
2. Escribe tu primer código:

```typescript
let mensaje: string = "Hola TypeScript!";
console.log(mensaje);
```

3. Ejecuta el archivo:

```bash
# Opción 1: Con ts-node (recomendado)
npx ts-node hola.ts

# Opción 2: Compilar y ejecutar manualmente
tsc hola.ts        # Compila a hola.js
node hola.js       # Ejecuta el JavaScript
```

---

### Paso 5: Configurar TypeScript (tsconfig.json)

Crea un archivo `tsconfig.json` en tu carpeta de trabajo:

```bash
tsc --init
```

O crea manualmente un archivo `tsconfig.json` con la configuración básica:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**¿Qué hace tsconfig.json?**
- Configura cómo TypeScript compila tu código
- Define qué versión de JavaScript generar
- Activa verificaciones estrictas de tipos

---

## 📝 Resumen de Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm install -g typescript` | Instala TypeScript globalmente |
| `tsc --version` | Verifica la versión instalada |
| `tsc archivo.ts` | Compila TypeScript a JavaScript |
| `ts-node archivo.ts` | Ejecuta TypeScript directamente |
| `tsc --init` | Crea un tsconfig.json básico |
| `tsc --watch` | Compila automáticamente al guardar cambios |

---

## ✅ Verificación de Instalación

Ejecuta estos comandos para verificar que todo está instalado correctamente:

```bash
# Verificar TypeScript
tsc --version

# Verificar Node.js y npm
node --version
npm --version

# Verificar ts-node (si lo instalaste)
npx ts-node --version
```

Si todos los comandos muestran versiones, ¡estás listo para empezar! 🎉

---

## 🎯 ¿Qué es TypeScript?

**TypeScript** es un **superset de JavaScript** creado por Microsoft. Es una capa que añade características adicionales a JavaScript.

### Conceptos Clave:

#### 1. **Superset de JavaScript**
- Cualquier código de JavaScript es válido como código de TypeScript
- Puedes usar TypeScript gradualmente en proyectos JavaScript existentes
- TypeScript extiende JavaScript, no lo reemplaza

#### 2. **Tipado Estático (Opcional)**
- Hace falta definir tipos en el momento de escribir el código
- Tipos en variables: `let edad: number = 25`
- Tipos en parámetros: `function sumar(a: number, b: number)`
- Tipos en retorno de funciones: `function obtenerNombre(): string`
- El tipado es **opcional**, puedes usar `any` cuando necesites flexibilidad

#### 3. **Transpilación**
- Proceso en el cual TypeScript se convierte a JavaScript y luego se ejecuta
- TypeScript no se ejecuta directamente, primero se transpila a JavaScript
- El código JavaScript resultante es el que realmente se ejecuta

### ¿Por qué existe TypeScript?

#### Problemas que resuelve:

1. **Errores en los tipos**
   - En JavaScript, los errores de tipo sucedían en tiempo de ejecución
   - TypeScript detecta estos errores antes de ejecutar el código

2. **Mantenibilidad y escalabilidad**
   - Mejora significativamente la mantenibilidad del código
   - Facilita el trabajo en proyectos grandes y complejos
   - Los tipos actúan como documentación viva del código

3. **Experiencia del desarrollador**
   - Mejora al tener los tipos de forma explícita
   - Autocompletado más inteligente en editores
   - Refactorización más segura

---

## ⚖️ Ventajas y Desventajas de TypeScript

### ✅ Ventajas:

1. **Detección temprana de errores**
   - Durante la transpilación, antes de que lleguen a producción
   - Reduce bugs en producción
   - Ahorra tiempo de depuración

2. **Mantenibilidad, escalabilidad y legibilidad**
   - Los tipos funcionan como documentación
   - Código más fácil de entender para otros desarrolladores
   - Facilita el trabajo en equipo

3. **Adopción de características modernas de JavaScript**
   - Por compatibilidad con navegadores antiguos
   - Puedes usar características modernas que se transpilan a versiones anteriores

### ❌ Desventajas:

1. **Curva de aprendizaje inicial**
   - Requiere cambio de mentalidad
   - De pensar solo en lógica a añadirle también los tipos
   - Puede ser abrumador al principio

2. **Tiempo de transpilación**
   - Añade tiempo extra al proceso de desarrollo
   - En proyectos grandes puede ser significativo
   - Requiere configuración adicional

3. **Configuración inicial**
   - Necesitas configurar `tsconfig.json`
   - Puede ser complejo para principiantes
   - Requiere entender las opciones de compilación

4. **Verbosidad potencial**
   - Se escribe más código para llegar a un resultado
   - Sin embargo, compensa con claridad y seguridad
   - Los tipos pueden hacer el código más largo

---

## 🔄 TypeScript vs JavaScript

### Comparación Detallada:

| Característica | JavaScript | TypeScript |
|----------------|------------|------------|
| **Tipado** | Dinámico (se determina en ejecución) | Estático opcional (se define antes de ejecutar) |
| **Detección de errores** | En ejecución (runtime) | En compilación (compile-time) |
| **Legibilidad** | Depende de documentación y comentarios | Bien gracias a los tipos (tipos como documentación) |
| **Ejecución** | Interpretado directamente | Transpilado a JavaScript primero |
| **Flexibilidad** | Muy flexible (puede causar errores) | Menos flexible pero más seguro |
| **Curva de aprendizaje** | Más fácil al inicio | Requiere aprender tipos |
| **Mantenibilidad** | Puede ser difícil en proyectos grandes | Mejor para proyectos grandes |

### Ejemplo Comparativo:

```javascript
// JavaScript - No sabemos qué tipo es 'edad'
let edad = 25;
edad = "veinticinco"; // ✅ Funciona (pero puede causar errores en ejecución)

// TypeScript - Definimos el tipo explícitamente
let edad: number = 25;
edad = "veinticinco"; // ❌ Error: detectado en compilación, antes de ejecutar
```

### ¿Cuándo usar cada uno?

**Usa JavaScript cuando:**
- Proyectos pequeños y simples
- Prototipos rápidos
- No necesitas la seguridad de tipos

**Usa TypeScript cuando:**
- Proyectos grandes y complejos
- Trabajo en equipo
- Necesitas detectar errores temprano
- Quieres mejor mantenibilidad

---

## 1️⃣ Tipos Básicos en TypeScript

### Tipos Primitivos:

```typescript
// Números
let edad: number = 25;
let precio: number = 99.99;

// Texto (strings)
let nombre: string = "Juan";
let mensaje: string = `Hola ${nombre}`;

// Booleanos (verdadero/falso)
let esActivo: boolean = true;
let tienePermiso: boolean = false;

// Indefinido y Nulo
let valor: undefined = undefined;
let dato: null = null;
```

### Inferencia de Tipos (TypeScript puede adivinar el tipo):

```typescript
// TypeScript infiere que 'edad' es number
let edad = 25;  // Es lo mismo que: let edad: number = 25;

// TypeScript infiere que 'nombre' es string
let nombre = "María";  // Es lo mismo que: let nombre: string = "María";
```

---

## 2️⃣ Arrays y Objetos

### Arrays (Listas):

```typescript
// Array de números
let numeros: number[] = [1, 2, 3, 4, 5];

// Array de strings
let nombres: string[] = ["Ana", "Luis", "María"];

// Array genérico (otra forma de escribirlo)
let edades: Array<number> = [20, 25, 30];
```

### Objetos:

```typescript
// Objeto con tipos definidos
let persona: {
    nombre: string;
    edad: number;
    activo: boolean;
} = {
    nombre: "Juan",
    edad: 25,
    activo: true
};
```

---

## 3️⃣ Funciones con Tipos

### Funciones básicas:

```typescript
// Función que recibe parámetros tipados y retorna un tipo
function sumar(a: number, b: number): number {
    return a + b;
}

let resultado: number = sumar(5, 3); // resultado = 8
```

### Funciones sin retorno:

```typescript
// void = no retorna nada
function saludar(nombre: string): void {
    console.log(`Hola ${nombre}`);
}

saludar("María"); // Imprime: "Hola María"
```

---

## 4️⃣ Introducción a las Clases

### ¿Qué es una Clase?

Una **clase** es una plantilla para crear objetos. Define:
- **Propiedades**: Datos que tendrá el objeto
- **Métodos**: Acciones que puede realizar el objeto

### Ejemplo Simple:

```typescript
// Definimos la clase
class Persona {
    // Propiedades (variables del objeto)
    nombre: string;
    edad: number;

    // Constructor (se ejecuta al crear el objeto)
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // Método (función del objeto)
    presentarse(): void {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
    }
}

// Crear un objeto (instancia) de la clase
let juan = new Persona("Juan", 25);
juan.presentarse(); // Imprime: "Hola, soy Juan y tengo 25 años"
```

### Partes de una Clase explicadas:

1. **`class NombreClase`**: Define la clase
2. **Propiedades**: Variables que almacenan datos (`nombre: string`)
3. **`constructor()`**: Método especial que se ejecuta al crear el objeto
4. **`this`**: Referencia al objeto actual
5. **Métodos**: Funciones que pertenecen a la clase

---

## 5️⃣ Clases con Ejemplo Real: Planeta

### Ejemplo Completo:

```typescript
class Planeta {
    // 1. PROPIEDADES (Atributos)
    // Definimos qué datos tendrá cada planeta
    nombre: string;
    masaKg: number;
    radioKm: number;
    tieneAtmosfera: boolean;

    // 2. CONSTRUCTOR
    // Se ejecuta cuando creamos un nuevo planeta
    // Recibe los datos iniciales y los asigna a las propiedades
    constructor(nombre: string, masaKg: number, radioKm: number, tieneAtmosfera: boolean) {
        this.nombre = nombre;
        this.masaKg = masaKg;
        this.radioKm = radioKm;
        this.tieneAtmosfera = tieneAtmosfera;
    }

    // 3. MÉTODOS
    // Funciones que el planeta puede realizar
    calcularVolumen(): number {
        return (4 / 3) * Math.PI * Math.pow(this.radioKm, 3);
    }

    mostrarInfo(): void {
        console.log(`Planeta: ${this.nombre}`);
        console.log(`Masa: ${this.masaKg} kg`);
        console.log(`Radio: ${this.radioKm} km`);
        console.log(`Tiene atmósfera: ${this.tieneAtmosfera}`);
    }
}

// Crear planetas
let saturno = new Planeta("Saturno", 200, 200, true);
let marte = new Planeta("Marte", 100, 150, false);

// Usar los métodos
saturno.mostrarInfo();
console.log(`Volumen de Saturno: ${saturno.calcularVolumen()} km³`);
```

### ¿Por qué usar clases?

- **Organización**: Agrupa datos y funciones relacionadas
- **Reutilización**: Crear muchos objetos del mismo tipo
- **Mantenimiento**: Más fácil de entender y modificar

---

## 6️⃣ Modificadores de Acceso (Básico)

### ¿Qué son?

Los modificadores controlan **quién puede acceder** a las propiedades y métodos.

### Tipos básicos:

```typescript
class Ejemplo {
    public nombre: string;        // ✅ Accesible desde cualquier lugar
    private secreto: string;      // 🔒 Solo dentro de esta clase
    protected protegido: string;  // 🛡️ Clase y clases hijas
    readonly constante: string;   // 📌 Solo lectura (no se puede cambiar)
}
```

### Ejemplo Práctico:

```typescript
class PlanetaConAcceso {
    public readonly nombre: string;  // Todos pueden leer, nadie puede cambiar
    private _masaKg: number;         // Solo la clase puede acceder

    constructor(nombre: string, masaKg: number) {
        this.nombre = nombre;
        this._masaKg = masaKg;
    }

    // Método público para acceder a la propiedad privada
    public getMasa(): number {
        return this._masaKg;
    }
}

let marte = new PlanetaConAcceso("Marte", 6000);

console.log(marte.nombre);     // ✅ Funciona (público)
console.log(marte.getMasa());  // ✅ Funciona (método público)
// console.log(marte._masaKg); // ❌ Error (privado, no accesible)
```

### ¿Por qué usar modificadores?

- **Seguridad**: Proteger datos importantes
- **Control**: Decidir qué se puede ver y modificar
- **Organización**: Separar lo público de lo privado

---

## 7️⃣ Herencia (`extends`) - Concepto Básico

### ¿Qué es la Herencia?

Una clase **hija** hereda (recibe) todas las propiedades y métodos de la clase **padre**.

### Analogía:
- **Clase Padre**: Vehículo (tiene ruedas, motor)
- **Clase Hija**: Auto (hereda ruedas y motor, pero añade volante)

### Ejemplo Simple:

```typescript
// CLASE PADRE
class Vehiculo {
    acelerar(): void {
        console.log('El vehículo acelera');
    }
}

// CLASE HIJA (hereda de Vehiculo)
class AutoDeportivo extends Vehiculo {
    // Hereda el método acelerar()
    // Y añade su propio método
    usarTurbo(): void {
        console.log("Activa el turbo");
    }
}

let miAuto = new AutoDeportivo();
miAuto.acelerar();    // ✅ Heredado de Vehiculo
miAuto.usarTurbo();   // ✅ Propio de AutoDeportivo
```

### Ejemplo con Planetas:

```typescript
// CLASE PADRE
class PlanetaConAcceso {
    protected radioKm: number;  // protected = accesible en clases hijas

    constructor(radioKm: number) {
        this.radioKm = radioKm;
    }
}

// CLASE HIJA
class PlanetaConSatelites extends PlanetaConAcceso {
    satelites: string[];

    constructor(radioKm: number, satelites: string[]) {
        super(radioKm);  // Llama al constructor del padre
        this.satelites = satelites;
        // Puede usar radioKm porque es protected
        console.log(`El radio es ${this.radioKm}`);
    }
}

let jupiter = new PlanetaConSatelites(69111, ["io", "europa", "ganimedes"]);
```

### Palabra clave `super`:
- Llama al constructor de la clase padre
- Debe ser la primera línea del constructor hijo

---

## 8️⃣ Interfaces (`implements`) - Concepto Básico

### ¿Qué es una Interface?

Un **contrato** que define qué métodos y propiedades debe tener una clase.

### Diferencia importante:

| `extends` | `implements` |
|-----------|--------------|
| **Hereda código** | **Garantiza estructura** |
| Reutiliza implementación | Cumple un contrato |
| "Es un tipo de..." | "Debe tener..." |

### Ejemplo Simple:

```typescript
// INTERFACE = Contrato
interface Conducible {
    conducir(): void;  // Cualquier clase que implemente esto DEBE tener conducir()
}

// La clase PROMETE tener el método conducir()
class Auto implements Conducible {
    conducir(): void {
        console.log('El auto se conduce por tierra');
    }
}

class Avion implements Conducible {
    conducir(): void {
        console.log("El avion se conduce por aire");
    }
}

// Ambas clases tienen conducir(), pero lo hacen diferente
let miAuto = new Auto();
let miAvion = new Avion();

miAuto.conducir();   // "El auto se conduce por tierra"
miAvion.conducir();  // "El avion se conduce por aire"
```

---

## 9️⃣ Clases Abstractas - Concepto Básico

### ¿Qué es una Clase Abstracta?

Una clase que **NO se puede instanciar** directamente. Sirve como base para otras clases.

### Características:

- Puede tener métodos **abstractos** (sin código, solo la firma)
- Puede tener métodos **concretos** (con código completo)
- Las clases hijas **deben** implementar los métodos abstractos

### Ejemplo:

```typescript
// CLASE ABSTRACTA (no se puede crear directamente)
abstract class CuerpoCelesteAbstracto {
    public nombre: string;
    protected masaKg: number;

    constructor(nombre: string, masaKg: number) {
        this.nombre = nombre;
        this.masaKg = masaKg;
    }

    // MÉTODO ABSTRACTO (sin código, solo la firma)
    abstract describirDetalles(): string;

    // MÉTODO CONCRETO (con código completo)
    describirse(): string {
        return `El cuerpo celeste ${this.nombre} tiene una masa de ${this.masaKg} kg`;
    }
}

// CLASE HIJA (debe implementar describirDetalles())
class PlanetaHijo extends CuerpoCelesteAbstracto {
    public radioKm: number;

    constructor(nombre: string, masaKg: number, radioKm: number) {
        super(nombre, masaKg);
        this.radioKm = radioKm;
    }

    // IMPLEMENTACIÓN OBLIGATORIA del método abstracto
    describirDetalles(): string {
        return `Soy el planeta ${this.nombre} con un radio de ${this.radioKm} km`;
    }
}

// ✅ Correcto: crear un PlanetaHijo
let tierra = new PlanetaHijo("Tierra", 200, 200);

// ❌ Error: no se puede crear CuerpoCelesteAbstracto directamente
// let cuerpo = new CuerpoCelesteAbstracto("Sol", 1000);
```

---

## 🔟 Utility Types (Tipos Utilitarios) - Concepto Básico

### ¿Qué son?

Tipos que permiten crear nuevos tipos a partir de otros existentes.

### `Pick` - Tomar propiedades específicas:

```typescript
// Interface completa
interface CuerpoCelesteCompleto {
    nombre: string;
    masaKg: number;
    radioKm: number;
    tieneAtmosfera: boolean;
}

// Crear un tipo que solo tiene 'nombre' y 'masaKg'
type CuerpoCelesteBasico = Pick<CuerpoCelesteCompleto, 'nombre' | 'masaKg'>;

// Ahora solo necesitamos nombre y masaKg
const solBasico: CuerpoCelesteBasico = {
    nombre: "Sol",
    masaKg: 199999999
};
```

### `Omit` - Omitir propiedades específicas:

```typescript
// Crear un tipo que tiene todo EXCEPTO 'codigo'
type CuerpoCelesteSinCodigo = Omit<CuerpoCelesteCompleto, 'codigo'>;

const solSinCodigo: CuerpoCelesteSinCodigo = {
    nombre: "Solcito",
    masaKg: 2000000,
    radioKm: 5000,
    tieneAtmosfera: false
    // No necesitamos 'codigo'
};
```

---

## 📋 Resumen Progresivo

### Nivel 1: Fundamentos
- ✅ Tipos básicos (`number`, `string`, `boolean`)
- ✅ Arrays y objetos
- ✅ Funciones con tipos

### Nivel 2: Clases Básicas
- ✅ Definir clases
- ✅ Propiedades y constructores
- ✅ Métodos

### Nivel 3: Encapsulación
- ✅ Modificadores de acceso (`public`, `private`, `protected`, `readonly`)
- ✅ Proteger datos

### Nivel 4: Herencia
- ✅ `extends` para heredar código
- ✅ `super` para llamar al padre

### Nivel 5: Contratos
- ✅ `implements` para cumplir interfaces
- ✅ Clases abstractas

### Nivel 6: Tipos Avanzados
- ✅ Utility Types (`Pick`, `Omit`)

---

## 🎓 Conceptos Clave para Recordar

### Programación Orientada a Objetos (OOP):

1. **Abstracción**: Ocultar la complejidad, mostrar solo lo necesario
2. **Encapsulación**: Proteger datos con modificadores de acceso
3. **Herencia**: Reutilizar código con `extends`
4. **Polimorfismo**: Diferentes clases pueden implementar la misma interface

### Palabras Clave:

- **`class`**: Define una clase
- **`constructor`**: Método especial que inicializa el objeto
- **`this`**: Referencia al objeto actual
- **`extends`**: Herencia (hereda código)
- **`implements`**: Implementa interface (cumple contrato)
- **`abstract`**: Clase o método que no puede instanciarse directamente
- **`public`**, **`private`**, **`protected`**, **`readonly`**: Modificadores de acceso
- **`super`**: Accede a la clase padre

---

## 🎯 Actividades Prácticas Sugeridas

### Nivel 1: Tipos Básicos
1. Crear variables con diferentes tipos (`number`, `string`, `boolean`)
2. Crear arrays de diferentes tipos
3. Crear funciones que reciban y retornen tipos específicos

### Nivel 2: Clases Básicas
1. Crear una clase `Persona` con nombre y edad
2. Añadir un método `saludar()` que imprima el nombre
3. Crear varias instancias de `Persona`

### Nivel 3: Modificadores
1. Crear una clase `CuentaBancaria` con saldo privado
2. Crear métodos públicos para depositar y retirar
3. Proteger el saldo de modificaciones directas

### Nivel 4: Herencia
1. Crear clase `Animal` con método `hacerSonido()`
2. Crear clases `Perro` y `Gato` que extiendan `Animal`
3. Cada una debe hacer su sonido característico

### Nivel 5: Interfaces
1. Crear interface `Volador` con método `volar()`
2. Crear clases `Pajaro` y `Avion` que implementen `Volador`
3. Cada una debe volar de forma diferente

---

## 📝 Notas Importantes

- TypeScript se **compila** a JavaScript antes de ejecutarse
- Los tipos ayudan a **detectar errores** antes de ejecutar
- `extends` = hereda código, `implements` = cumple contrato
- Las clases abstractas **no se pueden instanciar**
- Los modificadores de acceso ayudan a **encapsular** y proteger datos
- `this` siempre se refiere al objeto actual
- `super` se usa para acceder a la clase padre

---

## 🔗 Próximos Temas

- Tipos genéricos (`Generics`)
- Decoradores (`Decorators`)
- Tipos avanzados (Union `|`, Intersection `&`)
- Módulos y namespaces
- Enums (Enumeraciones)

---

**¡Bienvenidos a TypeScript! 🚀**

*Recuerda: La práctica hace al maestro. Empieza con lo básico y ve avanzando gradualmente.*
