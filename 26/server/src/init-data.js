import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Configuración de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKUP_DIR = path.join(__dirname, '../temp_backup');
const SEEDER_PATH = path.join(__dirname, 'seeder.js');

// Configuración de conexiones
const LOCAL_DB_URI = "mongodb://localhost:27017/turnos-923"; // Tu DB local antigua
const DOCKER_DB_URI = "mongodb://admin:secret@localhost:27018/turnos-pro?authSource=admin";

const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        return false;
    }
};

const initData = async () => {
    console.log('🚀 Iniciando proceso de carga de datos...');

    // 1. Intentar hacer dump de la base local antigua
    console.log(`\n--- Intento 1: Migración desde DB Local (${LOCAL_DB_URI}) ---`);
    
    // Limpiamos carpeta temporal si existe
    if (fs.existsSync(BACKUP_DIR)) {
        fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
    }

    const dumpSuccess = runCommand(`mongodump --uri="${LOCAL_DB_URI}" --out="${BACKUP_DIR}"`);

    if (dumpSuccess && fs.existsSync(BACKUP_DIR) && fs.readdirSync(BACKUP_DIR).length > 0) {
        console.log('✅ Dump local realizado con éxito. Restaurando en Docker...');
        
        const restoreSuccess = runCommand(`mongorestore --uri="${DOCKER_DB_URI}" --nsInclude="turnos-923.*" --nsFrom="turnos-923.*" --nsTo="turnos-pro.*" "${BACKUP_DIR}"`);
        
        if (restoreSuccess) {
            console.log('🎉 ¡Migración completada con éxito desde tu DB local!');
            process.exit(0);
        } else {
            console.error('❌ Error al restaurar. Posiblemente falta de herramientas o credenciales.');
        }
    } else {
        console.log('⚠️ No se encontró la base local o mongodump no está instalado.');
    }

    // 2. Fallback al Seeder si lo anterior falló o no existía la base
    console.log(`\n--- Intento 2: Carga de datos limpios vía Seeder.js ---`);
    
    try {
        const seedSuccess = runCommand(`node "${SEEDER_PATH}"`);
        if (seedSuccess) {
            console.log('✅ Seeder ejecutado correctamente.');
        } else {
            console.error('❌ Error al ejecutar el seeder.');
        }
    } catch (err) {
        console.error('❌ Fallo crítico al intentar cargar datos.');
    }

    // Limpieza
    if (fs.existsSync(BACKUP_DIR)) {
        fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
    }
};

initData();
