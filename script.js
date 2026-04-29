const BIOMES = {
    amazonia: { name: 'Amazônia', emoji: '🌳', prod: 'Manejo de Açaí e Castanha', cons: 'Monitoramento via Satélite', sus: 94 },
    cerrado: { name: 'Cerrado', emoji: '🌾', prod: 'Soja e Milho Sustentável', cons: 'Sistema de Plantio Direto', sus: 82 },
    pantanal: { name: 'Pantanal', emoji: '🐊', prod: 'Pecuária Regenerativa', cons: 'Rastreabilidade Bovina', sus: 88 },
    caatinga: { name: 'Caatinga', emoji: '🌵', prod: 'Fruticultura de Precisão', cons: 'Irrigação Inteligente', sus: 74 },
    mata_atlantica: { name: 'Mata Atlântica', emoji: '🦜', prod: 'Café de Sombra (Agroflorestal)', cons: 'Restauração de APP', sus: 79 },
    pampa: { name: 'Pampa', emoji: '🐴', prod: 'Ovinocultura e Arroz', cons: 'Manejo de Pastagem Nativa', sus: 81 }
};

const SAZONAL = {
    meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    produtos: { amazonia: "Açaí", cerrado: "Milho", pantanal: "Mel", caatinga: "Uva", mata_atlantica: "Café", pampa: "Lã" }
};

const QUIZ = [
    { q: "Qual tecnologia reduz o uso de água no campo?", a: ["Irrigação por Gotejamento", "Irrigação por Inundação"], r: 0 },
    { q: "O que significa ILPF?", a: ["Integração Lavoura-Pecuária-Floresta", "Indústria de Leite e Produtos Fortes"], r: 0 }
];

let currentQ = 0;

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initCalendar();
    
    // Dark Mode Toggle
    document.getElementById('darkToggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = document.querySelector('#darkToggle i');
        if(document.body.classList.contains('light-mode')) {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    });

    // Mapa Interativo
    document.querySelectorAll('.biome-path').forEach(path => {
        path.addEventListener('click', () => {
            const data = BIOMES[path.dataset.biome];
            document.getElementById('placeholderMsg').classList.add('hidden');
            document.getElementById('contentArea').classList.remove('hidden');
            
            document.getElementById('bName').innerText = data.name;
            document.getElementById('bEmoji').innerText = data.emoji;
            document.getElementById('bProd').innerText = data.prod;
            document.getElementById('bCons').innerText = data.cons;
            document.getElementById('susVal').innerText = data.sus + '%';
            
            const fill = document.getElementById('susFill');
            fill.style.width = '0%';
            setTimeout(() => fill.style.width = data.sus + '%', 50);

            document.querySelectorAll('.biome-path').forEach(p => p.classList.remove('active'));
            path.classList.add('active');
        });
    });

    // Quiz
    document.getElementById('btnStartQuiz').addEventListener('click', renderQuiz);
});

function initCalendar() {
    const mesIdx = new Date().getMonth();
    document.getElementById('mesDisplay').innerText = SAZONAL.meses[mesIdx];
    const grid = document.getElementById('calendarGrid');
    
    Object.keys(BIOMES).forEach(key => {
        const item = BIOMES[key];
        const card = document.createElement('div');
        card.className = "p-4 glass bg-white/5 border-none";
        card.innerHTML = `
            <h5 class="font-bold text-xs mb-1">${item.emoji} ${item.name}</h5>
            <p class="text-[10px] text-green-500 font-bold uppercase">Colheita: ${SAZONAL.produtos[key]}</p>
        `;
        grid.appendChild(card);
    });
}

function renderQuiz() {
    const data = QUIZ[currentQ];
    let html = `<p class="text-sm font-bold mb-4">${data.q}</p>`;
    data.a.forEach((opt, i) => {
        html += `<button onclick="checkAnswer(${i})" class="w-full mb-2 p-3 text-xs text-left glass hover:bg-green-500/20 transition-all border-white/5">${opt}</button>`;
    });
    document.getElementById('quizBox').innerHTML = html;
}

window.checkAnswer = function(i) {
    if(i === QUIZ[currentQ].r) {
        currentQ++;
        if(currentQ < QUIZ.length) {
            renderQuiz();
        } else {
            document.getElementById('quizBox').innerHTML = `<div class="text-center py-4"><span class="text-green-500 font-bold">Incrível! 🏆</span><p class="text-[10px] opacity-60">Você entende do equilíbrio do futuro.</p></div>`;
            currentQ = 0;
        }
    } else {
        alert("Ops! Pense mais no equilíbrio ambiental e tente de novo.");
    }
};