import { validateAssets } from './validation.js';
import {
    getAssetCount,
    updateAddButton,
    createVsElement,
    createAssetInput,
    hideError,
    showError
} from './ui.js';

const MIN_ASSETS = 2;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('duel-form');
    const assetsContainer = document.getElementById('assets-container');
    const addAssetBtn = document.getElementById('add-asset-btn');
    const errorMessage = document.getElementById('error-message');

    const errorUI = {
        hide: () => hideError(errorMessage),
        show: (msg) => showError(errorMessage, msg)
    };

    addAssetBtn.addEventListener('click', () => {
        errorUI.hide();

        if (getAssetCount(assetsContainer) >= 5) {
            return;
        }

        const vs = createVsElement();
        const newContainer = createAssetInput(assetsContainer);

        assetsContainer.appendChild(vs);
        assetsContainer.appendChild(newContainer);

        // Inicializar autocomplete no novo input
        const newInput = newContainer.querySelector('.asset-input');
        
        if (newInput && typeof window.configurarAutocomplete === 'function') {
            window.configurarAutocomplete(newInput);
        } else if (newInput && typeof window.initAutocomplete === 'function') {
            window.initAutocomplete(newInput);
        }

        newInput.focus();
        updateAddButton(addAssetBtn, assetsContainer);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorUI.hide();

        // Capturar todos os inputs
        const inputs = assetsContainer.querySelectorAll('.asset-input');
        
        // Verificar se há pelo menos 2 ativos preenchidos
        const filledInputs = Array.from(inputs).filter(input => input.value.trim() !== '');
        
        if (filledInputs.length < MIN_ASSETS) {
            errorUI.show('Por favor, insira pelo menos 2 ativos válidos (ex: PETR4) para continuar.');
            return;
        }

        // Verificar se cada ticker tem pelo menos 4 caracteres
        const invalidTickers = filledInputs.filter(input => input.value.trim().length < 4);
        if (invalidTickers.length > 0) {
            errorUI.show('Por favor, insira pelo menos 2 ativos válidos (ex: PETR4) para continuar.');
            return;
        }

        // Validar e coletar tickers
        if (validateAssets(inputs, errorUI.show)) {
            const tickers = filledInputs.map(input => input.value.trim().toUpperCase());
            console.log('Iniciando duelo com:', tickers);
            
            // Redirecionar para tela de resultados
            window.location.href = `resultado.html?ativos=${tickers.join(',')}`;
        }
    });

    assetsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('asset-input')) {
            errorUI.hide();
        }
    });

    updateAddButton(addAssetBtn, assetsContainer);
});
