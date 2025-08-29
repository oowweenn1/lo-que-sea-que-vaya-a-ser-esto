// Simple JavaScript for interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality (visual only)
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim()) {
            alert(`Buscando: "${searchInput.value}"`);
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            alert(`Buscando: "${searchInput.value}"`);
        }
    });

    // Category cards click
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            alert(`Explorando categoría: ${categoryName}`);
        });
    });

    // Compare buttons
    const compareButtons = document.querySelectorAll('.compare-btn');
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('.product-name').textContent;
            alert(`Comparando precios para: ${productName}`);
        });
    });

    // Mobile menu toggle (basic)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', function() {
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(102, 126, 234, 0.95)';
            navMenu.style.padding = '1rem';
            navMenu.style.backdropFilter = 'blur(10px)';
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});