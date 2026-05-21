/**
 * Cookie Consent Banner Manager
 * Gestiona el banner de aceptación de cookies y guarda preferencias en localStorage
 * 
 * @author Restaurante - Proyecto Final
 * @version 1.0.0
 * @date Mayo 2026
 */

// ========== CONSTANTES ==========

const COOKIE_CONSENT_KEY = 'cookieConsent';
const COOKIE_CONSENT_ACCEPTED = 'accepted';
const COOKIE_CONSENT_REJECTED = 'rejected';

// ========== FUNCIONES DE GESTIÓN ==========

/**
 * Verifica si el usuario ya ha dado su consentimiento
 * @returns {boolean} true si ya consintió, false si no
 */
function hasUserConsented() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent !== null; // Si existe cualquier valor, ya consintió
}

/**
 * Guarda la preferencia de cookies del usuario
 * @param {string} consent - 'accepted' o 'rejected'
 */
function saveConsent(consent) {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    console.log(`✅ Cookie consent saved: ${consent}`);
}

/**
 * Obtiene la preferencia actual del usuario
 * @returns {string|null} 'accepted', 'rejected' o null si no ha respondido
 */
function getConsent() {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
}

// ========== FUNCIONES DE UI ==========

/**
 * Muestra el banner de cookies con animación
 */
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('show');
        console.log('🍪 Cookie banner displayed');
    }
}

/**
 * Oculta el banner de cookies con animación
 */
function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.remove('show');
        banner.classList.add('hide');
        
        // Remover del DOM después de animación (400ms)
        setTimeout(() => {
            banner.style.display = 'none';
            console.log('🍪 Cookie banner hidden');
        }, 400);
    }
}

// ========== HANDLERS DE EVENTOS ==========

/**
 * Maneja la aceptación de cookies
 */
function acceptCookies() {
    saveConsent(COOKIE_CONSENT_ACCEPTED);
    hideCookieBanner();
    
    // Aquí se podrían activar cookies de terceros si las hubiera
    // Ejemplo: inicializar Google Analytics, Facebook Pixel, etc.
    console.log('✅ Cookies accepted - Third party cookies can now be loaded');
    
    // Si tuviéramos Google Analytics:
    // initGoogleAnalytics();
}

/**
 * Maneja el rechazo de cookies
 */
function rejectCookies() {
    saveConsent(COOKIE_CONSENT_REJECTED);
    hideCookieBanner();
    
    // Solo cookies esenciales (técnicas)
    console.log('❌ Cookies rejected - Only essential cookies will be used');
}

// ========== INICIALIZACIÓN ==========

/**
 * Inicializa el sistema de cookie consent
 * Se ejecuta cuando el DOM está completamente cargado
 */
function initCookieConsent() {
    console.log('🔧 Initializing cookie consent system...');
    
    // Verificar si el usuario ya consintió
    if (hasUserConsented()) {
        const consent = getConsent();
        console.log(`ℹ️ User has already consented: ${consent}`);
        
        // Si aceptó, activar cookies de terceros
        if (consent === COOKIE_CONSENT_ACCEPTED) {
            // initGoogleAnalytics();
            console.log('✅ Third party cookies are active');
        }
        
        return; // No mostrar banner
    }
    
    // Mostrar banner después de un pequeño delay para mejor UX
    setTimeout(() => {
        showCookieBanner();
    }, 1000);
    
    // Configurar event listeners para los botones
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
        console.log('✅ Accept button listener attached');
    } else {
        console.warn('⚠️ Accept button not found');
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', rejectCookies);
        console.log('✅ Reject button listener attached');
    } else {
        console.warn('⚠️ Reject button not found');
    }
}

// ========== AUTO-INICIALIZACIÓN ==========

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initCookieConsent);

// ========== UTILIDADES PARA DEBUGGING ==========

/**
 * Resetea el consentimiento de cookies (útil para testing)
 * Usar en consola del navegador: resetCookieConsent()
 */
function resetCookieConsent() {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    console.log('🔄 Cookie consent reset - reload page to see banner again');
    location.reload();
}

// Exponer función de reset globalmente para debugging
window.resetCookieConsent = resetCookieConsent;
