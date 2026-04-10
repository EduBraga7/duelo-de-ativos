function injectHeader() {
    const headerHTML = `
        <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-2">
                        <span class="text-2xl font-black text-slate-900 tracking-tight">Duelo<span class="text-slate-500">de</span>Ativos</span>
                    </a>
                    
                    <!-- Navegação Desktop -->
                    <nav class="hidden md:flex items-center gap-6">
                        <a href="index.html" class="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Novo Duelo</a>
                        <a href="index.html#batalhas-populares" class="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Batalhas</a>
                        <a href="index.html#como-funciona" class="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Como Funciona</a>
                    </nav>
                    
                    <!-- Ações -->
                    <div class="flex items-center gap-3">
                        <a href="index.html" class="hidden sm:inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                            + Novo Duelo
                        </a>
                        
                        <!-- Menu Mobile Button -->
                        <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-600 hover:text-slate-900">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Menu Mobile -->
                <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-slate-100">
                    <nav class="flex flex-col gap-2 mt-4">
                        <a href="index.html" class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">Novo Duelo</a>
                        <a href="index.html#batalhas-populares" class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">Batalhas</a>
                        <a href="index.html#como-funciona" class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">Como Funciona</a>
                    </nav>
                </div>
            </div>
        </header>
    `;
    
    // Inserir no início do body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Ativar menu mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function injectFooter() {
    const footerHTML = `
        <footer class="bg-slate-50 border-t border-slate-200 mt-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <!-- Logo & Descrição -->
                    <div class="md:col-span-2">
                        <a href="index.html" class="text-xl font-black text-slate-900 tracking-tight">Duelo<span class="text-slate-500">de</span>Ativos</a>
                        <p class="text-slate-500 text-sm mt-3 max-w-sm">Compare ações e FIIs lado a lado. Análise rápida, decisões inteligentes.</p>
                    </div>
                    
                    <!-- Links Rápidos -->
                    <div>
                        <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Navegação</h3>
                        <ul class="space-y-2">
                            <li><a href="index.html" class="text-slate-500 hover:text-slate-700 text-sm transition-colors">Novo Duelo</a></li>
                            <li><a href="index.html#batalhas-populares" class="text-slate-500 hover:text-slate-700 text-sm transition-colors">Batalhas</a></li>
                            <li><a href="index.html#como-funciona" class="text-slate-500 hover:text-slate-700 text-sm transition-colors">Como Funciona</a></li>
                        </ul>
                    </div>
                    
                    <!-- Contato -->
                    <div>
                        <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Contato</h3>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-slate-500 hover:text-slate-700 text-sm transition-colors">Sobre o Projeto</a></li>
                            <li><a href="#" class="text-slate-500 hover:text-slate-700 text-sm transition-colors">Feedback</a></li>
                            <li><a href="#" class="text-slate-500 hover:text-slate-700 text-sm transition-colors">Reportar Bug</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Copyright -->
                <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p class="text-slate-400 text-xs">© 2026 Duelo de Ativos. Todos os direitos reservados.</p>
                    <div class="flex items-center gap-4">
                        <a href="#" class="text-slate-400 hover:text-slate-600 text-xs transition-colors">Termos de Uso</a>
                        <a href="#" class="text-slate-400 hover:text-slate-600 text-xs transition-colors">Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Inserir no final do body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Inicializar automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
});
