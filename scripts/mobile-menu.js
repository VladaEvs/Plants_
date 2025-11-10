document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mainNav = document.getElementById('mainNav');
    
    if (!burgerMenu || !mainNav) return;
    
    const dropdowns = document.querySelectorAll('.dropdown');
    
    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        if (!mainNav.classList.contains('active')) {
            closeAllDropdowns();
        }
    });
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = dropdown.classList.contains('active');
                closeAllDropdowns();
                
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav') && !e.target.closest('.burger-menu')) {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                closeAllDropdowns();
            }
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
            closeAllDropdowns();
        }
    });
});