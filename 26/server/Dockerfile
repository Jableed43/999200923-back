# 1. Imagen base: node alpine es ligera y eficiente para producción
FROM node:alpine

# 2. Definir directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar package.json y package-lock.json primero
# Esto optimiza el build ya que solo se reinstalan dependencias si estos archivos cambian
COPY package*.json ./

# 4. Instalar las dependencias del proyecto
RUN npm install

# 5. Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# 6. Exponer el puerto en el que corre la app (coincide con el del código)
EXPOSE 3000

# 7. Definir el comando por defecto para arrancar la aplicación
CMD ["npm", "start"]
