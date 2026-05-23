/**
 * JavaScript Principal
 * Restaurante - Proyecto Final
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== LOAD COMPONENTS (NAVBAR & FOOTER) ==========
    loadComponents();
    
    console.log('🎉 Live Server is working! JavaScript loaded successfully.');
});

/**
 * Load reusable components (navbar and footer)
 * This allows us to maintain one version of navbar/footer for all pages
 */
async function loadComponents() {
    // Determine if we're in root or pages/ subdirectory
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../components/' : 'components/';
    
    try {
        // Load navbar
        const navbarResponse = await fetch(basePath + 'navbar.html');
        const navbarHTML = await navbarResponse.text();
        document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
        
        // Load footer
        const footerResponse = await fetch(basePath + 'footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHTML;
        
        // After components are loaded, fix navbar paths and initialize functionality
        fixNavbarPaths();
        fixFooterPaths();
        initializeNavbar();
        highlightActivePage();
        
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

/**
 * Fix navbar paths based on current page location
 */
function fixNavbarPaths() {
    // Detect if we're on index.html or in pages/ subdirectory
    const currentPath = window.location.pathname;
    const isInPages = currentPath.includes('/pages/');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        
        if (page === 'index') {
            // Link to index.html
            link.setAttribute('href', isInPages ? '../index.html' : 'index.html');
        } else {
            // Link to pages/*.html
            link.setAttribute('href', isInPages ? `${page}.html` : `pages/${page}.html`);
        }
    });
}

/**
 * Fix footer paths based on current page location
 */
function fixFooterPaths() {
    // Detect if we're on index.html or in pages/ subdirectory
    const currentPath = window.location.pathname;
    const isInPages = currentPath.includes('/pages/');
    
    // Get all footer legal links
    const footerLinks = document.querySelectorAll('.legal-links a');
    
    footerLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        
        if (page) {
            // All legal pages are in pages/ subdirectory
            link.setAttribute('href', isInPages ? `${page}.html` : `pages/${page}.html`);
        }
    });
}

/**
 * Initialize navbar functionality (hamburger menu)
 */
function initializeNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

/**
 * Highlight the current page in navigation
 * Adds 'active' class to the link matching current page
 */
function highlightActivePage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if link matches current page
        if (currentPage.includes(linkPath) || 
            (currentPage.endsWith('/') && linkPath === '/index.html') ||
            (currentPage.endsWith('/src/') && linkPath === '/index.html')) {
            link.classList.add('active');
        }
    });
}
