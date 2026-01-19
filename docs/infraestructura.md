# 🏗️ Time Infrastructure (Docker)

El entorno de desarrollo de **Time** está encapsulado en Docker para garantizar que el código de Carlos Dagorret funcione igual en cualquier PC (Portabilidad).

### El Contenedor: `time-ui`
- **Base:** `node:20-slim` (Una versión ligera y rápida de Node.js).
- **Directorio de Trabajo:** `/app` (Donde vive el código fuente).
- **Puertos:** - `5173`: Para el modo desarrollo (Vite Dev Server).
  - `4173`: Para previsualizar la librería construida (Vite Preview).

### Volumenes (Persistencia)
El código en tu carpeta local `~/work/Time` está "espejado" dentro del contenedor. 
- Si editas un archivo en tu PC, el contenedor lo ve al instante.
- Si el contenedor genera la carpeta `dist/`, aparecerá en tu PC automáticamente.

### Beneficio Arquitectónico
No necesitas tener Node.js, Vite o Tailwind instalado en tu sistema operativo Linux. Todo sucede dentro del "laboratorio" aislado.
