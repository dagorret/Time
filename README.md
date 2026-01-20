# 🚀 TIME OS - Documentación de Arquitectura y Roadmap

Este documento centraliza la visión técnica, el estado actual del desarrollo y las tareas pendientes para el ecosistema **TIME**, una interfaz de alto rendimiento orientada a la gestión masiva de datos.

## 🏗️ Estado de la Arquitectura (V3 Core)

Se ha consolidado el núcleo del sistema bajo estándares de "Grado Industrial", utilizando **Vue 3 (Composition API)** y la potencia de **Tailwind CSS 4**.

### Stack Tecnológico:
- **Framework:** Vue 3.5+ (Script Setup).
- **Estilos:** Tailwind CSS v4.0 (Motor de alto rendimiento con tokens nativos).
- **Componentes:** PrimeVue (Customized) + Lucide Icons.
- **Entorno:** Dockerizado sobre **Arch Linux (Bleeding Edge)** para asegurar versiones de Node.js 23.x nativas.

### Innovaciones Implementadas:
- **Sistema Bimodal:** Arquitectura de colores semántica (Abismo, Superficie, Elevación) con soporte nativo para `Dark` y `Light` mode mediante variables CSS puras.
- **TiTableLazy:** Motor de renderizado para tablas masivas con soporte de carga diferida (Lazy Loading) optimizado para datasets de +1,000,000 de registros.
- **Layout Adaptativo:** Header con `backdrop-blur` y Sidebar colapsable con persistencia de estado.

---

## 🛠️ Infraestructura & Docker (Lecciones Aprendidas)

- **Consistencia de Entorno:** Se migró de Debian Slim a **Arch Linux** en el contenedor de desarrollo para garantizar el acceso a Node 23 y NPM 10 sin fricciones de repositorios externos.
- **Optimización de Compilación:** Uso de la directiva `@reference` de Tailwind v4 en componentes SFC para evitar la duplicación de tokens y acelerar el HMR (Hot Module Replacement).
- **Fix de Orquestación:** Resolución de conflictos de red y permisos de usuario (`time:1000`) dentro del contenedor para garantizar que `node_modules` mantenga la integridad de permisos en el host Linux.

---

## 📋 Roadmap & Tareas Pendientes (TODO)

### 1. Design System (En Progreso)
- [x] **Tokenización Semántica:** Colores mapeados a variables base (Abismo, Identidad, Iluminación).
- [ ] **Tipografía Dinámica:** Implementar escala tipográfica fluida basada en variables de paso.

### 2. Integración de Datos
- [x] **Virtual Scrolling / Lazy Load:** Implementado en `TiTableLazy`.
- [ ] **Backend Link:** Conectar los eventos de la tabla (`onPage`, `onSort`) con el endpoint de Laravel mediante Axios o Fetch.
- [ ] **Filtros Globales:** Implementar búsqueda reactiva con debouncing para no saturar el servidor.

### 3. Perfil y Estado Global
- [ ] **Pinia Store:** Centralizar el estado de sesión del usuario y las preferencias de tema.
- [ ] **Active Router:** Vincular automáticamente la navegación del Sidebar con `vue-router`.

---

## 📅 Próximo Hito: 28 de Enero
*Finalización del flujo CRUD básico y estabilización del motor de tablas antes de la transición de fase.*

> **Nota del Arquitecto:** "La tecnología es el lienzo; si el pincel falla (Docker), se cambia el pincel, pero la obra (Lucy) continúa. La excelencia no es negociable."
