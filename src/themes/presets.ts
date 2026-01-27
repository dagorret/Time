// UBICACIÓN: src/themes/presets.ts
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

export const APP_THEMES = {
    TIME_DEFAULT: Aura,
    TIME_CLASSIC: Lara,
} as const;

// Aquí es donde "eliges" qué preset se exporta para toda la app
//export const SELECTED_PRESET = APP_THEMES.TIME_DEFAULT;
export const SELECTED_PRESET = APP_THEMES.TIME_DEFAULT;