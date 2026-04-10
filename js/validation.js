import { getAssetCategory } from './database.js';

export function validateAssets(inputs, showErrorFn) {
    const categories = [];
    const filledInputs = Array.from(inputs).filter(input => input.value.trim() !== '');
    
    // Validar apenas campos preenchidos
    for (const input of filledInputs) {
        const value = input.value.trim();
        
        const category = getAssetCategory(value);
        if (category) {
            categories.push(category);
        }
    }

    // Verificar se há mistura de categorias (Ações vs FIIs)
    if (categories.length >= 2) {
        const firstCategory = categories[0];
        const hasMixedCategories = categories.some(cat => cat !== firstCategory);

        if (hasMixedCategories) {
            showErrorFn('Ops! Ações e FIIs jogam em ligas diferentes. Digite ativos da mesma categoria para um duelo justo.');
            return false;
        }
    }

    return true;
}
