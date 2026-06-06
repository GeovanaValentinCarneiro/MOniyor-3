document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INICIALIZAÇÃO DE ICONS E ANIMAÇÕES
    lucide.createIcons();
    AOS.init({ duration: 1000, once: true });

    // 2. ESTRUTURA DE DADOS DOS BIOMAS ORIGINAL
    const biomeData = {
        amazonia: { name: "Amazônia", emoji: "🌳", prod: "Sistemas agroflorestais extrativistas de impacto nulo.", tech: "Drones de monitoramento ultra-espectral contra incêndios.", sus: 98 },
        cerrado: { name: "Cerrado", emoji: "🌾", prod: "Grãos de alta performance com plantio direto no solo.", tech: "Sensores IoT subterrâneos de controle hídrico.", sus: 85 },
        pantanal: { name: "Pantanal", emoji: "🐊", prod: "Pecuária extensiva ecológica adaptada aos ciclos de cheia.", tech: "Rastreamento via satélite das pastagens nativas.", sus: 92 },
        caatinga: { name: "Caatinga", emoji: "🌵", prod: "Culturas xerófitas de convivência com o semiárido.", tech: "Sistemas avançados de microirrigação localizada.", sus: 88 },
        mata_atlantica: { name: "Mata Atlântica", emoji: "🐆", prod: "Silvicultura sustentável e cinturões verdes orgânicos.", tech: "Mapeamento aéreo por Inteligência Artificial.", sus: 90 },
        pampa: { name: "Pampa", emoji: "🐎", prod: "Manejo de pastagem rotativa preservando o campo nativo.", tech: "Softwares inteligentes de gerenciamento pecuário.", sus: 94 }
    };

    // 3. INTERATIVIDADE DO MAPA DE BIOMAS
    const paths = document.querySelectorAll(".biome-path");
    const placeholder = document.getElementById("placeholderMsg");
    const content = document.getElementById("contentArea");

    paths.forEach(path => {
        path.addEventListener("click", () => {
            paths.forEach(p => p.classList.remove("active"));
            path.classList.add("active");

            const bId = path.getAttribute("data-biome");
            const data = biomeData[bId];

            if (data) {
                placeholder.classList.add("hidden");
                content.classList.remove("hidden");

                document.getElementById("bEmoji").innerText = data.emoji;
                document.getElementById("bName").innerText = data.name;
                document.getElementById("bProd").innerText = data.prod;
                document.getElementById("bCons").innerText = data.tech;
                document.getElementById("susVal").innerText = `${data.sus}%`;
                document.getElementById("susFill").style.width = `${data.sus}%`;
            }
        });
    });

    // 4. ANIMAR CONTADORES DE IMPACTO
    const counters = document.querySelectorAll(".counter");
    const speed = 40;

    const startCounters = () => {
        counters.forEach(counter => {
            counter.innerText = "0"; 
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                const inc = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + inc > target ? target : count + inc;
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const impactSection = document.getElementById("impacto");
    let animated = false;
    window.addEventListener("scroll", () => {
        if (impactSection) {
            const rect = impactSection.getBoundingClientRect();
            if (rect.top < (window.innerHeight - 100) && !animated) {
                startCounters();
                animated = true;
            }
        }
    });

    // 5. GERENCIADOR DE DARK / LIGHT MODE
    const darkToggle = document.getElementById("darkToggle");
    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        darkToggle.innerHTML = isLight ? '<i data-lucide="sun" class="w-4 h-4"></i>' : '<i data-lucide="moon" class="w-4 h-4"></i>';
        lucide.createIcons();
    });

    // 6. BOTÃO VOLTAR AO TOPO
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.remove("hidden");
        } else {
            backToTop.classList.add("hidden");
        }
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});