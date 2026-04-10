export const BRAPI_TOKEN = 'wS4WdPdCWEsc5jtDjH95ZM';

export const indicators = [
    { key: 'pl', label: 'P/L', higherIsBetter: false, suffix: 'x', description: 'Preço sobre Lucro. Quanto menor, mais barato está o ativo em relação ao lucro.' },
    { key: 'pvp', label: 'P/VP', higherIsBetter: false, suffix: 'x', allowND: true, description: 'Preço sobre Valor Patrimonial. Menor = mais barato que o patrimônio.' },
    { key: 'marketCap', label: 'Valor de Mercado', higherIsBetter: true, suffix: '', format: 'currencyB', description: 'Valor total da empresa no mercado (preço × ações).' },
    { key: 'eps', label: 'EPS (LPA)', higherIsBetter: true, suffix: '', format: 'currency', description: 'Lucro por Ação. Quanto maior, mais lucrativa é a empresa.' },
    { key: 'volume', label: 'Volume Diário', higherIsBetter: true, suffix: '', format: 'compact', description: 'Quantidade de ações negociadas no dia. Indica liquidez.' },
    { key: 'roe', label: 'ROE', higherIsBetter: true, suffix: '%', allowND: true, description: 'Return on Equity. Retorno sobre o patrimônio. Quanto maior, melhor.' }
];
