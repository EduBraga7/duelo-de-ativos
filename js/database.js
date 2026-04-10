export const mockDatabase = {
    acoes: ['PETR4', 'WEGE3', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'MGLU3'],
    fiis: ['MXRF11', 'KNCR11', 'HGLG11', 'XPLG11', 'VISC11', 'KNRI11', 'HGRE11']
};

export function getAssetCategory(ticker) {
    const upperTicker = ticker.toUpperCase();
    if (mockDatabase.acoes.includes(upperTicker)) {
        return 'acoes';
    }
    if (mockDatabase.fiis.includes(upperTicker)) {
        return 'fiis';
    }
    return null;
}
