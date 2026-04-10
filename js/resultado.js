import { getTickersFromURL } from './url.js';
import { fetchAllAssetsData } from './api.js';
import { mapBrapiData } from './mappers.js';
import { renderHero, renderComparisonTable, renderCTAs, renderEmptyState, updatePrices } from './renderers.js';
import { startPricePolling, fetchPrices } from './prices.js';

let assetsData = [];
let stopPolling = null;

async function init() {
    const tickers = getTickersFromURL();
    if (!tickers) {
        alert('Escolha seus ativos para começar o duelo!');
        window.location.href = 'index.html';
        return;
    }

    renderEmptyState();

    // Buscar dados fundamentais e preços iniciais em paralelo
    const [apiData, initialPrices] = await Promise.all([
        fetchAllAssetsData(tickers),
        fetchPrices(tickers)
    ]);

    assetsData = mapBrapiData(apiData, tickers);

    renderHero(assetsData, initialPrices);
    renderComparisonTable(assetsData);
    renderCTAs(assetsData);

    // Iniciar polling de preços em tempo real
    stopPolling = startPricePolling(tickers, (prices) => {
        updatePrices(prices);
    });
}

// Parar polling ao sair da página
window.addEventListener('beforeunload', () => {
    if (stopPolling) stopPolling();
});

document.addEventListener('DOMContentLoaded', () => {
    init();
    
    document.getElementById('add-asset-btn')?.addEventListener('click', () => {
        alert('Funcionalidade de adicionar ativo em desenvolvimento!');
    });
});

export { assetsData };
