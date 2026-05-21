/**
 * Funcionalidad de Menú para Grupos
 * Desplegables y selección de opciones
 * Restaurante - Proyecto Final
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeAccordion();
});

/**
 * Inicializa la funcionalidad del acordeón
 * Añade event listeners a todos los botones de acordeón
 */
function initializeAccordion() {
    // Seleccionar todos los botones de acordeón
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Añadir event listener a cada botón
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleAccordion(this);
        });
        
        // Accesibilidad: permitir navegación con teclado
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(this);
            }
        });
    });
}

/**
 * Alterna el estado abierto/cerrado de un item del acordeón
 * Cierra otros acordeones abiertos (comportamiento de "solo uno abierto")
 * @param {HTMLElement} header - El botón header del acordeón clickeado
 */
function toggleAccordion(header) {
    // Obtener el estado actual del acordeón
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    // Obtener el contenido asociado
    const content = header.nextElementSibling;
    
    // Cerrar todos los acordeones primero
    closeAllAccordions();
    
    // Si el acordeón estaba cerrado, abrirlo
    if (!isExpanded) {
        openAccordion(header, content);
    }
    // Si estaba abierto, ya se cerró en closeAllAccordions()
}

/**
 * Cierra todos los items del acordeón
 */
function closeAllAccordions() {
    const allHeaders = document.querySelectorAll('.accordion-header');
    const allContents = document.querySelectorAll('.accordion-content');
    
    allHeaders.forEach(header => {
        header.setAttribute('aria-expanded', 'false');
    });
    
    allContents.forEach(content => {
        content.classList.remove('active');
    });
}

/**
 * Abre un item específico del acordeón
 * @param {HTMLElement} header - El header del acordeón
 * @param {HTMLElement} content - El contenido del acordeón
 */
function openAccordion(header, content) {
    header.setAttribute('aria-expanded', 'true');
    content.classList.add('active');
    
    // Scroll suave al acordeón abierto (opcional, mejora UX)
    setTimeout(() => {
        header.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);
}

