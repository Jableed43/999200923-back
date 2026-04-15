# Guía de Migración de Base de Datos a Docker

Esta guía explica cómo mover tus datos desde una instalación local de MongoDB (fuera de Docker) hacia el nuevo contenedor de este proyecto sin necesidad de instalar herramientas adicionales en Windows.

## El Comando Mágico

Si no tienes instaladas las herramientas de MongoDB (`mongodump` / `mongorestore`) en tu Windows, puedes ejecutar este comando que utiliza Docker como "puente" para realizar la migración completa en un solo paso:

URI docker para compass -> mongodb://admin:secret@localhost:27018/turnos-pro?authSource=admin

```bash
docker run --rm mongo:latest mongodump --uri="mongodb://host.docker.internal:27017/turnos-923" --archive | docker exec -i seprise_db mongorestore --archive --username admin --password secret --authenticationDatabase admin --nsFrom="turnos-923.*" --nsTo="turnos-pro.*"
```

## Explicación del comando

1.  **`docker run --rm mongo:latest`**: Levanta un contenedor temporal de MongoDB que trae el set de herramientas incorporado. La bandera `--rm` asegura que se borre al terminar.
2.  **`mongodump --uri="..."`**: Se conecta a tu base de datos antigua a través de `host.docker.internal` (una dirección especial para que Docker "salte" hacia tu Windows en el puerto 27017).
3.  **`--archive`**: En lugar de crear archivos sueltos, empaqueta todo el flujo de datos para enviarlo directamente por la "tubería" (`|`).
4.  **`docker exec -i seprise_db mongorestore`**: Recibe esos datos y los mete dentro del contenedor que ya tienes corriendo.
5.  **`--nsFrom` y `--nsTo`**: Estas banderas son fundamentales; renombran la base de datos antigua (`turnos-923`) a la nueva estructura del proyecto (`turnos-pro`) al vuelo.

## Requisitos para el éxito
*   **Docker Desktop** debe estar abierto y funcionando.
*   Tu servidor antiguo de MongoDB debe estar corriendo en Windows (puerto 27017).
*   El contenedor `seprise_db` de este proyecto debe estar encendido (`docker-compose up -d`).

---

> [!TIP]
> Si prefieres una carga de datos limpia (fresca), recuerda que también puedes usar el script de Node que preparamos: `npm run init-db` dentro de la carpeta `/server`.
