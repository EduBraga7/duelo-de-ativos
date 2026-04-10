export function salvarLogoCache(ticker, logoUrl) {
    try {
        const cacheExistente = localStorage.getItem('logos_ativos');
        const logos = cacheExistente ? JSON.parse(cacheExistente) : {};
        
        logos[ticker.toUpperCase()] = logoUrl;
        localStorage.setItem('logos_ativos', JSON.stringify(logos));
    } catch (e) {
        // Silenciar erro de localStorage
    }
}

export function determineWinner(values, higherIsBetter, allowND = false) {
    if (higherIsBetter === null) {
        return values.map(() => 'neutral');
    }

    const validValues = values.filter(v => v !== null && v !== undefined && v !== 0);

    if (validValues.length < 2) {
        return values.map(v => (v === 0 || v === null || v === undefined) && allowND ? 'na' : 'neutral');
    }

    // Verificar se todos os valores válidos são iguais (empate)
    const allEqual = validValues.every(v => v === validValues[0]);
    if (allEqual) {
        return values.map(v => {
            if (v === 0 || v === null || v === undefined) {
                return allowND ? 'na' : 'neutral';
            }
            return 'tie';
        });
    }

    if (higherIsBetter) {
        const max = Math.max(...validValues);
        const min = Math.min(...validValues);
        return values.map(v => {
            if (v === 0 || v === null || v === undefined) {
                return allowND ? 'na' : 'neutral';
            }
            if (v === max) return 'win';
            if (v === min) return 'loss';
            return 'neutral';
        });
    } else {
        const min = Math.min(...validValues);
        const max = Math.max(...validValues);
        return values.map(v => {
            if (v === 0 || v === null || v === undefined) {
                return allowND ? 'na' : 'neutral';
            }
            if (v === min) return 'win';
            if (v === max) return 'loss';
            return 'neutral';
        });
    }
}

export function formatValue(value, format, suffix, allowND = false) {
    if (value === null || value === undefined || value === 0) {
        if (allowND) return null;
        return '-';
    }
    
    if (format === 'compact') {
        if (value >= 1000000000) {
            return `${(value / 1000000000).toFixed(1)}B`;
        } else if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
    }
    
    if (format === 'currency') {
        return `R$ ${value.toFixed(2)}`;
    }
    
    if (format === 'currencyB') {
        if (value >= 1000000000) {
            return `R$ ${(value / 1000000000).toFixed(0)}B`;
        } else if (value >= 1000000) {
            return `R$ ${(value / 1000000).toFixed(0)}M`;
        }
        return `R$ ${value.toFixed(0)}`;
    }
    
    return `${value.toFixed(2)}${suffix}`;
}
