/**
 * Validación de Formulario de Reservas
 * Restaurante - Proyecto Final
 * 
 * Este módulo gestiona la validación completa del formulario de reservas
 * incluyendo validación de campos obligatorios, formato de email, teléfono,
 * fechas futuras, y muestra de mensajes de error/éxito.
 */

/**
 * Inicialización del formulario de reservas
 * Se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservation-form');
    
    if (!form) {
        console.error('Formulario de reservas no encontrado');
        return;
    }
    
    // Verificar si venimos de un envío exitoso de FormSpree
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showSuccessMessage();
        // Limpiar parámetro de URL sin recargar
        window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Event listener para el envío del formulario
    form.addEventListener('submit', handleFormSubmit);
    
    // Event listeners para validación en tiempo real (al perder foco)
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Limpiar error al empezar a escribir
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Establecer fecha mínima como hoy
    setMinimumDate();
});

/**
 * Maneja el envío del formulario
 * @param {Event} e - Evento de envío del formulario
 */
function handleFormSubmit(e) {
    // Validar todos los campos
    const isValid = validateForm();
    
    if (isValid) {
        // Formulario válido - permitir envío a FormSpree
        console.log('✅ Formulario válido - enviando a FormSpree...');
        
        // Mostrar mensaje de envío
        showSuccessMessage();
        
        // FormSpree manejará el envío y la redirección
        // El formulario se enviará automáticamente por method="POST"
        
    } else {
        // Formulario inválido - prevenir envío
        e.preventDefault();
        console.log('❌ Formulario inválido - corregir errores');
        
        // Hacer scroll al primer error
        const firstError = document.querySelector('.form-input.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
}

/**
 * Valida todo el formulario
 * @returns {boolean} - true si el formulario es válido, false si no
 */
function validateForm() {
    const form = document.getElementById('reservation-form');
    let isValid = true;
    
    // Validar cada campo obligatorio
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const guests = document.getElementById('guests');
    
    // Validar nombre
    if (!validateField(name)) {
        isValid = false;
    }
    
    // Validar email
    if (!validateField(email)) {
        isValid = false;
    }
    
    // Validar teléfono
    if (!validateField(phone)) {
        isValid = false;
    }
    
    // Validar fecha
    if (!validateField(date)) {
        isValid = false;
    }
    
    // Validar hora
    if (!validateField(time)) {
        isValid = false;
    }
    
    // Validar número de personas
    if (!validateField(guests)) {
        isValid = false;
    }
    
    return isValid;
}

/**
 * Valida un campo individual según su tipo
 * @param {HTMLElement} field - Campo a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    
    // Limpiar error anterior
    clearFieldError(field);
    
    switch(fieldId) {
        case 'name':
            return validateName(field, value);
        case 'email':
            return validateEmail(field, value);
        case 'phone':
            return validatePhone(field, value);
        case 'date':
            return validateDate(field, value);
        case 'time':
            return validateTime(field, value);
        case 'guests':
            return validateGuests(field, value);
        default:
            return true;
    }
}

/**
 * Valida el campo de nombre
 */
function validateName(field, value) {
    if (value === '') {
        showFieldError(field, 'El nombre completo es obligatorio');
        return false;
    }
    
    if (value.length < 3) {
        showFieldError(field, 'El nombre debe tener al menos 3 caracteres');
        return false;
    }
    
    // Verificar que contenga al menos dos palabras (nombre y apellido)
    const words = value.split(' ').filter(word => word.length > 0);
    if (words.length < 2) {
        showFieldError(field, 'Por favor, ingrese nombre y apellido');
        return false;
    }
    
    return true;
}

/**
 * Valida el campo de email
 */
function validateEmail(field, value) {
    if (value === '') {
        showFieldError(field, 'El correo electrónico es obligatorio');
        return false;
    }
    
    // Expresión regular para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showFieldError(field, 'Por favor, ingrese un email válido (ej: nombre@email.com)');
        return false;
    }
    
    return true;
}

/**
 * Valida el campo de teléfono
 */
function validatePhone(field, value) {
    if (value === '') {
        showFieldError(field, 'El teléfono es obligatorio');
        return false;
    }
    
    // Eliminar espacios y guiones para validación
    const cleanPhone = value.replace(/[\s\-]/g, '');
    
    // Validar formato de teléfono español (9 dígitos, puede empezar con +34)
    const phoneRegex = /^(\+34|0034)?[6-9]\d{8}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
        showFieldError(field, 'Por favor, ingrese un teléfono válido (ej: 612 345 678)');
        return false;
    }
    
    return true;
}

/**
 * Valida el campo de fecha
 */
function validateDate(field, value) {
    if (value === '') {
        showFieldError(field, 'La fecha de reserva es obligatoria');
        return false;
    }
    
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
    
    if (selectedDate < today) {
        showFieldError(field, 'La fecha debe ser hoy o posterior');
        return false;
    }
    
    return true;
}

/**
 * Valida el campo de hora
 */
function validateTime(field, value) {
    if (value === '') {
        showFieldError(field, 'Debe seleccionar una hora');
        return false;
    }
    
    return true;
}

/**
 * Valida el campo de número de personas
 */
function validateGuests(field, value) {
    if (value === '') {
        showFieldError(field, 'El número de personas es obligatorio');
        return false;
    }
    
    const numGuests = parseInt(value);
    
    if (isNaN(numGuests)) {
        showFieldError(field, 'Por favor, ingrese un número válido');
        return false;
    }
    
    if (numGuests < 1) {
        showFieldError(field, 'Debe ser al menos 1 persona');
        return false;
    }
    
    if (numGuests > 10) {
        showFieldError(field, 'Para más de 10 personas, consulte nuestros menús para grupos');
        return false;
    }
    
    return true;
}

/**
 * Muestra un mensaje de error para un campo
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
    }
}

/**
 * Limpia el error de un campo
 */
function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.removeAttribute('role');
    }
}

/**
 * Muestra el mensaje de éxito
 */
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Ocultar mensaje después de 10 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 10000);
    }
}

/**
 * Establece la fecha mínima como hoy en el input de fecha
 */
function setMinimumDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const minDate = `${year}-${month}-${day}`;
        dateInput.setAttribute('min', minDate);
    }
}
