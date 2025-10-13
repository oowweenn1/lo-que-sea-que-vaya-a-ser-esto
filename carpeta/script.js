// ===== PERFUMECOMPARE - JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES GLOBALES =====
    const header = document.querySelector('.header');
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const categoryCards = document.querySelectorAll('.fragrance-category-card');
    const perfumeCards = document.querySelectorAll('.perfume-card');
    const perfumeBtns = document.querySelectorAll('.perfume-btn');
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== BÚSQUEDA =====
    function performSearch() {
        if (searchInput.value.trim()) {
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

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        searchInput.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'var(--primary-silver)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(192, 192, 192, 0.4)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.borderColor = 'var(--border-color)';
            this.parentElement.style.boxShadow = 'none';
        });
    }

    // ===== CATEGORÍAS =====
    categoryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
                showNotification(`🌟 Explorando fragancias ${categoryName.toLowerCase()}`, 'success');
                
                // Scroll a la sección de perfumes si existe
                const perfumesSection = document.querySelector('#perfumes');
                if (perfumesSection) {
                    perfumesSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 200);
        });

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ===== BOTONES DE PERFUMES =====
    perfumeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const perfumeCard = this.closest('.perfume-card');
            const perfumeName = perfumeCard.querySelector('.perfume-name').textContent;
            const perfumeBrand = perfumeCard.querySelector('.perfume-brand').textContent;
            
            const originalText = this.innerHTML;
            this.innerHTML = '⏳ Cargando detalles...';
            this.disabled = true;
            this.style.opacity = '0.7';
            
            perfumeCard.classList.add('loading');
            
            setTimeout(() => {
                this.innerHTML = '✅ Ver Detalles';
                this.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.opacity = '1';
                    this.style.backgroundColor = '';
                    this.disabled = false;
                    perfumeCard.classList.remove('loading');
                    
                    showNotification(`🍾 Mostrando detalles de ${perfumeBrand} ${perfumeName}`, 'success');
                }, 1000);
            }, 1500);
        });

        btn.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 32px rgba(192, 192, 192, 0.5)';
            }
        });

        btn.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
    });

    // ===== NEWSLETTER =====
    if (newsletterForm && newsletterInput) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (validateEmail(email)) {
                const submitBtn = this.querySelector('.newsletter-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '⏳ Suscribiendo...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '✅ ¡Suscrito!';
                    newsletterInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        showNotification('¡Te has suscrito exitosamente! 📧', 'success');
                    }, 2000);
                }, 1500);
            } else {
                showNotification('Por favor ingresa un email válido', 'warning');
                newsletterInput.focus();
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Highlight temporal del elemento
                target.style.backgroundColor = 'rgba(192, 192, 192, 0.1)';
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
            success: 'var(--primary-silver)',
            info: 'var(--bg-card)',
            warning: '#f39c12',
            error: '#e74c3c'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${styles[type] || styles.info};
            color: ${type === 'success' ? '#000' : 'white'};
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
        }, 3000);

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
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.perfume-card, .section-title, .fragrance-category-card, .tip-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ===== EFECTOS DE PARTÍCULAS =====
    function createParticle() {
        const hero = document.querySelector('.perfumes-hero');
        if (!hero) return;

        const particle = document.createElement('div');
        const icons = ['🍷', '🌹', '💎', '🔥', '⚜️', '🖤'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        particle.innerHTML = randomIcon;
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: perfumeFloat 25s infinite linear;
            opacity: ${Math.random() * 0.7 + 0.3};
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

    setInterval(createParticle, 2000);

    // ===== EASTER EGG =====
    let secretCode = [];
    const perfumeSecretSequence = ['p', 'e', 'r', 'f', 'u', 'm', 'e'];

    document.addEventListener('keydown', function(e) {
        secretCode.push(e.key.toLowerCase());
        
        if (secretCode.length > perfumeSecretSequence.length) {
            secretCode.shift();
        }
        
        if (JSON.stringify(secretCode) === JSON.stringify(perfumeSecretSequence)) {
            showNotification('👑 ¡Código secreto activado! Descuento VIP disponible', 'success');
            
            perfumeCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 300);
                }, index * 100);
            });
            
            secretCode = [];
        }
    });

    // ===== ACCESIBILIDAD =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== INICIALIZACIÓN =====
    console.log('👑 Esencia Masculina cargado exitosamente!');
    console.log('💡 Escribe "perfume" para activar el easter egg');
    
    setTimeout(() => {
        showNotification('¡Bienvenido a Esencia Masculina! 🛍️', 'success');
    }, 1000);
});