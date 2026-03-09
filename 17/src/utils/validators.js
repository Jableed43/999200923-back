// Texto alfanumerico entre 6 a 12 caracteres, 
// una letra al menos, una mayuscula y una minuscula
// un numero al menos
export const isGoodPassword = (value) => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/
    // evalua el valor de la password y retorna un booleano
    return regex.test(value)
}