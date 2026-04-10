function injectHeader() {
    const headerHTML = `
        <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm dark:shadow-none transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-3">
                        <div class="w-10 h-10 flex items-center justify-center bg-slate-900 dark:bg-slate-800 rounded-xl">
                            <svg class="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14C12 12.8954 12.8954 12 14 12H17C18.1046 12 19 12.8954 19 14V22C19 24.2091 17.2091 26 15 26H14C12.8954 26 12 25.1046 12 24V14Z" fill="#f97316"/>
                                <rect x="12" y="22" width="7" height="5" rx="2" fill="#f97316"/>
                                <path d="M28 14C28 12.8954 27.1046 12 26 12H23C21.8954 12 21 12.8954 21 14V22C21 24.2091 22.7909 26 25 26H26C27.1046 26 28 25.1046 28 24V14Z" fill="#f97316"/>
                                <rect x="21" y="22" width="7" height="5" rx="2" fill="#f97316"/>
                            </svg>
                        </div>
                        <span class="font-display text-xl font-black text-slate-900 dark:text-white tracking-tight">Duelo<span class="text-orange-500">de</span>Ativos</span>
                    </a>
                    
                    <!-- Navegação Desktop -->
                    <nav class="hidden md:flex items-center gap-6">
                        <a href="index.html" class="text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm font-semibold transition-colors">Novo Duelo</a>
                        <a href="index.html#batalhas-populares" class="text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm font-semibold transition-colors">Batalhas</a>
                        <a href="index.html#como-funciona" class="text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm font-semibold transition-colors">Como Funciona</a>
                    </nav>
                    
                    <!-- Ações -->
                    <div class="flex items-center gap-3">
                        <!-- Dark Mode Toggle -->
                        <button id="dark-mode-toggle" class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Alternar tema">
                            <!-- Sun icon (shown in dark mode) -->
                            <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                            <!-- Moon icon (shown in light mode) -->
                            <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                            </svg>
                        </button>
                        
                        <a href="index.html" class="hidden sm:inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Novo Duelo
                        </a>
                        
                        <!-- Menu Mobile Button -->
                        <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
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
        <footer class="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <!-- Logo & Descrição -->
                    <div class="md:col-span-2">
                        <a href="index.html" class="flex items-center gap-2 font-display text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            <svg class="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#0f172a"/>
                                <path d="M12 14C12 12.8954 12.8954 12 14 12H17C18.1046 12 19 12.8954 19 14V22C19 24.2091 17.2091 26 15 26H14C12.8954 26 12 25.1046 12 24V14Z" fill="#f97316"/>
                                <rect x="12" y="22" width="7" height="5" rx="2" fill="#f97316"/>
                                <path d="M28 14C28 12.8954 27.1046 12 26 12H23C21.8954 12 21 12.8954 21 14V22C21 24.2091 22.7909 26 25 26H26C27.1046 26 28 25.1046 28 24V14Z" fill="#f97316"/>
                                <rect x="21" y="22" width="7" height="5" rx="2" fill="#f97316"/>
                            </svg>
                            Duelo<span class="text-orange-500">de</span>Ativos
                        </a>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-3 max-w-sm">Compare ações e FIIs lado a lado. Análise rápida, decisões inteligentes.</p>
                    </div>
                    
                    <!-- Links Rápidos -->
                    <div>
                        <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Navegação</h3>
                        <ul class="space-y-2">
                            <li><a href="index.html" class="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm font-medium transition-colors">Novo Duelo</a></li>
                            <li><a href="index.html#batalhas-populares" class="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm font-medium transition-colors">Batalhas</a></li>
                            <li><a href="index.html#como-funciona" class="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm font-medium transition-colors">Como Funciona</a></li>
                        </ul>
                    </div>
                    
                    <!-- Contato -->
                    <div>
                        <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Contato</h3>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">Sobre o Projeto</a></li>
                            <li><a href="#" class="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">Feedback</a></li>
                            <li><a href="#" class="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">Reportar Bug</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Copyright -->
                <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p class="text-slate-400 dark:text-slate-500 text-xs">© 2026 Duelo de Ativos. Todos os direitos reservados.</p>
                    <div class="flex items-center gap-4">
                        <a href="#" class="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 text-xs transition-colors">Termos de Uso</a>
                        <a href="#" class="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 text-xs transition-colors">Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Inserir no final do body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Dark Mode Manager
const DarkModeManager = {
    STORAGE_KEY: 'duelo-ativos-dark-mode',
    
    init() {
        // Check system preference or saved preference
        const savedMode = localStorage.getItem(this.STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        }
        
        // Setup toggle button
        this.setupToggle();
    },
    
    setupToggle() {
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const isDark = document.documentElement.classList.contains('dark');
                localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
            });
        }
    }
};

// Inicializar automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    DarkModeManager.init();
});
