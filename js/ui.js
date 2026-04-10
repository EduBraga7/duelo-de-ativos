const MAX_ASSETS = 5;

export function getAssetCount(container) {
    return container.querySelectorAll('.asset-input').length;
}

export function updateAddButton(button, container) {
    const currentCount = getAssetCount(container);
    button.disabled = currentCount >= MAX_ASSETS;
}

export function createVsElement() {
    const vs = document.createElement('span');
    vs.className = 'vs-badge';
    vs.textContent = 'VS';
    return vs;
}

export function createAssetInput(container) {
    // Criar container do autocomplete
    const autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-container';
    
    // Criar input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'asset-input';
    input.placeholder = `Ativo ${String.fromCharCode(64 + getAssetCount(container) + 1)}`;
    input.maxLength = 10;
    input.autocomplete = 'off';
    
    // Criar dropdown
    const dropdown = document.createElement('ul');
    dropdown.className = 'autocomplete-dropdown hidden';
    
    // Montar estrutura
    autocompleteContainer.appendChild(input);
    autocompleteContainer.appendChild(dropdown);
    
    // Retornar o container completo
    return autocompleteContainer;
}

export function hideError(element) {
    element.classList.add('hidden');
    element.textContent = '';
}

export function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden');
}
