// ===== PRICECOMPARE - JAVASCRIPT INTERACTIVO =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES GLOBALES =====
    const header = document.querySelector('.header');
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const categoryCards = document.querySelectorAll('.category-card');
    const compareButtons = document.querySelectorAll('.compare-btn');
    const perfumesBtn = document.querySelector('.perfumes-btn');

    // ===== HEADER SCROLL EFFECT =====
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== BÚSQUEDA CON ANIMACIONES =====
    function performSearch() {
        if (searchInput.value.trim()) {
            // Animación del botón
            searchBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                searchBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    searchBtn.style.transform = 'scale(1)';
                    showNotification(`🔍 Buscando: "${searchInput.value}"`, 'info');
                }, 150);
            }, 150);
        } else {
            showNotification('⚠️ Por favor ingresa un término de búsqueda', 'warning');
        }
    }

    // Event listeners para la búsqueda
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Efecto de focus en el input
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'var(--primary-red)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(229, 9, 20, 0.2)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.borderColor = 'var(--border-color)';
            this.parentElement.style.boxShadow = 'none';
        });
    }

    // ===== CATEGORY CARDS CON EFECTOS MEJORADOS =====
    categoryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            
            // Animación de click
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
                showNotification(`📂 Explorando categoría: ${categoryName}`, 'success');
            }, 200);
        });

        // Efectos de hover avanzados
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Efecto de brillo en el icono
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Restaurar icono
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Animación de entrada escalonada
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // ===== COMPARE BUTTONS CON ANIMACIONES =====
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Animación de carga
            const originalText = this.innerHTML;
            this.innerHTML = '<div class="pulse">⏳ Comparando...</div>';
            this.style.opacity = '0.8';
            this.disabled = true;
            
            // Simular proceso de comparación
            setTimeout(() => {
                this.innerHTML = '✅ Comparación lista';
                this.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.opacity = '1';
                    this.style.backgroundColor = '';
                    this.disabled = false;
                    showNotification(`💰 Comparación completa para: ${productName}`, 'success');
                }, 1000);
            }, 2000);

            // Efecto visual en la tarjeta
            productCard.style.transform = 'translateY(-15px) scale(1.02)';
            setTimeout(() => {
                productCard.style.transform = 'translateY(-10px) scale(1)';
            }, 300);
        });

        // Hover effect mejorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 32px rgba(229, 9, 20, 0.3)';
        });

        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
    });

    // ===== MOBILE MENU MEJORADO =====
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('active');
            
            navMenu.classList.toggle('active');
            this.innerHTML = isOpen ? '☰' : '✕';
            this.setAttribute('aria-expanded', !isOpen);
            
            // Animación del botón
            this.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    // ===== SMOOTH SCROLL MEJORADO =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                // Smooth scroll
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '☰';
                        mobileToggle.setAttribute('aria-expanded', 'false');
                    }
                }

                // Highlight temporal del elemento
                target.style.backgroundColor = 'rgba(229, 9, 20, 0.1)';
                setTimeout(() => {
                    target.style.backgroundColor = '';
                }, 1000);
            }
        });
    });

    // ===== PERFUMES SECTION =====
if (perfumesBtn) {
    perfumesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animación del botón
        this.style.transform = 'translateY(-3px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            showNotification('🌸 Redirigiendo a la sección de perfumes...', 'success');
            
            // Redirigir de verdad
            setTimeout(() => {
                window.location.href = 'perfumes.html';
            }, 1500);
        }, 200);
    });
}


    // ===== SISTEMA DE NOTIFICACIONES =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        
        // Estilos según el tipo
        const styles = {
            success: 'var(--primary-red)',
            info: 'var(--bg-card)',
            warning: '#f39c12',
            error: '#e74c3c'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${styles[type] || styles.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow-dark);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            border: 1px solid var(--border-color);
            max-width: 350px;
            font-weight: 500;
            font-size: 0.9rem;
            line-height: 1.4;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);

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

    // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Agregar clase para animaciones CSS adicionales
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const elementsToAnimate = document.querySelectorAll('.product-card, .section-title, .perfumes-section');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ===== EFECTOS DE PARTÍCULAS EN HERO =====
    function createParticle() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-red);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float 20s infinite linear;
            opacity: 0.3;
            pointer-events: none;
        `;
        
        hero.appendChild(particle);
        
        // Remover partícula después de la animación
        setTimeout(() => {
            if (hero.contains(particle)) {
                hero.removeChild(particle);
            }
        }, 20000);
    }

    // Crear partículas periódicamente
    setInterval(createParticle, 3000);

    // ===== EASTER EGG - KONAMI CODE =====
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showNotification('🎉 ¡Código Konami activado! Descuento especial desbloqueado', 'success');
            
            // Efecto rainbow
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
            
            konamiCode = [];
        }
    });

    // ===== MEJORAS DE ACCESIBILIDAD =====
    
    // Focus visible para navegación por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Lazy loading para imágenes (si las hubiera)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ===== INICIALIZACIÓN COMPLETA =====
    console.log('🚀 PriceCompare cargado exitosamente!');
    console.log('💡 Presiona ↑↑↓↓←→←→BA para activar el easter egg');
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a PriceCompare! 🛍️', 'success');
    }, 1000);

    // ===== FUNCIONES AUXILIARES =====
    
    // Función para formatear precios
    function formatPrice(price) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(price);
    }

    // Función para detectar dispositivo móvil
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Función para throttle en scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== EVENT LISTENERS ADICIONALES =====
    
    // Resize handler
    window.addEventListener('resize', throttle(() => {
        // Reajustar layout si es necesario
        if (isMobile() && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.innerHTML = '☰';
            }
        }
    }, 250));

    // Prevenir zoom en doble tap en iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

});