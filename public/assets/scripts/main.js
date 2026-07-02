let currentRegisterRole = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log("Ecosistema Zen de VITALIS: Micro-interacciones inicializadas.");

    initButtonRipples();
    initSmoothScroll();
});

/**
 * Abre el panel modal para iniciar el registro seleccionando el rol (Wireframe 10)
 */
function openRegisterRoleSelection() {
    const overlay = document.getElementById('register-role-overlay');
    if (overlay) {
        overlay.classList.remove('hidden-zen');
    }
}

/**
 * Cierra el panel de selección de rol de registro y limpia estados
 */
function closeRegisterRoleSelection() {
    const overlay = document.getElementById('register-role-overlay');
    if (overlay) {
        overlay.classList.add('hidden-zen');
        clearRegisterRoleState();
    }
}

/**
 * Gestiona la selección del tipo de rol en el formulario de inicio de registro
 */
function selectRegisterRole(role) {
    currentRegisterRole = role;

    // Resetea clases visuales activas
    document.getElementById('card-role-student').classList.remove('active-register-role');
    document.getElementById('card-role-intern').classList.remove('active-register-role');

    // Asigna el estado activo a la tarjeta seleccionada
    if (role === 'estudiante') {
        document.getElementById('card-role-student').classList.add('active-register-role');
    } else if (role === 'practicante') {
        document.getElementById('card-role-intern').classList.add('active-register-role');
    }

    // Habilita el botón de confirmación de registro
    const btnSubmit = document.getElementById('btn-submit-register-role');
    if (btnSubmit) {
        btnSubmit.removeAttribute('disabled');
        btnSubmit.classList.remove('btn-role-disabled');
    }
}

/**
 * Limpia las variables de estado al cerrar el flujo de registro
 */
function clearRegisterRoleState() {
    currentRegisterRole = null;
    document.getElementById('card-role-student').classList.remove('active-register-role');
    document.getElementById('card-role-intern').classList.remove('active-register-role');

    const btnSubmit = document.getElementById('btn-submit-register-role');
    if (btnSubmit) {
        btnSubmit.setAttribute('disabled', 'true');
        btnSubmit.classList.add('btn-role-disabled');
    }
}

/**
 * Procesa la confirmación e inicia el formulario de registro del respectivo segmento (Wireframe 11)
 */
function submitRoleRegistration() {
    if (!currentRegisterRole) return;

    const targetContextText = currentRegisterRole === 'estudiante'
        ? "Estudiante Universitario (Formulario de Carga Académica y Exámenes)"
        : "Practicante Pre-Profesional (Formulario de Horario Laboral y Burnout)";

    setTimeout(() => {
        alert(`Iniciando flujo de registro...\n\nHas elegido el perfil: ${targetContextText}.\nRedireccionando de manera segura.`);
        closeRegisterRoleSelection();
    }, 200);
}

function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn, .btn-navbar-white, .btn-dark-block, .role-selection-card, .btn-navbar-outline');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const existingRipple = this.querySelector('.zen-ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            const ripple = document.createElement('span');
            ripple.classList.add('zen-ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}


function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-nav-links a, .hero-actions a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}


function initTrial() {
    setTimeout(() => {
        alert("Te damos la bienvenida a Vitalis. Reduciendo tu carga cognitiva...");
    }, 300);
}

/**
 * Conecta el flujo del Navbar redireccionando al entorno de Login Habitual
 */
function openLogin() {
    setTimeout(() => {
        window.location.href = 'public/assets/HTML/login.html';
    }, 150);
}
