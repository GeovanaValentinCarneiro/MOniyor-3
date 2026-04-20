const BIOMES = {
    amazonia: { name: 'Amazônia', emoji: '🌳', producao: 'Castanha, açaí e manejo sustentável.', conservacao: 'Monitoramento por satélite.', sustentabilidade: 92 },
    cerrado: { name: 'Cerrado', emoji: '🌾', producao: 'Grãos e integração lavoura-pecuária.', conservacao: 'Preservação de nascentes.', sustentabilidade: 85 },
    pantanal: { name: 'Pantanal', emoji: '🐊', producao: 'Pecuária orgânica e ecoturismo.', conservacao: 'Controle de fauna e cheias.', sustentabilidade: 88 },
    caatinga: { name: 'Caatinga', emoji: '🌵', producao: 'Mel e fruticultura irrigada.', conservacao: 'Convivência com o semiárido.', sustentabilidade: 70 },
    mata_atlantica: { name: 'Mata Atlântica', emoji: '🦜', producao: 'Café gourmet e agrofloresta.', conservacao: 'Corredores ecológicos.', sustentabilidade: 78 },
    pampa: { name: 'Pampa', emoji: '🐴', producao: 'Pecuária de corte e vitivinicultura.', conservacao: 'Manejo de pastagem nativa.', sustentabilidade: 75 }
};

document.addEventListener('DOMContentLoaded', () => {
    // Contador de Visitas
    const badge = document.getElementById('visitBadge');
    if (badge) {
        let v = parseInt(localStorage.getItem('visitas') || '0') + 1;
        localStorage.setItem('visitas', v);
        badge.innerText = `${v}ª Visita`;
    }

    // Interatividade do Mapa
    const paths = document.querySelectorAll('.biome-path');
    paths.forEach(path => {
        path.addEventListener('click', () => {
            const key = path.getAttribute('data-biome');
            const info = BIOMES[key];
            
            if (!info) return;

            // Ativa o path visualmente
            paths.forEach(p => p.classList.remove('active'));
            path.classList.add('active');

            // Preenche os dados
            document.getElementById('detailSection').classList.remove('hidden');
            document.getElementById('biomeName').innerText = info.name;
            document.getElementById('biomeEmoji').innerText = info.emoji;
            document.getElementById('bioProducao').innerText = info.producao;
            document.getElementById('bioConservacao').innerText = info.conservacao;
            document.getElementById('susValue').innerText = info.sustentabilidade + '%';
            
            const fill = document.getElementById('susFill');
            fill.style.width = '0%';
            setTimeout(() => { 
                fill.style.width = info.sustentabilidade + '%'; 
            }, 100);
        });
    });

    // Modo Escuro
    const darkToggle = document.getElementById('darkToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = darkToggle.querySelector('i');
            if (icon && typeof lucide !== 'undefined') {
                const isLight = document.body.classList.contains('light-mode');
                icon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
                lucide.createIcons();
            }
        });
    }

    // Inicializa ícones
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});