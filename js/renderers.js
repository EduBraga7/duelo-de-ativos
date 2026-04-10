import { indicators } from './config.js';
import { determineWinner, formatValue } from './utils.js';

export function renderHero(assetsData, prices = null) {
    const heroContainer = document.getElementById('assets-hero');
    heroContainer.innerHTML = '';

    assetsData.forEach((asset, index) => {
        const column = document.createElement('div');
        column.className = 'asset-column flex flex-col items-center justify-center';

        let logoHtml;
        if (asset.logoUrl) {
            logoHtml = `<img src="${asset.logoUrl}" alt="${asset.ticker}" class="w-16 h-16 rounded-full mx-auto mb-3 border p-1 bg-white object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`;
        }

        const fallbackHtml = `<div class="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 mb-3 ${asset.logoUrl ? 'hidden' : ''}">${asset.logo}</div>`;

        // Preço em tempo real (se disponível)
        const priceData = prices?.[asset.ticker];
        const priceHtml = priceData ? `
            <div class="mt-2 text-center" data-ticker="${asset.ticker}">
                <span class="price-value text-lg font-bold text-slate-900">R$ ${priceData.price.toFixed(2)}</span>
                <span class="price-change text-sm ${priceData.change >= 0 ? 'text-green-600' : 'text-red-600'}">
                    ${priceData.change >= 0 ? '+' : ''}${priceData.changePercent.toFixed(2)}%
                </span>
            </div>
        ` : `
            <div class="mt-2 text-center" data-ticker="${asset.ticker}">
                <span class="price-value text-lg font-bold text-slate-400">-</span>
            </div>
        `;

        column.innerHTML = `
            ${asset.logoUrl ? logoHtml : ''}
            ${fallbackHtml}
            <h2 class="asset-ticker">${asset.ticker}</h2>
            <p class="text-slate-500 text-sm mt-1 text-center max-w-[150px] truncate">${asset.name || asset.ticker}</p>
            ${priceHtml}
        `;
        heroContainer.appendChild(column);
    });
}

export function updatePrices(prices) {
    // Atualizar apenas os preços sem re-renderizar tudo
    Object.entries(prices).forEach(([ticker, data]) => {
        const container = document.querySelector(`[data-ticker="${ticker}"]`);
        if (container) {
            const priceEl = container.querySelector('.price-value');
            const changeEl = container.querySelector('.price-change');

            if (priceEl) {
                priceEl.textContent = `R$ ${data.price.toFixed(2)}`;
                priceEl.classList.remove('text-slate-400');
                priceEl.classList.add('text-slate-900');
            }

            if (changeEl) {
                const sign = data.change >= 0 ? '+' : '';
                changeEl.textContent = `${sign}${data.changePercent.toFixed(2)}%`;
                changeEl.className = `price-change text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`;
            }
        }
    });
}

export function renderComparisonTable(assetsData) {
    const tableContainer = document.getElementById('comparison-table');
    tableContainer.innerHTML = '';
    
    const numAssets = assetsData.length;
    
    const styleId = 'dynamic-grid-style';
    let dynamicStyle = document.getElementById(styleId);
    if (!dynamicStyle) {
        dynamicStyle = document.createElement('style');
        dynamicStyle.id = styleId;
        document.head.appendChild(dynamicStyle);
    }
    
    dynamicStyle.textContent = `
        #comparison-table {
            --num-assets: ${numAssets};
        }
        @media (min-width: 768px) {
            .comparison-row {
                grid-template-columns: 120px repeat(${numAssets}, 1fr);
            }
        }
    `;
    
    const tableWrapper = document.getElementById('table-container');
    if (tableWrapper) {
        tableWrapper.classList.remove('overflow-x-auto', 'comparison-table-scroll');
        if (numAssets >= 4 && window.innerWidth < 768) {
            tableWrapper.classList.add('overflow-x-auto');
        } else if (numAssets >= 5 && window.innerWidth >= 768) {
            tableWrapper.classList.add('comparison-table-scroll');
        }
    }
    
    indicators.forEach(indicator => {
        const row = document.createElement('div');
        row.className = 'comparison-row';
        row.style.setProperty('--num-assets', numAssets);
        
        const label = document.createElement('div');
        label.className = 'indicator-label';
        label.textContent = indicator.label;
        row.appendChild(label);
        
        const valuesContainer = document.createElement('div');
        valuesContainer.className = 'indicator-values-container';
        valuesContainer.style.setProperty('--num-assets', numAssets);
        
        const values = assetsData.map(a => a[indicator.key]);
        const results = determineWinner(values, indicator.higherIsBetter, indicator.allowND);
        
        values.forEach((value, index) => {
            const cell = document.createElement('div');
            const formattedValue = formatValue(value, indicator.format, indicator.suffix, indicator.allowND);
            
            if (formattedValue === null && indicator.allowND) {
                cell.className = 'indicator-value na';
                cell.textContent = 'N/D';
            } else {
                cell.className = `indicator-value ${results[index]}`;
                cell.textContent = formattedValue !== null ? formattedValue : '-';
            }
            
            valuesContainer.appendChild(cell);
            row.appendChild(cell);
        });
        
        tableContainer.appendChild(row);
    });
}

export function renderCTAs(assetsData) {
    const ctaContainer = document.getElementById('cta-section');
    ctaContainer.innerHTML = '';
    
    const numAssets = assetsData.length;
    ctaContainer.style.display = 'grid';
    ctaContainer.style.gridTemplateColumns = `repeat(${numAssets}, 1fr)`;
    ctaContainer.style.gap = '1rem';
    
    if (window.innerWidth >= 768) {
        ctaContainer.style.gap = '1.5rem';
    }
    
    assetsData.forEach(asset => {
        const button = document.createElement('a');
        button.href = `https://statusinvest.com.br/acoes/${asset.ticker.toLowerCase()}`;
        button.target = '_blank';
        button.className = 'cta-button';
        button.innerHTML = `
            <span class="block text-sm font-normal opacity-75 mb-1">Ver análises de</span>
            <span class="text-lg font-bold">${asset.ticker}</span>
        `;
        ctaContainer.appendChild(button);
    });
}

export function renderEmptyState() {
    const heroContainer = document.getElementById('assets-hero');
    const tableContainer = document.getElementById('comparison-table');
    const ctaContainer = document.getElementById('cta-section');
    
    heroContainer.innerHTML = '<p class="text-center text-slate-500 py-8">Carregando ativos...</p>';
    tableContainer.innerHTML = '';
    ctaContainer.innerHTML = '';
}
