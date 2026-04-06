import multer from 'multer'

// Configurar el acceso en memoria para evitar archivos temporales en el servidor
const storage = multer.memoryStorage()

//filtro para aceptar solo imagenes
const fileFilter = (req, file, cb) => {
    // cb(error, success)
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    } else {
        cb(new Error('Solo se permiten imagenes'), false)
    }
}

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB por archivo
    fileFilter: fileFilter
});

export default upload