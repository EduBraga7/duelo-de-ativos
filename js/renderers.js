import { indicators } from './config.js';
import { determineWinner, formatValue } from './utils.js';

// Função para determinar vencedor geral do duelo
function determineOverallWinner(assetsData) {
    if (assetsData.length !== 2) return null;
    
    let score1 = 0;
    let score2 = 0;
    
    indicators.forEach(indicator => {
        const val1 = assetsData[0][indicator.key];
        const val2 = assetsData[1][indicator.key];
        
        if (val1 !== null && val2 !== null) {
            const results = determineWinner([val1, val2], indicator.higherIsBetter, indicator.allowND);
            if (results[0] === 'win') score1++;
            if (results[1] === 'win') score2++;
        }
    });
    
    if (score1 > score2) return 0;
    if (score2 > score1) return 1;
    return null; // Empate
}

export function renderHero(assetsData, prices = null) {
    const heroContainer = document.getElementById('assets-hero');
    heroContainer.innerHTML = '';
    
    // Determinar vencedor geral
    const winnerIndex = determineOverallWinner(assetsData);

    // Criar container do ringue
    const ringueContainer = document.createElement('div');
    ringueContainer.className = 'ringue-container';
    
    // Badge de VS no centro
    const vsBadge = document.createElement('div');
    vsBadge.className = 'ringue-vs';
    vsBadge.textContent = 'VS';
    ringueContainer.appendChild(vsBadge);

    assetsData.forEach((asset, index) => {
        const side = document.createElement('div');
        side.className = index === 0 ? 'ringue-left' : 'ringue-right';
        
        // Verificar se é o vencedor
        const isWinner = winnerIndex === index;
        
        let logoHtml;
        if (asset.logoUrl) {
            logoHtml = `<img src="${asset.logoUrl}" alt="${asset.ticker}" class="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white shadow-lg bg-white object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`;
        }

        const fallbackHtml = `<div class="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl font-bold text-slate-700 mb-3 ${asset.logoUrl ? 'hidden' : ''}">${asset.logo}</div>`;

        // Preço em tempo real (se disponível)
        const priceData = prices?.[asset.ticker];
        const priceHtml = priceData ? `
            <div class="mt-2 text-center" data-ticker="${asset.ticker}">
                <span class="price-value text-xl font-bold text-slate-900 dark:text-white">R$ ${priceData.price.toFixed(2)}</span>
                <span class="price-change text-sm ${priceData.change >= 0 ? 'text-green-600' : 'text-red-600'} block">
                    ${priceData.change >= 0 ? '+' : ''}${priceData.changePercent.toFixed(2)}%
                </span>
            </div>
        ` : `
            <div class="mt-2 text-center" data-ticker="${asset.ticker}">
                <span class="price-value text-xl font-bold text-slate-400">-</span>
            </div>
        `;
        
        // Badge de vencedor
        const winnerBadge = isWinner ? `
            <div class="winner-badge">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                Vencedor
            </div>
        ` : '';
        
        // Sparkline simulado (em produção viria da API)
        const sparklineData = [10, 12, 11, 14, 13, 15, 16, 18, 17, 19, 20, 22];
        const isUpTrend = index === 0 ? Math.random() > 0.3 : Math.random() > 0.5;
        const sparklineHtml = createSparkline(sparklineData, isUpTrend);
        
        // Seta de tendência
        const trendArrow = isUpTrend ? 
            '<span class="trend-arrow up">▲</span>' : 
            '<span class="trend-arrow down">▼</span>';

        side.innerHTML = `
            ${winnerBadge}
            ${asset.logoUrl ? logoHtml : ''}
            ${fallbackHtml}
            <h2 class="font-mono text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">${asset.ticker}</h2>
            <p class="text-slate-600 dark:text-slate-300 text-sm font-medium mt-1 text-center max-w-[200px] truncate">${asset.name || asset.ticker}</p>
            ${priceHtml}
            <div class="sparkline-container">
                ${sparklineHtml}
                ${trendArrow}
            </div>
        `;
        ringueContainer.appendChild(side);
    });
    
    heroContainer.appendChild(ringueContainer);
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
        
        // Label com tooltip
        const labelContainer = document.createElement('div');
        labelContainer.className = 'indicator-label tooltip-container';
        
        const labelText = document.createElement('span');
        labelText.textContent = indicator.label;
        labelContainer.appendChild(labelText);
        
        // Ícone de info
        const infoIcon = document.createElement('svg');
        infoIcon.className = 'tooltip-icon';
        infoIcon.setAttribute('viewBox', '0 0 20 20');
        infoIcon.setAttribute('fill', 'currentColor');
        infoIcon.innerHTML = '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />';
        labelContainer.appendChild(infoIcon);
        
        // Tooltip
        if (indicator.description) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = indicator.description;
            labelContainer.appendChild(tooltip);
        }
        
        row.appendChild(labelContainer);
        
        // Calcular valores para barras de progresso (apenas para 2 ativos)
        const values = assetsData.map(a => a[indicator.key]);
        const numericValues = values.map(v => {
            if (v === null || v === undefined || v === 'N/D') return null;
            const num = parseFloat(v);
            return isNaN(num) ? null : num;
        });
        
        const hasNumericValues = numericValues.some(v => v !== null);
        let maxValue = 0;
        if (hasNumericValues && numAssets === 2) {
            const validValues = numericValues.filter(v => v !== null);
            maxValue = validValues.length > 0 ? Math.max(...validValues) : 0;
        }
        
        const results = determineWinner(values, indicator.higherIsBetter, indicator.allowND);
        
        values.forEach((value, index) => {
            const formattedValue = formatValue(value, indicator.format, indicator.suffix, indicator.allowND);
            
            // Criar célula com valor e barra de progresso
            const cell = document.createElement('div');
            cell.className = 'indicator-cell';
            
            if (formattedValue === null && indicator.allowND) {
                cell.innerHTML = `
                    <div class="indicator-value na">N/D</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill neutral" style="width: 0%"></div>
                        </div>
                    </div>
                `;
            } else {
                const displayValue = formattedValue !== null ? formattedValue : '-';
                const resultClass = results[index];
                
                // Calcular porcentagem para barra de progresso (apenas 2 ativos)
                let progressWidth = 0;
                let progressPercentage = '';
                if (numAssets === 2 && hasNumericValues && maxValue > 0) {
                    const currentValue = numericValues[index];
                    if (currentValue !== null) {
                        progressWidth = (currentValue / maxValue) * 100;
                        progressPercentage = `${Math.round(progressWidth)}%`;
                    }
                }
                
                const progressBarHtml = numAssets === 2 && hasNumericValues ? `
                    <div class="progress-bar-container">
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill ${resultClass}" style="width: ${progressWidth}%"></div>
                        </div>
                        <span class="progress-percentage">${progressPercentage}</span>
                    </div>
                ` : '';
                
                // Seta de tendência para o resultado
                const trendArrowHtml = resultClass === 'win' ? 
                    '<span class="trend-arrow up">▲</span>' :
                    resultClass === 'loss' ? 
                    '<span class="trend-arrow down">▼</span>' : '';
                
                cell.innerHTML = `
                    <div class="indicator-value-with-bar ${resultClass}">${displayValue}${trendArrowHtml}</div>
                    ${progressBarHtml}
                `;
            }
            
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
    
    // Skeleton para o ringue
    heroContainer.innerHTML = `
        <div class="ringue-container">
            <div class="ringue-skeleton">
                <div class="ringue-skeleton-left">
                    <div class="skeleton skeleton-circle"></div>
                    <div class="skeleton skeleton-title" style="width: 100px;"></div>
                    <div class="skeleton skeleton-text" style="width: 80px;"></div>
                </div>
                <div class="ringue-vs">VS</div>
                <div class="ringue-skeleton-right">
                    <div class="skeleton skeleton-circle"></div>
                    <div class="skeleton skeleton-title" style="width: 100px;"></div>
                    <div class="skeleton skeleton-text" style="width: 80px;"></div>
                </div>
            </div>
        </div>
    `;
    
    // Skeleton para a tabela
    tableContainer.innerHTML = `
        <div class="p-4">
            ${Array(6).fill(0).map(() => `
                <div class="flex items-center gap-4 mb-3">
                    <div class="skeleton skeleton-text" style="width: 100px;"></div>
                    <div class="flex-1">
                        <div class="skeleton skeleton-row"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    ctaContainer.innerHTML = '';
}

// Função para criar sparkline SVG
function createSparkline(dataPoints, isUp = true) {
    if (!dataPoints || dataPoints.length < 2) return '';
    
    const width = 60;
    const height = 24;
    const padding = 2;
    
    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);
    const range = max - min || 1;
    
    // Gerar pontos para o SVG
    const points = dataPoints.map((val, i) => {
        const x = (i / (dataPoints.length - 1)) * (width - padding * 2) + padding;
        const y = height - padding - ((val - min) / range) * (height - padding * 2);
        return `${x},${y}`;
    });
    
    const pathD = `M ${points.join(' L ')}`;
    const fillD = `M ${points[0]} L ${points.join(' L ')} L ${width - padding},${height} L ${padding},${height} Z`;
    const direction = isUp ? 'up' : 'down';
    
    return `
        <div class="sparkline">
            <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                <path class="sparkline-fill ${direction}" d="${fillD}" />
                <path class="sparkline-path ${direction}" d="${pathD}" />
                <circle class="sparkline-dot ${direction}" cx="${width - padding}" cy="${points[points.length - 1].split(',')[1]}" />
            </svg>
        </div>
    `;
}
