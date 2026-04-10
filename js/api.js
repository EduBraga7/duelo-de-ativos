import { BRAPI_TOKEN } from './config.js';

export async function fetchSingleBrapi(ticker) {
    const url = `https://brapi.dev/api/quote/${ticker}?token=${BRAPI_TOKEN}&fundamental=true`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            return null;
        }
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            return null;
        }
        
        return data.results[0];
    } catch (error) {
        return null;
    }
}

export async function fetchBrapiData(tickers) {
    const results = await Promise.all(
        tickers.map(ticker => fetchSingleBrapi(ticker))
    );
    
    const validResults = results.filter(r => r !== null);
    
    if (validResults.length === 0) {
        return null;
    }
    
    return { results: validResults };
}

export async function fetchAllAssetsData(tickers) {
    return await fetchBrapiData(tickers);
}
