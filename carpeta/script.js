// ===== ESENCIA MASCULINA - JAVASCRIPT MEJORADO =====
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
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
        }
    }, { passive: true });

    // ===== HAMBURGER MENU =====
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    function closeMobileMenu() {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('active');
    }

    // ===== MODALES DE PERFUMES - FUNCIÓN OPTIMIZADA =====
    function initPerfumeModals() {
        const modal = document.getElementById('perfume-modal');
        const modalClose = document.querySelector('.modal-close');
        
        if (!modal) return; // Exit si no existe el modal

        // Cache de elementos del modal
        const modalElements = {
            name: document.getElementById('modal-name'),
            price: document.getElementById('modal-price'),
            brand: document.getElementById('modal-brand'),
            desc: document.getElementById('modal-desc'),
            image: document.getElementById('modal-image')
        };

        // Función para abrir modal
        const openModal = (card) => {
            // Asignar datos usando dataset
            Object.entries({
                name: card.dataset.name,
                price: `$${card.dataset.price}`,
                brand: card.dataset.brand,
                desc: card.dataset.desc
            }).forEach(([key, value]) => {
                if (modalElements[key]) modalElements[key].textContent = value;
            });

            // Asignar imagen
            if (modalElements.image) {
                modalElements.image.src = card.dataset.image || '';
                modalElements.image.alt = card.dataset.name || 'Perfume';
            }

            modal.classList.add('active');
            // Guardar posición actual del scroll
            const scrollPosition = window.scrollY;
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.top = `-${scrollPosition}px`;
            body.style.width = '100%';
        };

        // Función para cerrar modal
        const closeModal = () => {
            modal.classList.remove('active');
            const scrollPosition = parseInt(body.style.top || '0') * -1;
            body.style.overflow = 'auto';
            body.style.position = 'static';
            body.style.top = 'auto';
            window.scrollTo(0, scrollPosition);
        };

        // Event Listeners para tarjetas de perfume
        const perfumeCards = document.querySelectorAll('.perfume-card');
        perfumeCards.forEach(card => {
            card.addEventListener('click', () => openModal(card));
        });

        // Event Listeners para cerrar modal
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Cerrar modal al hacer click fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ===== CATEGORÍAS INTERACTIVAS =====
    categoryCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.setProperty('--hover-scale', '1.02');
        });
    });

    // ===== BOTONES DE CATEGORÍAS =====
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) window.location.href = href;
        });
    });

    // ===== NEWSLETTER =====
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (validateEmail(email)) {
                showNotification('¡Gracias por suscribirte!', 'success');
                this.reset();
            } else {
                showNotification('Por favor, ingresa un email válido', 'error');
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
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMobileMenu();
            }
        });
    });

    // ===== SISTEMA DE NOTIFICACIONES =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00D4AA' : type === 'error' ? '#FF6B6B' : '#4ECDC4'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // ===== INTERSECTION OBSERVER =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideInUp 0.6s ease forwards`;
                entry.target.style.animationDelay = `${index * 0.1}s`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.fragrance-category-card, .tip-card, .section-title, .stat-item'
    );
    
    elementsToAnimate.forEach((el) => observer.observe(el));

    // ===== ORDENAMIENTO DE PERFUMES =====
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const perfumeCards = Array.from(document.querySelectorAll('.perfume-card'));
            const order = this.value;

            perfumeCards.sort((a, b) => {
                const nameA = a.dataset.name || '';
                const nameB = b.dataset.name || '';
                const priceA = parseInt(a.dataset.price) || 0;
                const priceB = parseInt(b.dataset.price) || 0;

                if (order === 'name-asc') return nameA.localeCompare(nameB);
                if (order === 'name-desc') return nameB.localeCompare(nameA);
                if (order === 'price-asc') return priceA - priceB;
                if (order === 'price-desc') return priceB - priceA;
                return 0;
            });

            const container = document.querySelector('.small-perfumes-grid');
            if (container) {
                perfumeCards.forEach(card => container.appendChild(card));
            }
        });
    }

    // ===== INICIALIZAR MODALES DE PERFUMES =====
    initPerfumeModals();
});