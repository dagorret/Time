# 🚀 TIME OS - Documentación de Arquitectura y Roadmap

Este documento centraliza la visión técnica, el estado actual del desarrollo y las tareas pendientes para el sistema **TIME**.

## 🏗️ Estado de la Arquitectura (Layout Maestro)

Se ha implementado el componente base `TiLayout.vue` bajo estándares de "Grado Industrial". El sistema utiliza **Vue 3 (Composition API)** y **Tailwind CSS 4**.

### Estructura de Componentes:
- **Contenedor Raíz:** Controla el fondo base (`#0f172a`) y el flujo vertical.
- **Header:** Barra fija superior (`sticky`) con desenfoque de fondo (`backdrop-blur`), logo dinámico y perfil de usuario.
- **Cuerpo Dinámico:** Un contenedor flexible que organiza el Sidebar y el Main Content.
- **Sidebar (Navegación):** Sistema colapsable animado mediante la variable reactiva `isSidebarOpen`. Implementa `slots` para inyección de menús.
- **Main Content:** Área de trabajo con scroll independiente y ancho máximo controlado (`max-w-7xl`) para legibilidad.

---

## 🛠️ Lecciones Técnicas (Docker & Entorno)

- **Persistencia en el "Estado del Arte":** Ante fallos en el despliegue, verificar siempre la coherencia de los scripts de orquestación.
- **Docker Fix:** Se identificó que el uso de `run` en lugar de `up` en ciertos scripts de automatización generaba conflictos en la creación del firewall y la red de contenedores.
- **Filosofía de Seguridad:** La seguridad debe gestionarse mediante permisos y privilegios mínimos (sandboxing), no mediante la restricción total de la integración.

---

## 📋 TODO-INMEDIATO (Próximos Pasos)

### 1. Design System (Prioridad Alta)
- [ ] **Tokenización de Colores:** Mover colores hardcodeados (como el azul oscuro `#0f172a`) a variables de Tailwind o CSS puro para permitir cambios globales instantáneos.
- [ ] **Configuración de Fuentes:** Asegurar que la familia `font-sans` esté correctamente vinculada en el archivo de configuración.

### 2. Navegación y Rutas
- [ ] **Vue Router:** Configurar el enrutador oficial para que el componente `TiLayout` sea la base de todas las vistas.
- [ ] **Active States:** Vincular la propiedad `active` de los `navItems` con la ruta actual de la URL automáticamente.

### 3. Módulos "Lucy" (Gestión de Datos)
- [ ] **TiTable.vue:** Crear el componente de tabla maestro para la visualización de datos administrativos.
- [ ] **Data Fetching:** Establecer el flujo de información desde el backend hacia los componentes de la interfaz.

### 4. Perfil y Estado Global
- [ ] **Store de Usuario:** Implementar (Pinia o estado reactivo) para que el nombre del usuario y el rol en el Header sean reales y no estáticos.

---

## 📅 Hito Próximo: 28 de Enero
*Revisión de consistencia del sistema antes de la pausa por compromisos médicos.*

> **Nota del Arquitecto:** "Si falla no puede detener mi arte, lo arreglo o modifico."