# 🧪 Time Lab - Entorno de Desarrollo

Este proyecto utiliza Docker para garantizar un entorno de desarrollo idéntico entre máquinas.

## 🚀 Inicio Rápido

### 1. Preparar el entorno (Solo la primera vez o tras borrar volúmenes)
Si necesitas resetear permisos y dependencias:
```bash
docker compose down -v
docker compose run --rm -u root time-ui sh -c "chown -R time:time /app && su time -c 'npm install'"
```

### 2. Levantar el laboratorio
```bash
docker compose up
```
Acceso: [http://localhost:5173](http://localhost:5173)

## 🛠 Estructura
- **Vite + Vue 3**: Framework y empaquetador.
- **Tailwind CSS v4**: Estilos atómicos.
- **Docker**: Usuario 'time' (UID 1000) para evitar conflictos de permisos.
- **Volúmenes**: 'time_node_modules' para persistencia de dependencias.

