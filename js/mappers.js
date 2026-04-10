import { salvarLogoCache } from './utils.js';

export function mapBrapiData(apiResponse, tickers) {
    if (!apiResponse || !apiResponse.results) {
        return tickers.map(ticker => ({
            ticker,
            name: ticker,
            pl: 0,
            pvp: 0,
            roe: 0,
            margemLiquida: 0,
            volume: 0,
            logo: ticker[0]
        }));
    }
    
    return apiResponse.results.map(stock => {
        const pl = stock.priceEarnings || stock.trailingPE || stock['P/L'] || 0;
        
        let pvp = stock.priceToBook || stock.priceToBookValue || stock['P/VP'] || null;
        if (!pvp && stock.regularMarketPrice && stock.bookValue) {
            pvp = stock.regularMarketPrice / stock.bookValue;
        }

        let roe = stock.returnOnEquity || stock.ROE || null;
        if (roe && roe > 0 && roe < 1) {
            roe = roe * 100;
        }
        
        let margemLiquida = stock.profitMargins || stock.profitMargin || stock.margemLiquida || 0;
        if (margemLiquida > 0 && margemLiquida < 1) {
            margemLiquida = margemLiquida * 100;
        }
        
        const volume = stock.regularMarketVolume || stock.volume || stock.volumeDiario || 0;
        const logoUrl = stock.logourl || null;
        
        if (logoUrl) {
            salvarLogoCache(stock.symbol, logoUrl);
        }
        
        return {
            ticker: stock.symbol,
            name: stock.shortName || stock.longName || stock.symbol,
            pl: pl,
            pvp: pvp,
            roe: roe,
            margemLiquida: margemLiquida,
            eps: stock.earningsPerShare || 0,
            marketCap: stock.marketCap || 0,
            volume: volume,
            logo: stock.symbol[0],
            logoUrl: logoUrl
        };
    });
}
