

    document.addEventListener('DOMContentLoaded', function() {
        const authModal = document.getElementById('accessModal');
        const profileModal = document.getElementById('profileModal');
        const openButton = document.getElementById('openAccessModal');
        const closeButtons = document.querySelectorAll('.close-button');
        const registerPanel = document.getElementById('registerPanel');
        const loginPanel = document.getElementById('loginPanel');
        const showLoginLink = document.getElementById('showLogin');
        const showRegisterLink = document.getElementById('showRegister');
        const modalTitle = document.getElementById('modalAccessTitle');
        const logoutBtn = document.getElementById('logoutBtn');
        const regForm = document.getElementById('registrationForm');
        const loginForm = document.getElementById('loginForm');

        checkAuthStatus();

        openButton.addEventListener('click', function() {
            if (isUserLoggedIn()) {
                showProfileModal();
            } else {
                openAuthModal();
            }
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                closeAllModals();
            });
        });

        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchToLogin();
        });

        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchToRegister();
        });

        logoutBtn.addEventListener('click', function() {
            logoutUser();
        });

        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });

        window.addEventListener('click', function(e) {
            if (e.target === authModal) closeAllModals();
            if (e.target === profileModal) closeAllModals();
        });

        function openAuthModal() {
            authModal.style.display = 'flex';
            switchToRegister();
        }

        function showProfileModal() {
            const user = getCurrentUser();
            if (user) {
                document.getElementById('profileName').textContent = user.name;
                document.getElementById('profileEmail').textContent = user.email;
                document.getElementById('profileMemberSince').textContent = new Date(user.createdAt).toLocaleDateString();
                profileModal.style.display = 'flex';
            }
        }

        function closeAllModals() {
            authModal.style.display = 'none';
            profileModal.style.display = 'none';
        }

        function switchToLogin() {
            registerPanel.style.display = 'none';
            loginPanel.style.display = 'block';
            modalTitle.textContent = 'Welcome Back!';
            clearMessages();
        }

        function switchToRegister() {
            loginPanel.style.display = 'none';
            registerPanel.style.display = 'block';
            modalTitle.textContent = 'Register for MyFlix';
            clearMessages();
        }

        function handleRegistration() {
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            clearMessages();

            if (!name) {
                showError('regNameError', 'Name is required');
                return;
            }
            if (!email || !isValidEmail(email)) {
                showError('regEmailError', 'Valid email is required');
                return;
            }
            if (password.length < 8) {
                showError('regPasswordError', 'Password must be at least 8 characters');
                return;
            }
            if (password !== confirmPassword) {
                showError('regConfirmPasswordError', 'Passwords do not match');
                return;
            }

            const result = createUser(name, email, password);
            if (result.success) {
                showSuccess('regSuccessMessage', 'Registration successful! Please log in.');
                regForm.reset();
                setTimeout(() => switchToLogin(), 1500);
            } else {
                showError('regEmailError', result.message);
            }
        }

        function handleLogin() {
            const email = document.getElementById('logEmail').value.trim();
            const password = document.getElementById('logPassword').value;

            clearMessages();

            if (!email || !isValidEmail(email)) {
                showError('logEmailError', 'Valid email is required');
                return;
            }
            if (!password) {
                showError('logPasswordError', 'Password is required');
                return;
            }

            const result = authenticateUser(email, password);
            if (result.success) {
                setCurrentUser(result.user);
                showSuccess('logSuccessMessage', 'Login successful!');
                setTimeout(() => {
                    closeAllModals();
                    checkAuthStatus();
                }, 1000);
            } else {
                showError('logPasswordError', result.message);
            }
        }

        function getUsers() {
            return JSON.parse(localStorage.getItem('users')) || [];
        }

        function saveUsers(users) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        function getUserByEmail(email) {
            const users = getUsers();
            return users.find(user => user.email === email);
        }

        function createUser(name, email, password) {
            const users = getUsers();
            
            if (getUserByEmail(email)) {
                return { success: false, message: 'User already exists' };
            }
            
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                password: password,
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            saveUsers(users);
            return { success: true, user: newUser };
        }

        function authenticateUser(email, password) {
            const user = getUserByEmail(email);
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            if (user.password !== password) {
                return { success: false, message: 'Invalid password' };
            }
            return { success: true, user: user };
        }

        function setCurrentUser(user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }

        function getCurrentUser() {
            return JSON.parse(localStorage.getItem('currentUser'));
        }

        function logoutUser() {
            localStorage.removeItem('currentUser');
            closeAllModals();
            checkAuthStatus();
        }

        function isUserLoggedIn() {
            return getCurrentUser() !== null;
        }

        function checkAuthStatus() {
            if (isUserLoggedIn()) {
                openButton.textContent = 'Profile';
                openButton.classList.remove('btn-danger');
                openButton.classList.add('btn-success');
            } else {
                openButton.textContent = 'Sign Up';
                openButton.classList.remove('btn-success');
                openButton.classList.add('btn-danger');
            }
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showError(elementId, message) {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = message;
                element.style.display = 'block';
            }
        }

        function showSuccess(elementId, message) {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = message;
                element.style.display = 'block';
            }
        }

        function clearMessages() {
            document.querySelectorAll('.error-message, .success-message').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });
        }
    });
  