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

    // ===== INICIALIZACIÓN =====
    console.log('👔 Esencia Masculina cargado exitosamente!');
    console.log('💡 Tip: Escribe "perfume" para activar el easter egg');

    // Notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a Esencia Masculina!', 'success');
    }, 1000);

    // Log de versión
    console.log('%c Esencia Masculina v2.0 ', 
        'background: linear-gradient(135deg, #D4AF37, #C0C0C0); color: #000; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
    );
});