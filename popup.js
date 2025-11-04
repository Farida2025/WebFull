document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById('accessModal');
    const openButton = document.getElementById('openAccessModal'); 
    const closeButton = modal ? modal.querySelector('.close-button') : null;
    
    const registerPanel = document.getElementById('registerPanel');
    const loginPanel = document.getElementById('loginPanel');
    const showLoginLink = document.getElementById('showLogin');
    const showRegisterLink = document.getElementById('showRegister');
    const modalTitle = document.getElementById('modalAccessTitle');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearAllMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        const regSuccess = document.getElementById('regSuccessMessage');
        const logSuccess = document.getElementById('logSuccessMessage');
        if (regSuccess) regSuccess.style.display = 'none';
        if (logSuccess) logSuccess.style.display = 'none';
    }
    
    function openModal() {
        if (!modal) return;
        modal.style.display = 'flex'; 
        
        if (registerPanel) registerPanel.style.display = 'block';
        if (loginPanel) loginPanel.style.display = 'none';
        if (modalTitle) modalTitle.textContent = 'Register for MyFlix';
        
        const regForm = document.getElementById('registrationForm');
        const logForm = document.getElementById('loginForm');
        if (regForm) regForm.reset();
        if (logForm) logForm.reset();
        
        clearAllMessages();
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    if (openButton) {
        openButton.addEventListener('click', openModal);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    function switchToLogin() {
        if (registerPanel) registerPanel.style.display = 'none';
        if (loginPanel) loginPanel.style.display = 'block';
        if (modalTitle) modalTitle.textContent = 'Welcome Back!';
        clearAllMessages();
    }

    function switchToRegister() {
        if (loginPanel) loginPanel.style.display = 'none';
        if (registerPanel) registerPanel.style.display = 'block';
        if (modalTitle) modalTitle.textContent = 'Register for MyFlix';
        clearAllMessages();
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchToLogin();
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchToRegister();
        });
    }

    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', validateRegistrationForm);

        function validateRegistrationForm(event) {
            event.preventDefault();
            clearAllMessages();
            let isValid = true;

            const emailValue = document.getElementById('regEmail').value.trim();
            const passwordValue = document.getElementById('regPassword').value;
            const confirmPasswordValue = document.getElementById('regConfirmPassword').value;

            if (emailValue === '') {
                showError('regEmailError', 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError('regEmailError', 'Please enter a valid email format.');
                isValid = false;
            }

            if (passwordValue === '') {
                showError('regPasswordError', 'Password is required.');
                isValid = false;
            } else if (passwordValue.length < 8) {
                showError('regPasswordError', 'Password must be at least 8 characters long.');
                isValid = false;
            }

            if (confirmPasswordValue === '') {
                showError('regConfirmPasswordError', 'Confirm password is required.');
                isValid = false;
            } else if (confirmPasswordValue !== passwordValue) {
                showError('regConfirmPasswordError', 'Passwords do not match.');
                isValid = false;
            }

            if (isValid) {
                document.getElementById('regSuccessMessage').textContent = '✅ Registration Successful! Please proceed to Log In.';
                document.getElementById('regSuccessMessage').style.display = 'block';
                regForm.reset();
            }
        }
    }

    const logForm = document.getElementById('loginForm');
    if (logForm) {
        logForm.addEventListener('submit', validateLoginForm);

        function validateLoginForm(event) {
            event.preventDefault();
            clearAllMessages();
            let isValid = true;

            const emailValue = document.getElementById('logEmail').value.trim();
            const passwordValue = document.getElementById('logPassword').value;

            if (emailValue === '') {
                showError('logEmailError', 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError('logEmailError', 'Invalid email format.');
                isValid = false;
            }
            
            if (passwordValue === '') {
                showError('logPasswordError', 'Password is required.');
                isValid = false;
            }

            if (isValid) {
                document.getElementById('logSuccessMessage').textContent = '✅ Login Successful! Welcome to MyFlix.';
                document.getElementById('logSuccessMessage').style.display = 'block';
                logForm.reset();
            }
        }
    }
});