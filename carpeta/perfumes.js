// ===== PERFUMES - JAVASCRIPT ESPECÍFICO =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES ESPECÍFICAS DE PERFUMES =====
    const filterSelects = document.querySelectorAll('.filter-select');
    const fragranceCategoryCards = document.querySelectorAll('.fragrance-category-card');
    const perfumeCards = document.querySelectorAll('.perfume-card');
    const perfumeBtns = document.querySelectorAll('.perfume-btn');
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    // Datos de perfumes para filtrado
    const perfumesData = [
        {
            id: 1,
            brand: 'chanel',
            name: 'Chanel N°5',
            gender: 'mujer',
            type: 'eau-de-parfum',
            price: 185990,
            category: 'floral',
            notes: ['Ylang-Ylang', 'Rosa', 'Sándalo']
        },
        {
            id: 2,
            brand: 'dior',
            name: 'Sauvage',
            gender: 'hombre',
            type: 'eau-de-toilette',
            price: 142500,
            category: 'fresh',
            notes: ['Bergamota', 'Pimienta', 'Ambroxan']
        },
        {
            id: 3,
            brand: 'versace',
            name: 'Bright Crystal',
            gender: 'mujer',
            type: 'eau-de-toilette',
            price: 89990,
            category: 'floral',
            notes: ['Granada', 'Peonía', 'Magnolia']
        },
        {
            id: 4,
            brand: 'armani',
            name: 'Acqua di Giò',
            gender: 'hombre',
            type: 'eau-de-toilette',
            price: 125750,
            category: 'fresh',
            notes: ['Bergamota', 'Notas Marinas', 'Cedro']
        },
        {
            id: 5,
            brand: 'bulgari',
            name: 'Omnia Crystalline',
            gender: 'mujer',
            type: 'eau-de-toilette',
            price: 98200,
            category: 'fresh',
            notes: ['Bambú', 'Pera', 'Loto']
        },
        {
            id: 6,
            brand: 'chanel',
            name: 'Coco Mademoiselle',
            gender: 'mujer',
            type: 'eau-de-parfum',
            price: 175900,
            category: 'oriental',
            notes: ['Naranja', 'Rosa', 'Pachulí']
        }
    ];

    // ===== SISTEMA DE FILTROS =====
    let currentFilters = {
        gender: '',
        brand: '',
        type: '',
        price: ''
    };

    // Event listeners para filtros
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.id.replace('-filter', '');
            currentFilters[filterType] = this.value;
            applyFilters();
            
            // Efecto visual en el filtro seleccionado
            this.style.borderColor = this.value ? 'var(--primary-red)' : 'var(--border-color)';
        });
    });

    function applyFilters() {
        let filteredPerfumes = perfumesData.filter(perfume => {
            let matches = true;
            
            if (currentFilters.gender && perfume.gender !== currentFilters.gender) {
                matches = false;
            }
            if (currentFilters.brand && perfume.brand !== currentFilters.brand) {
                matches = false;
            }
            if (currentFilters.type && perfume.type !== currentFilters.type) {
                matches = false;
            }
            if (currentFilters.price) {
                const priceRange = currentFilters.price.split('-');
                const minPrice = parseInt(priceRange[0]);
                const maxPrice = priceRange[1] ? parseInt(priceRange[1]) : Infinity;
                
                if (perfume.price < minPrice || perfume.price > maxPrice) {
                    matches = false;
                }
            }
            
            return matches;
        });

        updatePerfumeGrid(filteredPerfumes);
        showNotification(`${filteredPerfumes.length} perfumes encontrados`, 'info');
    }

    function updatePerfumeGrid(filteredPerfumes) {
        perfumeCards.forEach((card, index) => {
            if (index < filteredPerfumes.length) {
                card.style.display = 'block';
                card.style.animation = 'slideInUp 0.6s ease forwards';
                card.style.animationDelay = `${index * 0.1}s`;
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ===== CATEGORÍAS DE FRAGANCIAS =====
    fragranceCategoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const categoryName = this.querySelector('h3').textContent;
            
            // Animación de selección
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
                showNotification(`🌸 Explorando fragancias ${categoryName.toLowerCase()}`, 'success');
                
                // Filtrar por categoría (simulado)
                filterByCategory(category);
            }, 200);
        });

        // Efectos de hover mejorados
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Efecto en el ícono
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Restaurar ícono
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    function filterByCategory(category) {
        const filteredPerfumes = perfumesData.filter(perfume => perfume.category === category);
        updatePerfumeGrid(filteredPerfumes);
        
        // Scroll suave a la sección de perfumes
        document.getElementById('featured-perfumes').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // ===== BOTONES DE PERFUMES =====
    perfumeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const perfumeCard = this.closest('.perfume-card');
            const perfumeName = perfumeCard.querySelector('.perfume-name').textContent;
            const perfumeBrand = perfumeCard.querySelector('.perfume-brand').textContent;
            
            // Animación de carga
            const originalText = this.innerHTML;
            this.innerHTML = '⏳ Cargando detalles...';
            this.disabled = true;
            this.style.opacity = '0.7';
            
            // Efecto en la tarjeta
            perfumeCard.classList.add('loading');
            
            // Simular carga de detalles
            setTimeout(() => {
                this.innerHTML = '✅ Ver Detalles';
                this.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.opacity = '1';
                    this.style.backgroundColor = '';
                    this.disabled = false;
                    perfumeCard.classList.remove('loading');
                    
                    showPerfumeModal(perfumeName, perfumeBrand);
                }, 1000);
            }, 1500);
        });
    });

    // ===== MODAL DE PERFUME (SIMULADO) =====
    function showPerfumeModal(name, brand) {
        showNotification(`🍾 Mostrando detalles de ${brand} ${name}`, 'success');
        
        // En una app real, aquí se abriría un modal con detalles completos
        setTimeout(() => {
            showNotification('Modal de detalles disponible próximamente', 'info');
        }, 2000);
    }

    // ===== NEWSLETTER =====
    if (newsletterForm && newsletterInput) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (validateEmail(email)) {
                // Animación de envío
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

    // ===== EFECTOS DE PARTÍCULAS ESPECÍFICOS PARA PERFUMES =====
    function createPerfumeParticle() {
        const hero = document.querySelector('.perfumes-hero');
        if (!hero) return;

        const particle = document.createElement('div');
        const icons = ['✨', '🌸', '🌟', '💫', '🌺'];
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

    // Crear partículas más frecuentemente
    setInterval(createPerfumeParticle, 2000);

    // ===== BÚSQUEDA ESPECÍFICA DE PERFUMES =====
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        // Override de la funcionalidad de búsqueda para perfumes
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length > 2) {
                const matchingPerfumes = perfumesData.filter(perfume => 
                    perfume.name.toLowerCase().includes(searchTerm) ||
                    perfume.brand.toLowerCase().includes(searchTerm) ||
                    perfume.notes.some(note => note.toLowerCase().includes(searchTerm))
                );
                
                if (matchingPerfumes.length > 0) {
                    updatePerfumeGrid(matchingPerfumes);
                    showNotification(`${matchingPerfumes.length} perfumes encontrados`, 'success');
                } else {
                    showNotification('No se encontraron perfumes', 'info');
                }
            } else if (searchTerm.length === 0) {
                // Mostrar todos los perfumes
                updatePerfumeGrid(perfumesData);
            }
        });
    }

    // ===== COMPARADOR DE PRECIOS (SIMULADO) =====
    function comparePerfumePrices(perfumeName) {
        const mockStores = [
            { name: 'FraganciasMundo', price: Math.floor(Math.random() * 50000) + 80000 },
            { name: 'PerfumesLux', price: Math.floor(Math.random() * 50000) + 85000 },
            { name: 'AromaStore', price: Math.floor(Math.random() * 50000) + 90000 }
        ];

        // Ordenar por precio
        mockStores.sort((a, b) => a.price - b.price);
        
        return mockStores;
    }

    // ===== WISHLIST FUNCTIONALITY =====
    let wishlist = JSON.parse(localStorage.getItem('perfumeWishlist') || '[]');

    function addToWishlist(perfumeId, perfumeName) {
        if (!wishlist.includes(perfumeId)) {
            wishlist.push(perfumeId);
            localStorage.setItem('perfumeWishlist', JSON.stringify(wishlist));
            showNotification(`💝 ${perfumeName} agregado a favoritos`, 'success');
        } else {
            showNotification(`${perfumeName} ya está en favoritos`, 'info');
        }
    }

    // ===== RECOMENDACIONES BASADAS EN NAVEGACIÓN =====
    let viewedPerfumes = [];

    function trackPerfumeView(perfumeId) {
        if (!viewedPerfumes.includes(perfumeId)) {
            viewedPerfumes.push(perfumeId);
            
            if (viewedPerfumes.length >= 3) {
                showRecommendations();
            }
        }
    }

    function showRecommendations() {
        setTimeout(() => {
            showNotification('💡 Basado en tu navegación, te recomendamos explorar fragancias orientales', 'info');
        }, 3000);
    }

    // Track views en botones de detalles
    perfumeBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => trackPerfumeView(index + 1));
    });

    // ===== INTERSECTION OBSERVER PARA ANIMACIONES ESPECÍFICAS =====
    const perfumeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Efecto especial para badges de perfumes
                const badge = entry.target.querySelector('.perfume-badge');
                if (badge) {
                    setTimeout(() => {
                        badge.style.animation = 'sparkle 2s ease-in-out infinite';
                    }, 500);
                }
            }
        });
    }, { threshold: 0.1 });

    // Observar tarjetas de perfumes
    perfumeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        perfumeObserver.observe(card);
    });

    // ===== FUNCIONES AUXILIARES =====
    function formatPrice(price) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    }

    function getRandomPerfumeTip() {
        const tips = [
            "💡 Tip: Aplica perfume en puntos de pulso para mayor duración",
            "🌡️ Tip: Guarda tus perfumes en lugares frescos y secos",
            "⏰ Tip: El mejor momento para aplicar perfume es después de la ducha",
            "🎯 Tip: No frotes el perfume después de aplicarlo",
            "🌸 Tip: Prueba el perfume en tu piel, no en papel"
        ];
        
        return tips[Math.floor(Math.random() * tips.length)];
    }

    // ===== EASTER EGGS ESPECÍFICOS DE PERFUMES =====
    let secretCode = [];
    const perfumeSecretSequence = ['p', 'e', 'r', 'f', 'u', 'm', 'e'];

    document.addEventListener('keydown', function(e) {
        secretCode.push(e.key.toLowerCase());
        
        if (secretCode.length > perfumeSecretSequence.length) {
            secretCode.shift();
        }
        
        if (JSON.stringify(secretCode) === JSON.stringify(perfumeSecretSequence)) {
            showNotification('🌸 ¡Código secreto de perfumería activado! Descuento especial en fragancias', 'success');
            
            // Efecto especial en todos los perfumes
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

    // ===== INICIALIZACIÓN ESPECÍFICA DE PERFUMES =====
    console.log('🌸 Mundo de Fragancias cargado exitosamente!');
    console.log('💡 Escribe "perfume" para activar el easter egg');
    
    // Mostrar tip aleatorio después de un tiempo
    setTimeout(() => {
        showNotification(getRandomPerfumeTip(), 'info');
    }, 5000);

    // Función para usar notificaciones del script principal
    function showNotification(message, type) {
        // Crear notificación específica para perfumes si no existe la función global
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
});