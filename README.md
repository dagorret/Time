# 🕒 Time OS - Dashboard

Este es el frontend del ecosistema **Time**, desarrollado con **Vue 3**, **Vite**, **Tailwind CSS** y optimizado para ejecutarse dentro de **Docker**.

## 🚀 Inicio Rápido

Para facilitar el desarrollo, hemos creado un script de acceso rápido llamado `ti`. No necesitas tener Node.js instalado en tu máquina local, solo Docker.

### Comandos disponibles

| Comando | Descripción |
| :--- | :--- |
| `./ti dev` | Inicia el servidor de desarrollo en `http://localhost:5173` con Hot Reload. |
| `./ti install [paquete]` | Instala dependencias (ej. `./ti install primeicons`). |
| `./ti build` | Genera la versión de producción en la carpeta `/dist`. |
| `./ti sh` | Entra a la terminal del contenedor para tareas manuales. |

---

## 🛠 Configuración del Entorno

### Requisitos
* Docker y Docker Compose.
* (Recomendado) Desactivar "Safe Write" o "Backup files before saving" en tu IDE para asegurar que el auto-refresco (HMR) funcione instantáneamente.

### ¿Por qué usamos el script `ti`?
El script utiliza el flag `--service-ports` de Docker Compose. Esto asegura que los puertos del contenedor se mapeen correctamente a tu máquina local (`localhost:5173`) solo mientras el proceso está activo, manteniendo tu sistema limpio.

### Estructura de archivos clave
* `docker-compose.yml`: Define la imagen y los volúmenes para persistir `node_modules`.
* `vite.config.ts`: Configurado con `usePolling` para detectar cambios de archivos a través de los volúmenes de Docker.
