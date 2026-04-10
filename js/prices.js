import { BRAPI_TOKEN } from './config.js';

const POLLING_INTERVAL = 30000; // 30 segundos
let pollingTimer = null;

export async function fetchPrices(tickers) {
    const tickersParam = tickers.join(',');
    const url = `https://brapi.dev/api/quote/${tickersParam}?token=${BRAPI_TOKEN}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        
        const data = await response.json();
        if (!data.results) return null;
        
        // Mapear para objeto { ticker: price }
        const prices = {};
        data.results.forEach(stock => {
            prices[stock.symbol] = {
                price: stock.regularMarketPrice || stock.price || 0,
                change: stock.regularMarketChange || stock.change || 0,
                changePercent: stock.regularMarketChangePercent || stock.changePercent || 0
            };
        });
        
        return prices;
    } catch (error) {
        return null;
    }
}

export function startPricePolling(tickers, onUpdate) {
    // Parar polling anterior se existir
    stopPricePolling();
    
    // Busca imediata
    fetchPrices(tickers).then(onUpdate);
    
    // Polling periódico
    pollingTimer = setInterval(() => {
        fetchPrices(tickers).then(prices => {
            if (prices) onUpdate(prices);
        });
    }, POLLING_INTERVAL);
    
    return () => stopPricePolling();
}

export function stopPricePolling() {
    if (pollingTimer) {
        clearInterval(pollingTimer);
        pollingTimer = null;
    }
}

export function formatPrice(value) {
    if (!value || value === 0) return '-';
    return `R$ ${value.toFixed(2)}`;
}

export function formatChangePercent(value) {
    if (!value) return '-';
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}
