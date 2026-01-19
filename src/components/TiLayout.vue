<!--
/*************************************************************************************************
 * TI-LAYOUT (VUE COMPONENT)
 *
 * Propósito:
 * Este componente define la estructura visual principal de la aplicación, conocida como "layout".
 * Funciona como un contenedor maestro que organiza la cabecera (header), la barra lateral de
 * navegación (sidebar) y el área de contenido principal (main). Su diseño está pensado para ser
 * reutilizable en todas las páginas que compartan esta misma estructura.
 *
 *************************************************************************************************/
-->

<script setup lang="ts">
// =================================================================================================
// BLOQUE DE LÓGICA (SCRIPT SETUP)
//
// Propósito:
// Aquí reside toda la lógica del componente. Se importan las herramientas de Vue, se definen
// las "props" (datos que vienen de un componente padre), y se maneja el estado interno, como
// la visibilidad de la barra lateral.
// =================================================================================================
import { ref } from 'vue';

// =========================================================
// 1. DEFINICIÓN DE INTERFACES (Contratos de datos)
// =========================================================
// Define qué propiedades debe tener cada botón del menú.
// Esta interfaz asegura que cualquier objeto que se considere un "NavItem"
// deba tener estas propiedades, evitando errores y aportando claridad.
interface NavItem {
  label: string;  // Texto que ve el usuario en el botón.
  icon: string;   // Clase de PrimeIcons para el ícono (ej: 'pi pi-home').
  path: string;   // Ruta de navegación a la que apunta el enlace.
  active?: boolean; // Propiedad opcional para indicar si el enlace está activo (resaltado).
}

// =========================================================
// 2. PROPS (Parámetros que vienen del componente padre, como App.vue)
// =========================================================
// `defineProps` es una macro de Vue que declara las propiedades que este componente
// puede recibir desde su padre. Estos datos son "unidireccionales": fluyen desde
// el padre hacia este hijo, pero no al revés.
defineProps<{
  title?: string;      // Título opcional para mostrar en el header.
  userName?: string;   // Nombre opcional del usuario logueado.
  userRole?: string;   // Rol o cargo opcional del usuario.
  navItems?: NavItem[]; // Lista opcional de ítems de navegación para el sidebar.
}>();

// =========================================================
// 3. ESTADO REACTIVO (Variables de control interno)
// =========================================================
// `ref` crea una variable reactiva. Cuando su valor cambia, Vue detecta
// el cambio y actualiza automáticamente cualquier parte del template que la esté usando.
// Aquí, `isSidebarOpen` controla si la barra lateral está visible (`true`) u oculta (`false`).
const isSidebarOpen = ref(true);
</script>

