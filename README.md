# 🚀 TIME OS - Documentación de Arquitectura y Roadmap

Este documento centraliza la visión técnica del ecosistema **TIME**, una interfaz de alto rendimiento para gestión masiva de datos.

## 🏗️ Estado de la Arquitectura (V3 Core)

### Stack Tecnológico:
- **Framework:** Vue 3.5+ (Script Setup).
- **Estilos:** Tailwind CSS v4.0 (Motor nativo de alto rendimiento).
- **Componentes:** PrimeVue (Customized) + Lucide Icons.
- **Entorno:** Dockerizado sobre **Debian Slim** con Node.js 23.x y NPM 10.

### Innovaciones Implementadas:
- **TiTableLazy (v2):** Motor de renderizado con soporte para +1,000,000 de registros.
- **Filtro con Debounce:** Buscador global optimizado (800ms) para minimizar la carga en el servidor/simulación.
- **Sistema Bimodal:** Arquitectura de colores semántica (Abismo, Superficie, Elevación) con soporte nativo Dark/Light.

---

## 🛠️ Infraestructura & Docker (Lecciones Aprendidas)

- **Estabilización en Debian:** Se logró la integración de Node 23 en Debian Slim mediante la configuración manual de repositorios y GPG keys, manteniendo la estabilidad del entorno.
- **Optimización de UX:** Implementación de un sistema de "Debounce" manual para manejar el estado de carga (`loading`) sin interrumpir el flujo de escritura del usuario.

---

## 📋 Roadmap & Tareas Pendientes (TODO)

### 1. Integración de Datos (Próximo paso)
- [x] **Filtros Globales con Debounce:** Implementado y testeado a 800ms.
- [ ] **Conexión API Laravel:** Migrar de la simulación de `setTimeout` a peticiones reales de red (Axios/Fetch).
- [ ] **Sanitización de Datos:** Asegurar que el backend maneje el escape de caracteres en las búsquedas masivas.

### 2. UI/UX Avanzada
- [ ] **Skeleton Loaders:** Reemplazar o complementar el spinner de carga con estructuras de carga progresiva.
- [ ] **Acciones de Fila:** Menú contextual (Editar/Borrar) con tokens de jerarquía visual.

---

## 📅 Próximo Hito: 21 de Enero
*Migración del motor de simulación a servicios de datos reales.*

> **Nota del Arquitecto:** "La tecnología es el lienzo; si el pincel falla, se limpia y se sigue pintando. Lucy ya respira."`
