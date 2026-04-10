export function getTickersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const ativos = urlParams.get('ativos');
    
    if (!ativos) {
        alert('Nenhum ativo selecionado. Redirecionando para a página inicial...');
        window.location.href = 'index.html';
        return null;
    }
    
    return ativos.split(',').map(t => t.trim().toUpperCase());
}
