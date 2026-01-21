import { Auto } from "./Auto";
import { MotorDeCombustion } from "./MotorDeCombustion";
import { Chasis, Ruedas, TipoCombustible, TipoRueda } from "./partes";
import { Consecionario } from "./Concesionario";
import { MotorElectrico } from "./MotorElectrico";

// ARCHIVO: index.ts
// Este es el archivo principal que ejecuta y demuestra el funcionamiento
// del sistema de concesionario.
// Aquí se crean instancias de las clases y se prueban los métodos principales.

// Creamos instancias del concesionario
// Cada concesionario tiene su propio inventario independiente
let buenosAutos = new Consecionario()
let autosCacho = new Consecionario()

// Fabricamos autos usando el método fabricarAuto()
// Parámetros: motor, chasis, ruedas, precio, patente
buenosAutos.fabricarAuto(
    new MotorDeCombustion(TipoCombustible.NAFTA), // Motor de combustión con nafta
    new Chasis("negro"), // Chasis negro
    new Ruedas(15, TipoRueda.DEPORTIVA), // Ruedas rodado 15, tipo deportiva
    4000000, // Precio: 4 millones
    "1" // Patente: "1"
)

buenosAutos.fabricarAuto(
    new MotorElectrico(), // Motor eléctrico (no necesita parámetros, usa valores por defecto)
    new Chasis("gris"), // Chasis gris
    new Ruedas(17, TipoRueda.TODO_TERRENO), // Ruedas rodado 17, tipo todo terreno
    14000000, // Precio: 14 millones
    "2" // Patente: "2"
)

// Mostramos los autos disponibles antes de vender
console.log("autos disponibles antes de vender", buenosAutos.getAutosDisponibles)

// Vendemos el auto con patente "1"
buenosAutos.venderAuto("1")

// Mostramos los autos vendidos
console.log("autos vendidos", buenosAutos.getAutosVendidos)

// Mostramos los autos disponibles después de vender
console.log("autos disponibles despues de vender", buenosAutos.getAutosDisponibles)
