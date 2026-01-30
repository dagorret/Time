# TiNavigation TiTableLazy TiSelect TiButton TiInput TiLayout

## 1. `TiNavigation.vue` (El Módulo de Control)

Este es el "tablero de mandos" que aparece arriba de la tabla. Su función es capturar lo que el usuario quiere buscar y pasárselo a la aplicación.

### **¿Cómo se usa?**

Se coloca arriba de la tabla y se vincula a una variable de filtros.

Fragmento de código

```
<TiNavigation 
  v-model="filters" 
  :statusOptions="misOpciones" 
  :show-search="true" 
/>
```

### **Variables (Props)**

- **`v-model` (Obligatorio):** Un objeto que debe tener `{ search, status }`. Es donde se guardan los cambios.

- **`statusOptions`:** La lista de estados (ej: Activo, Inactivo) para el desplegable.

- **`showFilter` / `showSearch`:** Interruptores (Booleanos) para mostrar u ocultar el buscador o el selector de estado.

### **Métodos expuestos**

- **`resetFilters`:** Se activa al pulsar "Limpiar". Devuelve el buscador a blanco (`''`) y el estado a `null`.

---

## 2. `TiTableLazy.vue` (El Motor de Datos)

Es la pieza más compleja. No carga todos los datos de golpe (eso mataría la memoria), sino que pide "rebanadas" de 10 en 10.

### **¿Cómo se usa?**

Necesita saber de dónde sacar los datos y qué columnas mostrar.

Fragmento de código

```
<TiTableLazy 
  api-url="/mi-json.json" 
  :filters="filters" 
  :columns="misColumnas" 
/>
```

### **Variables (Props)**

- **`apiUrl`:** La ruta al archivo JSON o API.

- **`filters`:** El objeto que viene de `TiNavigation`. La tabla lo "vigila": si el filtro cambia, la tabla se refresca sola.

- **`columns`:** Array de objetos que define las columnas (ej: `{ field: 'id', header: 'ID' }`).

### **Lógica Interna (Watchers)**

- **Vigilante de Filtros:** Tiene un `watch` que, al detectar que escribiste algo en el buscador, resetea la tabla a la página 1 y pide datos nuevos al servidor.

---

## 3. `TiSelect.vue` (El Selector Inteligente)

Es un envoltorio (wrapper) del componente de PrimeVue, ajustado para que no ensucie tus datos.

### **¿Cómo se usa?**

Fragmento de código

```
<TiSelect v-model="filters.status" :options="opciones" />
```

### **Variables (Props)**

- **`optionLabel`:** Qué texto mostrar (por defecto 'label').

- **`optionValue`:** Qué valor guardar (por defecto 'value'). Esto es clave porque permite que guardes `"Activo"` en lugar de un objeto pesado `{label: 'Activo', value: 'Activo'}`.

### **Métodos expuestos**

- **`handleChange`:** Se dispara cuando eliges una opción. Emite el valor limpio hacia el padre.

---

## 4. `TiInput.vue` (El Buscador)

Un campo de texto estilizado que usa la nueva tecnología de Vue 3.4.

### **¿Cómo se usa?**

Fragmento de código

```
<TiInput v-model="filters.search" placeholder="Buscar..." />
```

### **Detalle Técnico**

- **`defineModel`:** No necesita métodos complicados. La sincronización es nativa y automática. Si escribes una letra, el padre ya la tiene.

---

## 5. `TiButton.vue` (El Botón Atómico)

La pieza más simple, encargada de ejecutar acciones.

### **Variables (Props)**

- **`label`:** El texto del botón.

- **`variant`:** Puede ser `primary` (azul sólido) o `outline` (borde transparente).

### **Métodos expuestos**

- **`click`:** Pasa el evento de clic directamente hacia afuera para que puedas usar `@click` como en un botón normal.

---

## 6. `TiLayout.vue` (El Marco del Sistema)

Es el contenedor que pone el logo, el nombre de usuario y el menú lateral (Sidebar).

### **¿Cómo se usa?**

Envuelve a toda tu aplicación.

Fragmento de código

```
<TiLayout title="TIMEADMIN">
  </TiLayout>
```

### **Variables (Props)**

- **`isSidebarOpen`:** Controla si el menú lateral se ve o se esconde (es una variable interna).

- **`navItems`:** La lista de iconos y nombres que aparecen en el menú de la izquierda.

---

### **Resumen de funcionamiento**

1. Escribes en **TiInput**.

2. **TiNavigation** actualiza la variable central `filters`.

3. **TiTableLazy** detecta el cambio, llama a la API y actualiza los registros en pantalla.

¿Hay alguna parte específica del código de estos archivos que te genere dudas?
