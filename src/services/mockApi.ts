export const mockTableApi = async (url: string, params: any) => {
    const response = await fetch(url);
    const result = await response.json();
    let data = result.data;

    // 1. Búsqueda Global (Search)
    if (params.search) {
        const s = params.search.toLowerCase();
        data = data.filter((item: any) =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(s)
            )
        );
    }

    // 2. Filtro por ESTADO (Vinculado a filters.status de App.vue)
    // Buscamos en item.estado porque así se llama en tu JSON
    if (params.status && params.status !== null) {
        // Si params.status es un objeto por error, esto lo previene:
        const statusVal = typeof params.status === 'object' ? params.status.value : params.status;

        data = data.filter((item: any) => item.estado === statusVal);
    }

    // 3. Paginación
    const total = data.length;
    const offset = parseInt(params.offset) || 0;
    const limit = parseInt(params.limit) || 10;
    const paginatedData = data.slice(offset, offset + limit);

    return {
        total: total,
        data: paginatedData,
        schema: result.schema
    };
};