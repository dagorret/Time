// src/themes/presets.ts
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

export const APP_THEMES = {
    MODERN: Aura,   // El cimiento para Tabler
    CLASSIC: Lara,  // El cimiento para el look anterior
} as const;

// Si estás trabajando en la rama Tabler, dejamos Aura por defecto:
export const SELECTED_PRESET = APP_THEMES.MODERN;