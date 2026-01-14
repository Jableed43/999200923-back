// Paradigmas de programacion
// Surgen de la necesidad de estructurar nuestras soluciones
// orden del codigo, archivos, de las soluciones
// logica de como organizar la logica y que sea escalable

// Programación Orientada a Objetos -> digitalizar elementos de la vida real y pasarlas a codigo
// Permite la creacion de "plantillas" o "contratos" que permiten la reutilizacion de codigo
// Ayuda con el orden y coherencia de nuestro codigo

// Clase
// plantilla o molde para crear objetos
// objeto literal -> tipo de dato
// objeto de poo -> el resultado de utilizar una clase (instancia)

// Ejemplo
// Soy un astronomo de la nasa y quiero digitalizar datos de los planetas
// Como digitalizamos en codigo?
// 1. Que tienen en comun todos estos elementos? y cuales de estos datos son relevantes? - Abstraccion
// 2. Que necesito que tengan estos elementos relacionados a mi sistema? - Relevamiento
// 3. En que tipo de dato puedo almacenar eso que tienen en comun? - Tipos de dato
// 4. Que comportamiento (funciones/ metodo) podrian tener estos elementos?  - Metodos
// 5. De que forma se puede hacer tan generica la definicion de clase que pueda ser reutilizada? - Generico - DRY

// La interface Persona me permite tener una base para otros actores de mi sistema (abstraccion)
// A su vez estos otros actores tienen sus diferencias (polimorfismo)

interface Persona {
    nombre: string;
    edad: number;
}

interface Socio {
    nombre: string;
    edad: number;
    numeroSocio: number;
}

interface Administrativo {
    nombre: string;
    edad: number;
    numeroAdministrativo: number;
    administrar(): void
}

interface Profesor {
    nombre: string;
    edad: number;
    numeroProfesor: number;
    darClases(): void
}