export const BRAPI_TOKEN = 'wS4WdPdCWEsc5jtDjH95ZM';

export const indicators = [
    { key: 'pl', label: 'P/L', higherIsBetter: false, suffix: 'x' },
    { key: 'pvp', label: 'P/VP', higherIsBetter: false, suffix: 'x', allowND: true },
    { key: 'marketCap', label: 'Valor de Mercado', higherIsBetter: true, suffix: '', format: 'currencyB' },
    { key: 'eps', label: 'EPS (LPA)', higherIsBetter: true, suffix: '', format: 'currency' },
    { key: 'volume', label: 'Volume Diário', higherIsBetter: true, suffix: '', format: 'compact' },
    { key: 'roe', label: 'ROE', higherIsBetter: true, suffix: '%', allowND: true }
];
