const BIOMES = {
    amazonia: { name: 'Amazônia', emoji: '🌳', prod: 'Castanha e Açaí', cons: 'IA Satelital', sus: 94 },
    cerrado: { name: 'Cerrado', emoji: '🌾', prod: 'Grãos Sustentáveis', cons: 'Plantio Direto', sus: 82 },
    pantanal: { name: 'Pantanal', emoji: '🐊', prod: 'Pecuária Regenerativa', cons: 'Prevenção Digital', sus: 88 },
    caatinga: { name: 'Caatinga', emoji: '🌵', prod: 'Fruticultura Precisão', cons: 'Reúso Hídrico', sus: 74 },
    mata_atlantica: { name: 'Mata Atlântica', emoji: '🦜', prod: 'Café Agroflorestal', cons: 'Corredores Eco', sus: 79 },
    pampa: { name: 'Pampa', emoji: '🐴', prod: 'Pecuária Grass-fed', cons: 'Manejo Nativo', sus: 81 }
};

const SAZONAL = {
    meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    produtos: { amazonia: ["Açaí"], cerrado: ["Milho"], pantanal: ["Mel"], caatinga: ["Uva"], mata_atlantica: ["Café"], pampa: ["Trigo"] }
};

const QUIZ_DATA = [
    { q: "O que caracteriza o Agro 5.0?", a: ["IA e Regeneração", "Tração Animal"], r: 0 }
];

let qIdx = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa ícones Lucide
    lucide.createIcons();
    
    // Inicializa Calendário
    initCalendar();
    
    // Listeners
    document.getElementById('btnStartQuiz').addEventListener('click', startQuiz);
    document.getElementById('darkToggle').addEventListener('click', toggleDarkMode);
    
    document.querySelectorAll('.biome-path').forEach(path => {
        path.addEventListener('click', () => updateBiomeInfo(path));
    });
});

function updateBiomeInfo(path) {
    const biomeKey = path.dataset.biome;
    const data = BIOMES[biomeKey];
    
    // Estética do mapa
    document.querySelectorAll('.biome-path').forEach(p => p.classList.remove('active'));
    path.classList.add('active');
    
    // Troca de conteúdo
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
}

function initCalendar() {
    const mesIdx = new Date().getMonth();
    document.getElementById('mesDisplay').innerText = `📅 ${SAZONAL.meses[mesIdx]} 2026`;
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = "";
    
    Object.keys(BIOMES).forEach(key => {
        const b = BIOMES[key];
        const card = document.createElement('div');
        card.className = "p-4 glass bg-white/5 border-none";
        card.innerHTML = `
            <h5 class="font-bold text-sm">${b.emoji} ${b.name}</h5>
            <p class="text-[10px] text-green-500 font-bold mt-2 uppercase">DESTAQUE: ${SAZONAL.produtos[key]}</p>
        `;
        grid.appendChild(card);
    });
}

function startQuiz() { 
    qIdx = 0; 
    renderQuestion(); 
}

function renderQuestion() {
    const q = QUIZ_DATA[qIdx];
    let h = `<p class="text-sm font-bold mb-4">${q.q}</p>`;
    q.a.forEach((opt, i) => { 
        h += `<button onclick="checkAnswer(${i})" class="w-full mb-2 p-3 text-xs text-left glass hover:bg-green-500/20">${opt}</button>`; 
    });
    document.getElementById('quizBox').innerHTML = h;
}

window.checkAnswer = function(i) {
    if(i === QUIZ_DATA[qIdx].r) {
        document.getElementById('quizBox').innerHTML = `<div class="text-green-500 font-bold p-4 text-center">Excelente! 🏆 <br><span class="text-[10px] opacity-70">Você domina o Agro do futuro.</span></div>`;
    } else {
        alert("Tente novamente! A tecnologia evolui com a persistência.");
    }
};

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    // Reinicia ícones para garantir visibilidade
    lucide.createIcons();
}