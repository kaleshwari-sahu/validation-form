// Show Signup Page
function showSignup() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
}

// Show Login Page
function showLogin() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('signup').style.display = 'none';
}

// Show Home Page
function showHome() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Show Dashboard After Login
function showDashboard(email) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userEmail').innerText = email;
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Password Validation
function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return regex.test(password);
}

// Mobile Number Validation
function validateMobile(mobile) {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
}

// Signup Function
function signup() {
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const contact = document.getElementById('signupContact').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailError.innerText = "";
    passwordError.innerText = "";

    if (!validateEmail(email)) {
        emailError.innerText = "🚨 Invalid email format!";
        return;
    }

    if (!validatePassword(password)) {
        passwordError.innerText = "⚠️ Password must be 8-16 chars, include uppercase, lowercase, digit, special char.";
        return;
    }

    if (!validateMobile(contact)) {
        alert("🚨 Invalid mobile number! It must be 10 digits and start with 6-9.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert('🚨 Email already registered!');
        return;
    }

    if (users.some(user => user.contact === contact)) {
        alert('🚨 Mobile number already in use!');
        return;
    }

    users.push({ email, password, contact });
    localStorage.setItem('users', JSON.stringify(users));

    alert('🎉 Signup successful! Please login.');
    showLogin();
}

// Login Function
function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('🚀 Login successful!');
        showDashboard("user");
    } else {
        alert('❌ Invalid credentials!');
    }
}

// Logout Function
function logout() {
    alert("👋 Logged out!");
    showHome();
}

// Toggle Password Visibility
function togglePassword(inputId, toggleId) {
    let input = document.getElementById(inputId);
    let toggle = document.getElementById(toggleId);
    if (input.type === "password") {
        input.type = "text";
        toggle.innerText = "🙈";
    } else {
        input.type = "password";
        toggle.innerText = "👀";
    }
}
