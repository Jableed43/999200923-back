import { supabase } from "../config/supabase.js";

export const uploadImageToSupabase = async (file, bucketName) => {
  try {
    // Generamos un nombre unico para el archivo basado en el tiempo
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;
    const filePath = fileName;

    const { data, error } = await supabase.storage
      .from(bucketName)
      // filePath -> nombre de la imagen
      // file.buffer -> la imagen en codigo de bits
      // file.mimetype -> formato de la imagen "image/jpeg"
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false, // No sobrescribir
      });

    if (error) {
      console.error("Error al subir a supabase", error.message);
      throw error;
    }

    // Obtenemos la url de la descarga - considerar que debe ser un bucket publico
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error detallado en uploadImageToSupabase:", error);
    throw new Error("Error al subir la imagen a supabase storage");
  }
};
