// ===== ESENCIA MASCULINA - JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES GLOBALES =====
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    const categoryCards = document.querySelectorAll('.fragrance-category-card');
    const newsletterForm = document.querySelector('.newsletter-form');
    const body = document.body;

    // ===== HEADER SCROLL EFFECT =====
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== HAMBURGER MENU =====
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('mobile-menu-open');
            
            // Actualizar aria-expanded
            hamburger.setAttribute('aria-expanded', !isActive);
        });

        // Cerrar menú al hacer click en un link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('mobile-menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar menú al hacer click fuera (en el overlay)
        body.addEventListener('click', (e) => {
            if (body.classList.contains('mobile-menu-open') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('mobile-menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== CATEGORÍAS INTERACTIVAS =====
    categoryCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Si el click fue en el botón, no hacer nada (el botón tiene su propio handler)
            if (e.target.classList.contains('category-btn')) return;

            const categoryName = this.querySelector('h3').textContent;

            // Animación de click (solo animación, NOTIFICACIÓN se muestra al presionar el botón)
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });

        // Animación hover mejorada
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== BOTONES DE CATEGORÍAS =====
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.fragrance-category-card');
            const categoryName = card.querySelector('h3').textContent;

            // Mostrar notificación indicando carga y luego redirigir a la página de la categoría.
            showNotification(`Cargando colección ${categoryName}...`, 'info');

            // Mapear el data-category a un archivo existente en la carpeta
            const mapping = {
                veraniegas: 'verano.html',
                otonales: 'otono.html',
                invernales: 'invierno.html',
                primaverales: 'primavera.html',
                // soportar antiguas clases/variantes por si acaso
                verano: 'verano.html',
                otono: 'otono.html',
                invierno: 'invierno.html',
                primavera: 'primavera.html'
            };

            const key = card.dataset.category || card.className.split(' ').find(c => mapping[c]);
            const target = mapping[key] || mapping[card.className.split(' ').find(c => mapping[c])] || 'index.html';

            // Pequeña espera para que el usuario vea la notificación antes de navegar.
            // Por defecto 500ms (medio segundo). Se puede ajustar por botón usando
            // un atributo `data-delay="1000"` (ms) si quieres 1s u otro valor.
            const delay = parseInt(this.dataset.delay, 10) || 500;
            setTimeout(() => {
                window.location.href = target;
            }, delay);
        });
    });

    // ===== NEWSLETTER =====
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            const submitBtn = this.querySelector('.newsletter-btn');
            
            if (validateEmail(email)) {
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '⏳ Suscribiendo...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = '✅ ¡Suscrito!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        showNotification('¡Bienvenido! Recibirás nuestras mejores ofertas ', 'success');
                    }, 2000);
                }, 1500);
            } else {
                showNotification(' Por favor ingresa un email válido', 'warning');
                emailInput.focus();
            }
        });
    }

    // ===== VALIDACIÓN DE EMAIL =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Highlight temporal
                target.style.transition = 'background-color 0.3s ease';
                target.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                setTimeout(() => {
                    target.style.backgroundColor = '';
                }, 1000);
            }
        });
    });

    // ===== SISTEMA DE NOTIFICACIONES =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        
        const styles = {
            success: 'var(--primary-gold)',
            info: 'var(--primary-silver)',
            warning: '#f39c12',
            error: '#e74c3c'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${styles[type] || styles.info};
            color: ${type === 'success' ? '#000' : type === 'info' ? '#000' : 'white'};
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 350px;
            font-weight: 600;
            font-size: 0.95rem;
            line-height: 1.4;
            border: 2px solid rgba(0, 0, 0, 0.2);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3500);

        // Click para cerrar
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }

    // ===== INTERSECTION OBSERVER =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.fragrance-category-card, .tip-card, .section-title'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ===== EFECTOS DE PARTÍCULAS EN HERO =====
    function createParticle() {
        const hero = document.querySelector('.perfumes-hero');
        if (!hero) return;

        const particle = document.createElement('div');
        const icons = ['💎', '✨', '⭐', '🌟'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        particle.innerHTML = randomIcon;
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 25 + 15}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: perfumeFloat 25s infinite linear;
            opacity: ${Math.random() * 0.6 + 0.3};
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(particle);
        
        setTimeout(() => {
            if (hero.contains(particle)) {
                hero.removeChild(particle);
            }
        }, 25000);
    }

    // Crear partículas cada 3 segundos
    setInterval(createParticle, 3000);

    // ===== EASTER EGG =====
    let secretCode = [];
    const perfumeSequence = ['p', 'e', 'r', 'f', 'u', 'm', 'e'];

    document.addEventListener('keydown', function(e) {
        secretCode.push(e.key.toLowerCase());
        
        if (secretCode.length > perfumeSequence.length) {
            secretCode.shift();
        }
        
        if (JSON.stringify(secretCode) === JSON.stringify(perfumeSequence)) {
            showNotification(' ¡Código secreto activado! Descuento VIP disponible', 'success');
            
            // Animación especial en todas las cards
            const allCards = document.querySelectorAll('.fragrance-category-card, .tip-card');
            allCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'scale(1.05) rotate(2deg)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 300);
                }, index * 100);
            });
            
            secretCode = [];
        }
    });

    // ===== ACCESIBILIDAD - NAVEGACIÓN POR TECLADO =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Cerrar mobile menu con ESC
        if (e.key === 'Escape' && body.classList.contains('mobile-menu-open')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== PREVENIR SCROLL HORIZONTAL =====
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        // Si el usuario hace swipe desde la derecha, cerrar el menú
        if (body.classList.contains('mobile-menu-open') && touchEndX < touchStartX - 50) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    // ===== PERFORMANCE - LAZY LOADING IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== INICIALIZACIÓN =====
    // ===== SORTING FOR CATEGORY PAGES =====
    function initCategorySorter() {
        const sortSelect = document.querySelector('.sort-select');
        const grid = document.querySelector('.perfumes-grid, .small-perfumes-grid');
        if (!sortSelect || !grid) return;

        function sortGrid(mode) {
            const cards = Array.from(grid.querySelectorAll('.perfume-card'));
            if (!cards.length) return;

            const collator = new Intl.Collator('es', { sensitivity: 'base' });

            cards.sort((a, b) => {
                const nameA = (a.dataset.name || '').trim();
                const nameB = (b.dataset.name || '').trim();
                const priceA = parseFloat(a.dataset.price || '0');
                const priceB = parseFloat(b.dataset.price || '0');

                switch (mode) {
                    case 'name-asc':
                        return collator.compare(nameA, nameB);
                    case 'name-desc':
                        return collator.compare(nameB, nameA);
                    case 'price-asc':
                        return priceA - priceB;
                    case 'price-desc':
                        return priceB - priceA;
                    default:
                        return 0;
                }
            });

            // Re-append in sorted order
            cards.forEach(c => grid.appendChild(c));
        }

        // Initialize with current value
        sortSelect.addEventListener('change', function() {
            sortGrid(this.value);
        });

        // Optionally trigger initial sort if a default is selected
        if (sortSelect.value) sortGrid(sortSelect.value);
    }

    // Run category sorter if there's a sort control on the page
    initCategorySorter();

    // ===== BRAND FILTER (LEFT SIDEBAR) =====
    function initBrandFilter() {
        const grid = document.querySelector('.perfumes-grid, .small-perfumes-grid');
        if (!grid) return;

        const section = grid.closest('.section') || document.querySelector('.section');
        if (!section) return;

        // Avoid inserting multiple sidebars
        if (section.querySelector('.brand-sidebar')) return;

        const cards = Array.from(grid.querySelectorAll('.perfume-card'));
        if (!cards.length) return;

        // Collect brands from data-brand or from .perfume-brand element
        const brandSet = new Set();
        cards.forEach(c => {
            const b = (c.dataset.brand || '').trim() || (c.querySelector('.perfume-brand') ? c.querySelector('.perfume-brand').textContent.trim() : '');
            if (b) brandSet.add(b);
        });

        if (!brandSet.size) return;

        const sidebar = document.createElement('aside');
        sidebar.className = 'brand-sidebar';

        const title = document.createElement('h4');
        title.textContent = 'Filtrar por marca';
        sidebar.appendChild(title);

        const form = document.createElement('div');
        form.className = 'brand-filter';

        // 'All' option
        const allLabel = document.createElement('label');
        const allCheckbox = document.createElement('input');
        allCheckbox.type = 'checkbox';
        allCheckbox.checked = true;
        allCheckbox.dataset.brand = 'ALL';
        allLabel.appendChild(allCheckbox);
        allLabel.appendChild(document.createTextNode('Todas'));
        form.appendChild(allLabel);

        // Create checkbox for each brand
        Array.from(brandSet).sort().forEach(brand => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = brand;
            input.dataset.brand = brand;
            label.appendChild(input);
            label.appendChild(document.createTextNode(brand));
            form.appendChild(label);
        });

        sidebar.appendChild(form);

        // Wrap grid and sidebar
        const wrapper = document.createElement('div');
        wrapper.className = 'category-grid-with-sidebar';

        // Move grid into wrapper
        grid.parentNode.insertBefore(wrapper, grid);
        wrapper.appendChild(sidebar);
        wrapper.appendChild(grid);

        // Filtering logic
        function applyFilter() {
            const checked = Array.from(form.querySelectorAll('input[type="checkbox"]:not([data-brand="ALL"])')).filter(i => i.checked).map(i => i.value);

            const allChecked = form.querySelector('input[data-brand="ALL"]').checked;

            cards.forEach(card => {
                const brand = (card.dataset.brand || (card.querySelector('.perfume-brand') ? card.querySelector('.perfume-brand').textContent.trim() : '') || '').trim();
                const matches = allChecked || checked.length === 0 || checked.includes(brand);
                if (matches) {
                    card.classList.remove('perfume-hidden');
                } else {
                    card.classList.add('perfume-hidden');
                }
            });
        }

        // Event handlers
        form.addEventListener('change', (e) => {
            const target = e.target;
            if (target && target.dataset && target.dataset.brand === 'ALL') {
                // If 'All' clicked, toggle others
                const checked = target.checked;
                form.querySelectorAll('input[type="checkbox"]').forEach(inp => {
                    if (inp.dataset.brand !== 'ALL') inp.checked = false;
                });
            } else {
                // If any specific brand is checked, uncheck 'All'
                const anyChecked = Array.from(form.querySelectorAll('input[type="checkbox"]:not([data-brand="ALL"])')).some(i => i.checked);
                form.querySelector('input[data-brand="ALL"]').checked = !anyChecked;
            }

            applyFilter();
        });

        // Initial apply
        applyFilter();
    }

    // Run brand filter initializer
    initBrandFilter();

    // ===== PERFUME MODALS =====
    function initPerfumeModals() {
        // Reuse a single modal element
        let modalOverlay = null;

        function buildModal() {
            modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';

            const modal = document.createElement('div');
            modal.className = 'modal';

            modal.innerHTML = `
                <div class="modal-header">
                    <div style="display:flex;gap:1rem;align-items:center;">
                        <div class="modal-emoji" style="font-size:2.4rem;">🧴</div>
                        <div>
                            <div class="modal-title">Título</div>
                            <div class="modal-sub">Marca · Precio</div>
                            <div class="modal-desc" style="margin-top:0.4rem;color:var(--text-secondary);font-size:0.95rem;">Mini resumen...</div>
                        </div>
                    </div>
                    <div><button class="modal-close" aria-label="Cerrar">✕</button></div>
                </div>
                <div class="modal-badges" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.8rem;"></div>
                <div class="modal-grid"></div>
            `;

            modalOverlay.appendChild(modal);

            // Close handlers
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });

            modal.querySelector('.modal-close').addEventListener('click', closeModal);

            // close on ESC
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') closeModal();
            });

            return modalOverlay;
        }

        function openModalForCard(card) {
            if (!modalOverlay) document.body.appendChild(buildModal());
            if (!document.body.contains(modalOverlay)) document.body.appendChild(modalOverlay);

            const modal = modalOverlay.querySelector('.modal');

            const titleEl = modal.querySelector('.modal-title');
            const subEl = modal.querySelector('.modal-sub');
            const descEl = modal.querySelector('.modal-desc');
            const emojiEl = modal.querySelector('.modal-emoji');
            const badgesEl = modal.querySelector('.modal-badges');
            const gridEl = modal.querySelector('.modal-grid');

            const name = card.dataset.name || card.querySelector('.perfume-name')?.textContent || 'Perfume';
            const brand = card.dataset.brand || card.querySelector('.perfume-brand')?.textContent || '';
            const price = card.dataset.price ? `$${card.dataset.price}` : card.querySelector('.perfume-price')?.textContent || '';
            const desc = card.dataset.desc || '';
            const emoji = card.querySelector('.perfume-bottle') ? card.querySelector('.perfume-bottle').textContent.trim() : '';

            // Try to infer category from classList if present
            const knownCats = ['veraniegas','otonales','invernales','primaverales'];
            let category = '';
            card.classList.forEach(cl => { if (knownCats.includes(cl)) category = cl; });

            titleEl.textContent = name;
            subEl.textContent = `${brand} · ${price}`;
            descEl.textContent = desc || 'Descripción no disponible.';
            emojiEl.textContent = emoji || '🧴';

            // Badges: brand + category
            badgesEl.innerHTML = '';
            if (brand) {
                const b = document.createElement('span');
                b.textContent = brand;
                b.style.cssText = 'background: rgba(212,175,55,0.12);color:var(--primary-gold);padding:0.25rem 0.6rem;border-radius:999px;font-weight:700;font-size:0.85rem;border:1px solid rgba(212,175,55,0.16);';
                badgesEl.appendChild(b);
            }
            if (category) {
                const c = document.createElement('span');
                c.textContent = category.replace(/s$/,'');
                c.style.cssText = 'background: rgba(255,255,255,0.02);color:var(--text-secondary);padding:0.25rem 0.6rem;border-radius:999px;font-weight:600;font-size:0.85rem;border:1px solid var(--border-light);';
                badgesEl.appendChild(c);
            }

            // Build a small grid of variants/options for this perfume
            gridEl.innerHTML = '';

            // Create a few options (sizes / concentraciones) for demo
            const sampleOptions = [
                {name: 'Eau de Parfum 50ml', price: parseFloat(card.dataset.price || '0')},
                {name: 'Eau de Parfum 100ml', price: parseFloat(card.dataset.price || '0') + 20},
                {name: 'Eau de Toilette 50ml', price: Math.max(0, parseFloat(card.dataset.price || '0') - 10)},
                {name: 'Travel 10ml', price: Math.max(0, Math.floor((parseFloat(card.dataset.price || '0') / 6)))},
                {name: 'Discovery Set', price: Math.max(0, Math.floor((parseFloat(card.dataset.price || '0') / 3)))},
                {name: 'Refill 200ml', price: Math.max(0, parseFloat(card.dataset.price || '0') + 50)}
            ];

            // Render options as read-only (no interaction) so the choices cannot be modified by the user
            sampleOptions.forEach(opt => {
                const item = document.createElement('div');
                item.className = 'modal-option';
                item.setAttribute('aria-disabled', 'true');
                item.title = 'Opciones de producto (solo lectura)';
                item.innerHTML = `<div class="opt-name">${opt.name}</div><div class="opt-price">$${opt.price}</div>`;

                // Make clearly non-interactive
                item.style.cursor = 'default';
                item.style.pointerEvents = 'none';
                item.style.opacity = '0.95';

                gridEl.appendChild(item);
            });

            // Show
            modalOverlay.style.display = 'flex';
            setTimeout(() => modalOverlay.style.opacity = '1', 10);
        }

        function closeModal() {
            if (!modalOverlay) return;
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                if (modalOverlay && modalOverlay.parentNode) modalOverlay.parentNode.removeChild(modalOverlay);
            }, 250);
        }

        // Attach click handlers to perfume cards
        function attachHandlers() {
            const allCards = document.querySelectorAll('.perfume-card');
            allCards.forEach(card => {
                // Avoid double-binding
                if (card.dataset.modalBound) return;
                card.addEventListener('click', (e) => {
                    // If the click was on a button inside the card (Comprar), ignore here
                    if (e.target.closest('.perfume-btn')) return;
                    openModalForCard(card);
                });
                card.dataset.modalBound = '1';
            });
        }

        // Initial attach
        attachHandlers();

        // If sorter reorders nodes, handlers remain attached; if brand filter rebuilds grid we re-run attach
        // Observe grid for childlist changes and re-attach when nodes are added
        const grids = document.querySelectorAll('.perfumes-grid, .small-perfumes-grid');
        grids.forEach(g => {
            const mo = new MutationObserver(() => attachHandlers());
            mo.observe(g, { childList: true, subtree: false });
        });
    }

    initPerfumeModals();

    // ===== LAYOUT CONTROLS =====
    // Allow switching between grid / compact / list layouts and persist choice per-page/grid
    function applyLayoutToGrid(grid, mode) {
        if (!grid) return;
        const classMap = {
            grid: 'layout-grid',
            list: 'layout-list'
        };
        // remove any layout classes
        grid.classList.remove('layout-grid', 'layout-compact', 'layout-list');
        const cls = classMap[mode] || classMap.grid;
        grid.classList.add(cls);
    }

    function setActiveButton(controls, mode) {
        if (!controls) return;
        const btns = controls.querySelectorAll('.layout-btn');
        btns.forEach(b => b.classList.toggle('active', b.dataset.layout === mode));
    }

    function initLayoutControls() {
        const bars = document.querySelectorAll('.sort-bar');
        bars.forEach(bar => {
            if (bar.dataset.layoutControlsBound) return;

            // Create controls container
            const controls = document.createElement('div');
            controls.className = 'layout-controls';
            // two groups: wrapper layout (split / stacked) + grid layout (grid / compact / list)
            controls.innerHTML = `
                <button class="layout-wrapper-btn" data-wrapper="split" title="Side by side">▤</button>
                <button class="layout-wrapper-btn" data-wrapper="stacked" title="Stacked">≡</button>
                <span style="width:8px"></span>
                <button class="layout-btn" data-layout="grid" title="Grid">▦</button>
                <button class="layout-btn" data-layout="list" title="List">≣</button>
            `;

            bar.appendChild(controls);

            // Find the associated grid (main content area)
            const parent = bar.closest('.category-grid-with-sidebar') || document;
            const grid = parent.querySelector('.small-perfumes-grid, .perfumes-grid');

            // Build a storage key scoped to path + grid type
            const gridType = grid ? (grid.classList.contains('small-perfumes-grid') ? 'small' : 'large') : 'unknown';
            const storageKey = `layoutMode:${window.location.pathname}:${gridType}`;

            // Wrapper layout storage (split | stacked)
            const wrapperStorageKey = `wrapperLayout:${window.location.pathname}`;

            // Apply initial grid mode from localStorage (default: grid)
            const initial = localStorage.getItem(storageKey) || 'grid';
            applyLayoutToGrid(grid, initial);
            setActiveButton(controls, initial);

            // Apply initial wrapper layout (default: split)
            const initialWrapper = localStorage.getItem(wrapperStorageKey) || 'split';
            if (parent && parent.classList) {
                parent.classList.remove('layout-split', 'layout-stacked');
                parent.classList.add(`layout-${initialWrapper}`);
            }
            // mark wrapper buttons active
            const wrapperBtns = controls.querySelectorAll('.layout-wrapper-btn');
            wrapperBtns.forEach(b => b.classList.toggle('active', b.dataset.wrapper === initialWrapper));

            // Listen for clicks (both wrapper and grid/list layout buttons)
            controls.addEventListener('click', (e) => {
                // grid/list layout buttons
                const btn = e.target.closest('.layout-btn');
                if (btn) {
                    const mode = btn.dataset.layout;
                    // only allow 'grid' or 'list' (ignore any other values)
                    const allowed = mode === 'list' ? 'list' : 'grid';
                    applyLayoutToGrid(grid, allowed);
                    setActiveButton(controls, allowed);
                    try { localStorage.setItem(storageKey, allowed); } catch (err) { /* ignore storage errors */ }
                    return;
                }

                // wrapper layout buttons
                const wbtn = e.target.closest('.layout-wrapper-btn');
                if (wbtn && parent && parent.classList) {
                    const wmode = wbtn.dataset.wrapper; // 'split' | 'stacked'
                    parent.classList.remove('layout-split', 'layout-stacked');
                    parent.classList.add(`layout-${wmode}`);
                    // update active states
                    wrapperBtns.forEach(b => b.classList.toggle('active', b === wbtn));
                    try { localStorage.setItem(wrapperStorageKey, wmode); } catch (err) { /* ignore */ }
                    return;
                }
            });

            bar.dataset.layoutControlsBound = '1';
        });
    }

    // Initialize layout controls on the page
    initLayoutControls();

    // ===== INICIALIZACIÓN =====
    console.log('👔 Esencia Masculina cargado exitosamente!');
    console.log('💡 Tip: Escribe "perfume" para activar el easter egg');

    // Notificación de bienvenida (solo en la página principal)
    try {
        const path = window.location.pathname || '';
        const isIndex = path.endsWith('index.html') || path === '/' || path === '';
        if (isIndex) {
            setTimeout(() => {
                showNotification('¡Bienvenido a Esencia Masculina!', 'success');
            }, 1000);
        }
    } catch (err) {
        // si algo falla, no bloquear la ejecución
        console.error('Error comprobando ruta para notificación de bienvenida', err);
    }

    // Log de versión
    console.log('%c Esencia Masculina v2.0 ', 
        'background: linear-gradient(135deg, #D4AF37, #C0C0C0); color: #000; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
    );
});