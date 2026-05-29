const BIOMES = {
    amazonia: { name: 'Amazônia', emoji: '🌳', prod: 'Manejo de Açaí Bio-Rastreado', cons: 'Monitoramento Satelital 5G', sus: 96 },
    cerrado: { name: 'Cerrado', emoji: '🌾', prod: 'Grãos com Plantio Direto', cons: 'Sensores de Nitrogênio IA', sus: 84 },
    pantanal: { name: 'Pantanal', emoji: '🐊', prod: 'Pecuária de Baixo Carbono', cons: 'Rastreamento por Colares IoT', sus: 91 },
    caatinga: { name: 'Caatinga', emoji: '🌵', prod: 'Fruticultura de Precisão', cons: 'Irrigação Gotejante Inteligente', sus: 78 },
    mata_atlantica: { name: 'Mata Atlântica', emoji: '🦜', prod: 'Sistemas Agroflorestais', cons: 'Corredores Digitais de Biodiversidade', sus: 82 },
    pampa: { name: 'Pampa', emoji: '🐴', prod: 'Lã e Carne Sustentável', cons: 'Manejo de Pastagem Nativa', sus: 85 }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa Ícones e Animações
    lucide.createIcons();
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 2. Efeito Parallax Dinâmico no Header
    const hero = document.getElementById('hero');
    const layers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        let scroll = window.pageYOffset;
        // Move o background levemente
        hero.style.backgroundPositionY = (scroll * 0.5) + 'px';
        
        // Move elementos flutuantes em velocidades diferentes
        layers.forEach(layer => {
            layer.style.transform = `translateY(${scroll * 0.3}px)`;
        });
    });

    // 3. Toggle Dark/Light Mode
    const darkBtn = document.getElementById('darkToggle');
    darkBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = darkBtn.querySelector('i');
        const isLight = document.body.classList.contains('light-mode');
        icon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        lucide.createIcons();
    });

    // 4. Lógica do Mapa Interativo
    document.querySelectorAll('.biome-path').forEach(path => {
        path.addEventListener('click', () => {
            const data = BIOMES[path.dataset.biome];
            
            // UI Updates
            document.getElementById('placeholderMsg').classList.add('hidden');
            document.getElementById('contentArea').classList.remove('hidden');
            
            document.getElementById('bName').innerText = data.name;
            document.getElementById('bEmoji').innerText = data.emoji;
            document.getElementById('bProd').innerText = data.prod;
            document.getElementById('bCons').innerText = data.cons;
            document.getElementById('susVal').innerText = data.sus + '%';
            
            // Animação da Barra
            const fill = document.getElementById('susFill');
            fill.style.width = '0%';
            setTimeout(() => fill.style.width = data.sus + '%', 100);

            // Troca classe ativa
            document.querySelectorAll('.biome-path').forEach(p => p.classList.remove('active'));
            path.classList.add('active');
        });
    });
});