<template>
  <!--
  /***********************************************************************************************
   * CONTENEDOR RAÍZ (DIV principal)
   *
   * Rol Jerárquico:
   * Es el padre de todos los elementos visuales del componente. Ocupa toda la altura de la
   * pantalla (`min-h-screen`) y establece el contexto para un layout de tipo flexbox en
   * dirección vertical (`flex flex-col`).
   *
   * Clases de Tailwind:
   * - `min-h-screen`: Asegura que el layout ocupe, como mínimo, el 100% de la altura de la ventana.
   * - `bg-ui-bg-base`: Define el color de fondo base para toda la aplicación.
   * - `text-tx-high`: Establece el color de texto de alta prominencia por defecto.
   * - `font-sans`: Aplica una fuente sans-serif estándar.
   * - `flex flex-col`: Convierte este div en un contenedor flexbox con sus hijos apilados verticalmente
   *   (el header arriba, el contenedor del cuerpo debajo).
   ***********************************************************************************************/
  -->
  <div class="min-h-screen bg-ui-bg-base text-tx-high font-sans flex flex-col">

    <!--
    /***********************************************************************************************
     * CABECERA (HEADER)
     *
     * Rol Jerárquico:
     * Es el primer hijo directo del contenedor raíz. Contiene el título de la página, el botón
     * para mostrar/ocultar el sidebar y la información del usuario.
     *
     * Clases de Tailwind:
     * - `h-14`: Fija la altura de la cabecera a 14 unidades (3.5rem).
     * - `border-b border-border-thin`: Añade un borde inferior sutil para separar del contenido.
     * - `bg-ui-bg-panel/50`: Color de fondo del panel, semitransparente.
     * - `backdrop-blur-md`: Efecto de desenfoque para el contenido que pasa por debajo (scroll).
     * - `flex items-center justify-between`: Lo convierte en un contenedor flex para alinear sus
     *   hijos horizontalmente, con los elementos centrados verticalmente y distribuidos
     *   en los extremos.
     * - `px-4`: Padding horizontal para que el contenido no toque los bordes.
     * - `sticky top-0 z-50`: Fija la cabecera en la parte superior de la pantalla durante el scroll
     *   y le da una alta prioridad de apilamiento (`z-50`) para que esté por encima de otros elementos.
     ***********************************************************************************************/
    -->
    <header class="h-14 border-b border-border-thin bg-ui-bg-panel/50 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">

      <!-- Contenedor para la sección izquierda del header (botón de menú y título) -->
      <div class="flex items-center gap-4">
        <!-- Botón que alterna el estado de `isSidebarOpen` al hacer clic -->
        <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 hover:bg-slate-800 rounded-lg text-tx-med">
          <i class="pi pi-bars text-xl"></i>
        </button>
        <!-- Contenedor para el logo y el título -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span class="font-black text-tx-high text-xs">T</span>
          </div>
          <span class="font-bold tracking-tight text-tx-high">{{ title || 'TIME' }}</span>
        </div>
      </div>

      <!-- Contenedor para la sección derecha del header (información de usuario) -->
      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-xs font-bold text-tx-high leading-none">Carlos Dagorret</p>
          <p class="text-[10px] text-tx-med uppercase tracking-widest">Architect</p>
        </div>
        <div class="w-9 h-9 rounded-full border-2 border-border-thin p-0.5">
          <div class="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-[10px] font-bold text-tx-high">
            CD
          </div>
        </div>
      </div>
    </header>

    <!--
    /***********************************************************************************************
     * CONTENEDOR DEL CUERPO PRINCIPAL
     *
     * Rol Jerárquico:
     * Es el segundo hijo del contenedor raíz. Ocupa todo el espacio vertical restante gracias a
     * `flex-1`. Contiene el `aside` (sidebar) y el `main` (contenido principal).
     *
     * Clases de Tailwind:
     * - `flex`: Lo convierte en un contenedor flex horizontal, colocando el sidebar y el main uno al lado del otro.
     * - `flex-1`: Hace que este div crezca para ocupar todo el espacio vertical disponible que
     *   dejó el header. Es clave para que el layout ocupe toda la pantalla.
     ***********************************************************************************************/
    -->
    <div class="flex flex-1">

      <!--
      /***********************************************************************************************
       * BARRA LATERAL (ASIDE)
       *
       * Rol Jerárquico:
       * Hijo del contenedor del cuerpo. Contiene la navegación principal de la aplicación.
       * Su visibilidad es controlada por la variable reactiva `isSidebarOpen`.
       *
       * Clases de Tailwind y Reactividad:
       * - `:class`: Enlaza clases de CSS dinámicamente.
       * - `border-r border-border-thin`: Borde derecho para separación.
       * - `bg-ui-bg-base`: Color de fondo base para el sidebar.
       * - `transition-all duration-300`: Anima todos los cambios de propiedades (como `width` y `opacity`)
       *   durante 300 milisegundos, creando un efecto de deslizamiento suave.
       * - `overflow-hidden`: Oculta el contenido que se desborda, crucial para la animación de cierre.
       * - `flex flex-col`: Organiza su contenido (navegación y pie de página) verticalmente.
       * - `isSidebarOpen ? 'w-64' : 'w-0 opacity-0'`: Este es el núcleo de la reactividad.
       *   - Si `isSidebarOpen` es `true`, aplica un ancho de 64 unidades (`w-64`).
       *   - Si `isSidebarOpen` es `false`, aplica un ancho de 0 (`w-0`) y lo hace invisible (`opacity-0`),
       *     lo que provoca la animación de ocultamiento.
       ***********************************************************************************************/
      -->
      <aside
          :class="[
          'border-r border-border-thin bg-ui-bg-base transition-all duration-300 overflow-hidden flex flex-col',
          isSidebarOpen ? 'w-64' : 'w-0 opacity-0'
        ]"
      >
        <!-- Contenedor de la navegación principal -->
        <nav class="p-4 flex-1 space-y-1">
          <!--
          /*****************************************************************************************
           * SLOT: sidebar
           *
           * Propósito:
           * Este es un punto de inyección de contenido. Permite que el componente padre
           * (ej. App.vue) inserte su propio HTML aquí. Si el padre no proporciona contenido
           * para este slot, se mostrará el contenido por defecto que está dentro de las etiquetas
           * <slot>, que en este caso es el menú principal generado con `v-for`.
           *****************************************************************************************/
          -->
          <slot name="sidebar">
            <div class="text-xs text-tx-med font-bold px-3 py-2 uppercase tracking-wider">Main Menu</div>
            <!-- Itera sobre la prop `navItems` para renderizar cada enlace del menú -->
            <div v-for="item in navItems" :key="item.path"
                 class="flex items-center gap-3 px-3 py-2 text-tx-med hover:bg-slate-800/50 hover:text-tx-high rounded-lg cursor-pointer transition-all">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </div>
          </slot>
        </nav>

        <!-- Pie de página del sidebar -->
        <div class="p-4 border-t border-border-thin text-[10px] text-tx-med text-center uppercase tracking-widest font-medium">
          Powered by Time UI
        </div>
      </aside>

      <!--
      /***********************************************************************************************
       * CONTENIDO PRINCIPAL (MAIN)
       *
       * Rol Jerárquico:
       * Hermano del `aside` e hijo del contenedor del cuerpo. Es el área donde se renderizará
       * el contenido específico de cada página (ej. un dashboard, un formulario, etc.).
       *
       * Clases de Tailwind:
       * - `flex-1`: Hace que `main` ocupe todo el espacio horizontal restante que no usa el `aside`.
       * - `bg-ui-bg-deep`: Un fondo más oscuro para el área de contenido principal.
       * - `relative`: Establece un contexto de posicionamiento para elementos hijos que usen `absolute`.
       * - `overflow-y-auto`: Si el contenido es más alto que la pantalla, añade una barra de scroll
       *   vertical solo a esta área, manteniendo el header y el sidebar fijos.
       ***********************************************************************************************/
      -->
      <main class="flex-1 bg-ui-bg-deep relative overflow-y-auto">
        <!-- Contenedor interno para padding y centrado del contenido -->
        <div class="p-6 lg:p-10 max-w-7xl mx-auto">
          <!--
          /*****************************************************************************************
           * SLOT: default
           *
           * Propósito:
           * Este es el slot por defecto. Cualquier contenido que se coloque directamente dentro
           * de las etiquetas `<TiLayout>` en el componente padre será inyectado aquí. Es el
           * punto principal para renderizar el contenido de cada página.
           *****************************************************************************************/
          -->
          <slot />
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
/*
 * NOTA DE ESTILO:
 * Gracias al uso de un framework "utility-first" como Tailwind CSS, la mayoría de los estilos
 * se aplican directamente en el HTML a través de clases. Esto reduce la necesidad de escribir
 * CSS personalizado. Este bloque `scoped` asegura que cualquier CSS escrito aquí solo afectaría
 * a este componente, evitando conflictos globales.
 */
</style>