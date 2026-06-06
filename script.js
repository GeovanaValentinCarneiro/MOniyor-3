document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INICIALIZAÇÃO
    lucide.createIcons();
    AOS.init({ duration: 1000, once: true });

    // 2. DADOS DOS BIOMAS
    const biomeData = {
        amazonia: { name: "Amazônia", emoji: "🌳", prod: "Sistemas agroflorestais extrativistas de impacto nulo.", tech: "Drones de monitoramento ultra-espectral contra incêndios.", sus: 98 },
        cerrado: { name: "Cerrado", emoji: "🌾", prod: "Grãos de alta performance com plantio direto no solo.", tech: "Sensores IoT subterrâneos de controle hídrico.", sus: 85 },
        pantanal: { name: "Pantanal", emoji: "🐊", prod: "Pecuária extensiva ecológica adaptada aos ciclos de cheia.", tech: "Rastreamento via satélite das pastagens nativas.", sus: 92 },
        caatinga: { name: "Caatinga", emoji: "🌵", prod: "Culturas xerófitas de convivência com o semiárido.", tech: "Sistemas avançados de microirrigação localizada.", sus: 88 },
        mata_atlantica: { name: "Mata Atlântica", emoji: "🐆", prod: "Silvicultura sustentável e cinturões verdes orgânicos.", tech: "Mapeamento aéreo por Inteligência Artificial.", sus: 90 },
        pampa: { name: "Pampa", emoji: "🐎", prod: "Manejo de pastagem rotativa preservando o campo nativo.", tech: "Softwares inteligentes de gerenciamento pecuário.", sus: 94 }
    };

    // 3. INTERATIVIDADE DO MONITOR DE BIOMAS
    const paths = document.querySelectorAll("#monitor .biome-path");
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

    // 4. LÓGICA DO MAPA MODAL
    const openMapModalBtn = document.getElementById("openMapModalBtn");
    const closeMapModalBtn = document.getElementById("closeMapModalBtn");
    const locationModal = document.getElementById("locationModal");
    const modalContent = document.getElementById("modalContent");
    const modalMapWrapper = document.getElementById("modalMapWrapper");
    const pinContainer = document.getElementById("pinContainer");

    // Alfinetes simulados de outros estudantes
    const ghostPins = [
        { x: 32, y: 24 }, // Ponto na Amazônia (Norte)
        { x: 80, y: 36 }, // Ponto na Caatinga (Nordeste)
        { x: 60, y: 48 }, // Ponto no Cerrado (Centro-Oeste)
        { x: 68, y: 64 }, // Ponto na Mata Atlântica (Sudeste)
        { x: 52, y: 80 }  // Ponto no Pampa (Sul)
    ];

    // Função central para desenhar todos os alfinetes na tela
    const renderAllPins = () => {
        pinContainer.innerHTML = ''; 

        // Desenhar alfinetes fantasmas (Outros participantes)
        ghostPins.forEach(p => {
            const pin = document.createElement("div");
            pin.innerText = "📌";
            pin.className = "marker-pin opacity-60 scale-90"; 
            pin.style.left = `${p.x}%`;
            pin.style.top = `${p.y}%`;
            pinContainer.appendChild(pin);
        });

        // Procurar e desenhar o alfinete real salvo pelo usuário
        const savedCoordinates = localStorage.getItem("agrinhoUserLocation");
        if (savedCoordinates) {
            const coords = JSON.parse(savedCoordinates);
            const userPin = document.createElement("div");
            userPin.innerText = "📍"; 
            userPin.className = "marker-pin z-10 animate-bounce"; 
            userPin.style.left = `${coords.x}%`;
            userPin.style.top = `${coords.y}%`;

            const badge = document.createElement("span");
            badge.innerText = "Você";
            badge.className = "absolute -top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] px-1 rounded font-bold uppercase tracking-wide shadow-md";
            userPin.appendChild(badge);

            pinContainer.appendChild(userPin);
        }
    };

    renderAllPins();

    // Abrir e Fechar Modal
    openMapModalBtn.addEventListener("click", () => {
        locationModal.classList.remove("hidden");
        setTimeout(() => {
            locationModal.classList.remove("opacity-0");
            modalContent.classList.remove("scale-95");
        }, 10);
    });

    const closeModal = () => {
        locationModal.classList.add("opacity-0");
        modalContent.classList.add("scale-95");
        setTimeout(() => {
            locationModal.classList.add("hidden");
        }, 300);
    };

    closeMapModalBtn.addEventListener("click", closeModal);
    locationModal.addEventListener("click", (e) => {
        if (e.target === locationModal) closeModal();
    });

    // 🛑 AQUI ESTÁ A LÓGICA ATUALIZADA COM O CLAMPING NAS BORDAS
    modalMapWrapper.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() !== 'path') return;

        const rect = modalMapWrapper.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let percentX = (x / rect.width) * 100;
        let percentY = (y / rect.height) * 100;

        // Limita as coordenadas para o alfinete não vazar da caixa invisível
        percentX = Math.max(5, Math.min(90, percentX));
        percentY = Math.max(10, Math.min(95, percentY));

        const userLocation = { x: percentX, y: percentY };
        localStorage.setItem("agrinhoUserLocation", JSON.stringify(userLocation));

        renderAllPins();
    });

    // 5. ANIMAR CONTADORES DE IMPACTO
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

    // 6. DARK / LIGHT MODE
    const darkToggle = document.getElementById("darkToggle");
    const iconMoon = document.getElementById("iconMoon");
    const iconSun = document.getElementById("iconSun");

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        
        if (isLight) {
            iconMoon.classList.add("hidden");
            iconSun.classList.remove("hidden");
        } else {
            iconMoon.classList.remove("hidden");
            iconSun.classList.add("hidden");
        }
    });

    // 7. BOTÃO VOLTAR AO TOPO
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