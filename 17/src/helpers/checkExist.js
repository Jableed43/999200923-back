// Helper -> Es una funcion generica que se relaciona con llamados a servicios o con logica de nuestro sistema
// Para componetizar el exist:
// Modelo
// Definir si existe o no
// StatusCode
// Mensaje del error

// Pregunta clave, queres validar si existe o si no existe?
// Si queres validar existencia siempre es true
// Si queres validar no existencia siempre es false

export const checkModelExist = async (Model, query, shouldExist, statusCode, errorMessage) => {
    // Buscamos el documento o registro a ver si existe
     const document = await Model.findOne(query)

        // Si deberia existir y no existe
        if(shouldExist && !document){
            const error = new Error(errorMessage)
            error.statusCode = statusCode
            throw error
        }

       // No deberia existir y existe
            if(!shouldExist && document){
                const error = new Error(errorMessage)
                error.statusCode = statusCode
                throw error
            }

    // retornar documento encontrado o null si no lo encuentra
    return document
}