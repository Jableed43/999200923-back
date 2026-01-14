# 🚀 Instructivo: Cómo Empezar con TypeScript

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:
- **Node.js** (versión 14 o superior)
- **npm** (viene con Node.js)

Para verificar que los tienes instalados, abre tu terminal y ejecuta:
```bash
node --version
npm --version
```

---

## 🔧 Paso 1: Instalar TypeScript

### Instalación Global (Recomendado)

Abre tu terminal (PowerShell, CMD, o Terminal) y ejecuta:

```bash
npm install -g typescript
```

Esto instala TypeScript de forma global en tu computadora.

### Verificar Instalación

```bash
tsc --version
```

Deberías ver algo como: `Version 5.x.x`

---

## ⚙️ Paso 2: Configurar PowerShell (Solo Windows)

Si estás usando PowerShell en Windows y tienes problemas con la ejecución de scripts, ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**¿Qué hace esto?**
- Permite ejecutar scripts npm de forma segura
- Solo afecta a tu usuario actual (no requiere permisos de administrador)
- Es necesario para que npm pueda ejecutar scripts de paquetes instalados

---

## 📦 Paso 3: Instalar ts-node (Opcional pero Recomendado)

`ts-node` permite ejecutar archivos TypeScript directamente sin compilarlos primero.

### Instalación Local (Recomendado para proyectos)

```bash
npm init -y
npm install ts-node
```

### Instalación Global (Alternativa)

```bash
npm install -g ts-node
```

**¿Para qué sirve ts-node?**
- Ejecuta archivos `.ts` directamente: `ts-node archivo.ts`
- No necesitas compilar manualmente con `tsc`
- Ideal para desarrollo y aprendizaje

---

## 📝 Paso 4: Crear tu Primer Archivo TypeScript

1. Crea un archivo llamado `hola.ts` en tu carpeta de trabajo

2. Escribe tu primer código TypeScript:

```typescript
let mensaje: string = "Hola TypeScript!";
console.log(mensaje);

let edad: number = 25;
let nombre: string = "Juan";

console.log(`Mi nombre es ${nombre} y tengo ${edad} años`);
```

3. Ejecuta el archivo:

**Opción A: Con ts-node (Recomendado)**
```bash
npx ts-node hola.ts
```

**Opción B: Compilar y ejecutar manualmente**
```bash
# Compilar TypeScript a JavaScript
tsc hola.ts

# Ejecutar el JavaScript generado
node hola.js
```

---

## ⚙️ Paso 5: Configurar TypeScript (tsconfig.json)

### Opción 1: Crear automáticamente

```bash
tsc --init
```

Esto crea un archivo `tsconfig.json` con configuración básica.

### Opción 2: Crear manualmente

Crea un archivo `tsconfig.json` en tu carpeta con este contenido:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "sourceMap": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

**¿Qué hace tsconfig.json?**
- Configura cómo TypeScript compila tu código
- Define qué versión de JavaScript generar
- Activa verificaciones estrictas de tipos
- Especifica qué archivos incluir/excluir

---

## 🎯 Paso 6: Verificar que Todo Funciona

Crea un archivo de prueba `prueba.ts`:

```typescript
// Tipos básicos
let nombre: string = "TypeScript";
let edad: number = 10;
let esGenial: boolean = true;

// Array
let lenguajes: string[] = ["JavaScript", "TypeScript", "Python"];

// Objeto tipado
interface Persona {
    nombre: string;
    edad: number;
}

let persona: Persona = {
    nombre: "Juan",
    edad: 25
};

// Función tipada
function saludar(nombre: string): string {
    return `Hola, ${nombre}!`;
}

// Clase básica
class Estudiante {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    presentarse(): string {
        return `Soy ${this.nombre} y tengo ${this.edad} años`;
    }
}

// Ejecutar código
console.log(saludar(nombre));
console.log(`Lenguajes: ${lenguajes.join(", ")}`);
console.log(`Persona: ${persona.nombre}, ${persona.edad} años`);

let estudiante = new Estudiante("María", 20);
console.log(estudiante.presentarse());
```

Ejecuta el archivo:

```bash
npx ts-node prueba.ts
```

**Salida esperada:**
```
Hola, TypeScript!
Lenguajes: JavaScript, TypeScript, Python
Persona: Juan, 25 años
Soy María y tengo 20 años
```

Si ves esta salida, ¡todo está funcionando correctamente! ✅

---

## 📚 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm install -g typescript` | Instala TypeScript globalmente |
| `tsc --version` | Verifica la versión de TypeScript |
| `tsc archivo.ts` | Compila TypeScript a JavaScript |
| `ts-node archivo.ts` | Ejecuta TypeScript directamente |
| `tsc --init` | Crea un tsconfig.json básico |
| `tsc --watch` | Compila automáticamente al guardar cambios |
| `tsc --noEmit` | Verifica tipos sin generar archivos |

---

## 🎓 Estructura de un Proyecto TypeScript Básico

```
mi-proyecto/
├── src/                    # Código fuente TypeScript
│   ├── index.ts
│   └── otros-archivos.ts
├── dist/                   # JavaScript compilado (generado automáticamente)
│   └── index.js
├── tsconfig.json          # Configuración de TypeScript
├── package.json           # Dependencias del proyecto
└── node_modules/          # Dependencias instaladas
```

---

## ✅ Checklist de Verificación

Antes de empezar a programar, verifica:

- [ ] Node.js está instalado (`node --version`)
- [ ] npm está instalado (`npm --version`)
- [ ] TypeScript está instalado globalmente (`tsc --version`)
- [ ] ts-node está instalado (`npx ts-node --version` o `npm install ts-node`)
- [ ] Puedes ejecutar un archivo `.ts` sin errores
- [ ] Tienes un `tsconfig.json` configurado

---

## 🐛 Solución de Problemas Comunes

### Error: "tsc no se reconoce como comando"
**Solución:** TypeScript no está instalado o no está en el PATH. Reinstala con `npm install -g typescript`

### Error: "Cannot find module 'ts-node'"
**Solución:** Instala ts-node: `npm install ts-node` o `npm install -g ts-node`

### Error: "Execution policy" en PowerShell
**Solución:** Ejecuta: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Error: "Cannot find name 'console'"
**Solución:** Agrega `"lib": ["ES2022", "DOM"]` en tu `tsconfig.json`

---

## 🎉 ¡Listo para Empezar!

Ahora estás listo para comenzar a programar en TypeScript. 

**Próximos pasos:**
1. Revisa los archivos de ejemplo de clase (`index.ts`, `Planeta.ts`, `poo.ts`)
2. Completa los ejercicios de la tarea práctica
3. Experimenta creando tus propios programas

**¡Éxitos aprendiendo TypeScript! 🚀**

---

## 📖 Recursos Adicionales

- [Documentación oficial de TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Prueba código online
- [ts-node en npm](https://www.npmjs.com/package/ts-node)

