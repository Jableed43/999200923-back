// Polimorfismo -> muchas formas
// Polimorfismo con interfaces -> Implements
// la diferencia con clase, es que la interface NO tiene implementacion
interface Vehiculo{
    conducir(): void
}

// Auto, moto, lancha, avion
// Implements aplica un contrato de interface a una clase
class Auto implements Vehiculo{
    conducir(): void {
        console.log("Conduce por carretera")
    }
}

class Moto implements Vehiculo{
    conducir(): void {
        console.log("Conduce por tierra")
    }
}

class Avion implements Vehiculo{
    conducir(): void {
        console.log("Conduce por aire")
    }
}

class Barco implements Vehiculo{
    conducir(): void {
        console.log("Conduce por agua")
    }
}

// Polimorfismo con clases -> Extends 
// override, sobreescritura de metodos
// la diferencia con interface, es que la clase animal si tiene implementacion
// podemos reescribir la implementacion
class Animal {
    hacerSonido(): void{
        console.log("Hace un sonido")
    }
}

class Perro extends Animal{
    hacerSonido(): void {
        console.log("Guau guau")
    }
}

class Gato extends Animal{
    hacerSonido(): void {
        console.log("Miau miau")
    }
}