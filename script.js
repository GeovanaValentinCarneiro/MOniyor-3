document.addEventListener("DOMContentLoaded", () => {
    const storageKeys = {
        theme: "biomonitorTheme",
        location: "agrinhoUserLocation"
    };

    const cardData = {
        solo: {
            title: "Solo e nutrição",
            text: "O solo vivo é o coração da agricultura sustentável. Sensores e análises digitais ajudam a acompanhar umidade, matéria orgânica e nutrientes, reduzindo desperdício de insumos."
        },
        agua: {
            title: "Gestão de recursos hídricos",
            text: "A irrigação inteligente combina sensores de umidade, previsão do tempo e manejo por setor. Assim, a água chega na quantidade certa e no momento certo."
        },
        biodiversidade: {
            title: "Biodiversidade protegida",
            text: "Áreas de vegetação, polinizadores e controle biológico reduzem a dependência de químicos e tornam a produção mais resistente a desequilíbrios."
        },
        clima: {
            title: "Clima e atmosfera",
            text: "Estações meteorológicas e dados digitais ajudam a antecipar ondas de calor, geadas e períodos secos, melhorando a tomada de decisão no campo."
        }
    };

    const biomeData = {
        amazonia: {
            symbol: "AM",
            name: "Amazônia",
            prod: "Manejo de cacau, castanha e sistemas agroflorestais com rastreabilidade.",
            tech: "Sensores térmicos, satélites e alertas contra desmatamento e incêndios.",
            score: 94
        },
        cerrado: {
            symbol: "CE",
            name: "Cerrado",
            prod: "Grãos com plantio direto, rotação de culturas e conservação de solo.",
            tech: "Integração Lavoura-Pecuária-Floresta e sensores de umidade no solo.",
            score: 88
        },
        pantanal: {
            symbol: "PA",
            name: "Pantanal",
            prod: "Pecuária extensiva adaptada aos ciclos de cheia e áreas naturais.",
            tech: "Mapeamento hídrico e monitoramento remoto de pastagens nativas.",
            score: 91
        },
        caatinga: {
            symbol: "CA",
            name: "Caatinga",
            prod: "Fruticultura irrigada de precisão e convivência produtiva com o semiárido.",
            tech: "Microaspersão, energia solar e manejo para reduzir evaporação.",
            score: 85
        },
        mata_atlantica: {
            symbol: "MA",
            name: "Mata Atlântica",
            prod: "Agroflorestas com café, erva-mate, palmito e restauração de paisagens.",
            tech: "Drones para reflorestamento e mapeamento de corredores ecológicos.",
            score: 89
        },
        pampa: {
            symbol: "PM",
            name: "Pampa",
            prod: "Pastoreio rotacionado com proteção de campos nativos.",
            tech: "Softwares de biomassa, cercas inteligentes e acompanhamento de solo.",
            score: 87
        }
    };

    const regionData = {
        oeste: {
            name: "Oeste produtivo",
            focus: "Biogás, cooperativismo e rastreabilidade",
            text: "A integração entre grãos e produção animal cria oportunidades para transformar resíduos em energia e melhorar o controle da cadeia produtiva.",
            items: [
                "Biodigestores e geração de energia renovável.",
                "Sensores para uso eficiente de água e ração.",
                "Rastreabilidade entre propriedade, cooperativa e consumidor."
            ]
        },
        norte: {
            name: "Norte conectado",
            focus: "Café, clima e conservação do solo",
            text: "A diversidade agrícola da região combina tradição cafeeira com ferramentas digitais para acompanhar clima, umidade e condições do solo.",
            items: [
                "Alertas antecipados para seca, calor e geada.",
                "Cobertura vegetal e mapas de fertilidade.",
                "Assistência técnica digital para pequenas propriedades."
            ]
        },
        campos: {
            name: "Campos Gerais integrados",
            focus: "Plantio direto, leite e integração de sistemas",
            text: "Grãos, pecuária leiteira e áreas conservadas podem ser planejados como um sistema único, comparando produtividade e qualidade ambiental.",
            items: [
                "Plantio direto orientado por mapas de solo.",
                "Integração lavoura-pecuária para recuperar áreas.",
                "Indicadores de produtividade, carbono e cobertura vegetal."
            ]
        },
        litoral: {
            name: "Litoral e Serra do Mar",
            focus: "Mata Atlântica, água e produção local",
            text: "Em uma paisagem ambientalmente sensível, a tecnologia ajuda a fortalecer a agricultura familiar e a proteger rios, encostas e biodiversidade.",
            items: [
                "Monitoramento de encostas e áreas de preservação.",
                "Produção local com rastreabilidade e identidade regional.",
                "Dados para proteger rios e planejar o uso do solo."
            ]
        }
    };

    const query = (selector, parent = document) => parent.querySelector(selector);
    const queryAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

    const menuToggle = query(".menu-toggle");
    const navPanel = query("#primary-menu");
    const themeToggle = query("#themeToggle");
    const themeIcon = query("#themeIcon");
    const backToTop = query("#backToTop");

    function closeMenu() {
        if (!menuToggle || !navPanel) return;
        navPanel.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    function openModal(modal) {
        if (!modal) return;
        modal.classList.remove("is-hidden");
        const closeButton = query(".modal-close", modal);
        if (closeButton) closeButton.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.add("is-hidden");
    }

    function updateTheme(isLight) {
        document.body.classList.toggle("light-mode", isLight);
        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(isLight));
            themeToggle.setAttribute("title", isLight ? "Ativar modo escuro" : "Ativar modo claro");
        }
        if (themeIcon) themeIcon.textContent = isLight ? "☾" : "☼";
        localStorage.setItem(storageKeys.theme, isLight ? "light" : "dark");
    }

    function setupBiomeOutlines() {
        const map = query("#monitor .biome-map");
        const outlineLayer = query(".biome-outline-layer", map);
        if (!map || !outlineLayer || outlineLayer.children.length) return;

        queryAll(".biome-path", map).forEach((path) => {
            const outline = document.createElementNS("http://www.w3.org/2000/svg", "path");
            outline.setAttribute("d", path.getAttribute("d"));
            outline.dataset.biome = path.dataset.biome;
            outline.classList.add("biome-outline");
            outlineLayer.appendChild(outline);
        });
    }

    function setBiomePreview(biomeKey, isVisible) {
        const map = query("#monitor .biome-map");
        if (!map) return;

        const path = query(`.biome-path[data-biome="${biomeKey}"]`, map);
        const outline = query(`.biome-outline[data-biome="${biomeKey}"]`, map);
        path?.classList.toggle("is-preview", isVisible);
        outline?.classList.toggle("is-preview", isVisible);
    }

    function setBiome(biomeKey) {
        const data = biomeData[biomeKey];
        if (!data) return;

        let selectedPath = null;
        queryAll("#monitor .biome-path").forEach((path) => {
            const isSelected = path.dataset.biome === biomeKey;
            path.classList.toggle("active", isSelected);
            if (isSelected) selectedPath = path;
        });

        queryAll("#monitor .biome-outline").forEach((outline) => {
            outline.classList.toggle("active", outline.dataset.biome === biomeKey);
        });

        queryAll("[data-biome-button]").forEach((button) => {
            const isSelected = button.dataset.biomeButton === biomeKey;
            button.classList.toggle("active", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        const selectedColor = selectedPath
            ? getComputedStyle(selectedPath).getPropertyValue("--biome-color").trim()
            : "";
        if (selectedColor) query("#monitor")?.style.setProperty("--selected-biome-color", selectedColor);

        const placeholder = query("#placeholderMsg");
        const content = query("#contentArea");
        if (placeholder) placeholder.classList.add("is-hidden");
        if (content) content.classList.remove("is-hidden");

        query("#bName").textContent = data.name;
        query("#bProd").textContent = data.prod;
        query("#bCons").textContent = data.tech;
        query("#susVal").textContent = `${data.score}%`;
        query("#susFill").style.width = `${data.score}%`;
        replayContentAnimation(content);
    }

    function renderPins() {
        const pinContainer = query("#pinContainer");
        if (!pinContainer) return;

        const ghostPins = [
            { x: 32, y: 24 },
            { x: 78, y: 36 },
            { x: 60, y: 49 },
            { x: 68, y: 64 },
            { x: 52, y: 80 }
        ];

        pinContainer.innerHTML = "";

        ghostPins.forEach((point) => {
            const pin = document.createElement("span");
            pin.className = "marker-pin ghost-pin";
            pin.setAttribute("aria-hidden", "true");
            pin.style.left = `${point.x}%`;
            pin.style.top = `${point.y}%`;
            pinContainer.appendChild(pin);
        });

        const saved = localStorage.getItem(storageKeys.location);
        if (!saved) return;

        try {
            const coords = JSON.parse(saved);
            const safeX = Math.max(10, Math.min(90, Number(coords.x)));
            const safeY = Math.max(16, Math.min(90, Number(coords.y)));
            const userPin = document.createElement("span");
            userPin.className = "marker-pin user-pin";
            userPin.style.left = `${safeX}%`;
            userPin.style.top = `${safeY}%`;
            const label = document.createElement("span");
            label.className = "pin-label";
            label.textContent = "Você";
            userPin.appendChild(label);
            pinContainer.appendChild(userPin);
        } catch (error) {
            localStorage.removeItem(storageKeys.location);
        }
    }

    function setRegion(regionKey) {
        const data = regionData[regionKey];
        if (!data) return;

        queryAll(".region-marker").forEach((marker) => {
            marker.classList.toggle("active", marker.dataset.region === regionKey);
        });

        query("#regionName").textContent = data.name;
        query("#regionFocus").textContent = data.focus;
        query("#regionText").textContent = data.text;

        const list = query("#regionList");
        if (!list) return;
        list.innerHTML = "";
        data.items.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
        replayContentAnimation(query(".region-detail"));
    }

    function animateCounters() {
        queryAll(".counter").forEach((counter) => {
            const target = Number(counter.dataset.target || 0);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 35));
            const run = () => {
                current = Math.min(target, current + step);
                counter.textContent = String(current);
                if (current < target) window.requestAnimationFrame(run);
            };
            run();
        });
    }

    function replayContentAnimation(element) {
        if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        element.classList.remove("content-enter");
        window.requestAnimationFrame(() => element.classList.add("content-enter"));
    }

    function setupScrollReveals() {
        const revealGroups = [
            ".section-heading",
            ".pillar-card",
            ".monitor-layout > *",
            ".split-grid > *",
            ".info-card",
            ".parana-layout > *",
            ".impact-grid article",
            ".timeline li",
            ".reference-grid a"
        ];
        const elements = queryAll(revealGroups.join(","));
        if (!elements.length) return;

        elements.forEach((element, index) => {
            element.classList.add("reveal-item", `reveal-delay-${index % 4}`);
            if (element.matches(".monitor-layout > :first-child, .parana-layout > :first-child, .split-grid > :nth-child(odd)")) {
                element.classList.add("reveal-left");
            }
            if (element.matches(".monitor-layout > :last-child, .parana-layout > :last-child, .split-grid > :nth-child(even)")) {
                element.classList.add("reveal-right");
            }
        });

        document.body.classList.add("reveal-enabled");

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

        elements.forEach((element) => revealObserver.observe(element));
    }

    if (menuToggle && navPanel) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navPanel.classList.toggle("is-open");
            document.body.classList.toggle("menu-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        queryAll(".nav-panel a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    queryAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");
            if (!selector || selector === "#") return;

            const target = query(selector);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });

            if (window.location.protocol !== "file:") {
                window.history.replaceState(null, "", selector);
            }
        });
    });

    if (themeToggle) {
        const savedTheme = localStorage.getItem(storageKeys.theme);
        updateTheme(savedTheme === "light");
        themeToggle.addEventListener("click", () => {
            updateTheme(!document.body.classList.contains("light-mode"));
        });
    }

    queryAll(".pillar-card").forEach((card) => {
        card.addEventListener("click", () => {
            const data = cardData[card.dataset.card];
            const modal = query("#agroCardModal");
            if (!data || !modal) return;
            query("#agroModalTitle").textContent = data.title;
            query("#agroModalText").textContent = data.text;
            openModal(modal);
        });
    });

    queryAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal(modal);
        });
    });

    queryAll("[data-close-modal]").forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(query(`#${button.dataset.closeModal}`));
        });
    });

    const openMapButton = query("#openMapModalBtn");
    const locationModal = query("#locationModal");
    const closeMapButton = query("#closeMapModalBtn");
    if (openMapButton && locationModal) {
        openMapButton.addEventListener("click", () => {
            renderPins();
            openModal(locationModal);
        });
    }
    if (closeMapButton && locationModal) {
        closeMapButton.addEventListener("click", () => closeModal(locationModal));
    }

    queryAll("#monitor .biome-path").forEach((path) => {
        path.setAttribute("tabindex", "0");
        path.setAttribute("role", "button");
        path.addEventListener("pointerenter", () => setBiomePreview(path.dataset.biome, true));
        path.addEventListener("pointerleave", () => setBiomePreview(path.dataset.biome, false));
        path.addEventListener("click", () => setBiome(path.dataset.biome));
        path.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setBiome(path.dataset.biome);
            }
        });
    });

    queryAll("[data-biome-button]").forEach((button) => {
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("pointerenter", () => setBiomePreview(button.dataset.biomeButton, true));
        button.addEventListener("pointerleave", () => setBiomePreview(button.dataset.biomeButton, false));
        button.addEventListener("focus", () => setBiomePreview(button.dataset.biomeButton, true));
        button.addEventListener("blur", () => setBiomePreview(button.dataset.biomeButton, false));
        button.addEventListener("click", () => setBiome(button.dataset.biomeButton));
    });

    const modalMapWrapper = query("#modalMapWrapper");
    if (modalMapWrapper) {
        modalMapWrapper.addEventListener("click", (event) => {
            if (!(event.target instanceof SVGPathElement)) return;
            const rect = modalMapWrapper.getBoundingClientRect();
            const x = Math.max(10, Math.min(90, ((event.clientX - rect.left) / rect.width) * 100));
            const y = Math.max(16, Math.min(90, ((event.clientY - rect.top) / rect.height) * 100));
            localStorage.setItem(storageKeys.location, JSON.stringify({ x, y }));
            renderPins();
        });
    }

    queryAll(".region-marker").forEach((marker) => {
        marker.addEventListener("click", () => setRegion(marker.dataset.region));
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("is-hidden", window.scrollY < 420);
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        queryAll(".modal").forEach(closeModal);
        closeMenu();
    });

    if ("IntersectionObserver" in window) {
        let hasAnimated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.35 });
        const impact = query("#impacto");
        if (impact) observer.observe(impact);
    } else {
        animateCounters();
    }

    setupBiomeOutlines();
    setRegion("oeste");
    renderPins();
    setupScrollReveals();
});
