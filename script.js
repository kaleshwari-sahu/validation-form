// Function to show Signup Form
function showSignup() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

// Function to show Login Form
function showLogin() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

// Function to go back to Home
function showHome() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Function to show Dashboard after successful login
function showDashboard(email) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userEmail').innerText = email;
}

// Function to Validate Password
function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return regex.test(password);
}

// Function to Validate Mobile Number
function validateMobile(mobile) {
    const mobileRegex = /^[6-9]\d{9}$/; // Ensures valid 10-digit mobile number
    return mobileRegex.test(mobile);
}

// Function for Signup
function signup() {
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const contact = document.getElementById('signupContact').value.trim();
    const passwordError = document.getElementById('passwordError');

    // Validate Password
    if (!validatePassword(password)) {
        passwordError.innerText = "Password must be 8-16 chars, include uppercase, lowercase, digit, special char.";
        return;
    } else {
        passwordError.innerText = "";
    }

    // Validate Mobile Number
    if (!validateMobile(contact)) {
        alert("🚨 Invalid mobile number! It must be 10 digits and start with 6-9.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if Email is Already Registered
    if (users.some(user => user.email === email)) {
        alert('🚨 Email already registered!');
        return;
    }

    // Check if Contact Number is Already Registered
    if (users.some(user => user.contact === contact)) {
        alert('🚨 Mobile number already in use!');
        return;
    }

    // Save New User
    users.push({ email, password, contact });
    localStorage.setItem('users', JSON.stringify(users));

    alert('🎉 Signup successful! Please login.');
    showLogin();
}

// Function for Login
function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('🚀 Login successful!');
        showDashboard("user");
    } else {
        alert('❌ Invalid credentials! Please check your email & password.');
    }
}

// Logout Function
function logout() {
    alert("👋 Logged out!");
    showHome();
}

// Password Toggle Function
function togglePassword(inputId, toggleId) {
    let input = document.getElementById(inputId);
    let toggle = document.getElementById(toggleId);
    if (input.type === "password") {
        input.type = "text";
        toggle.innerText = "🙈"; // Hide Icon
    } else {
        input.type = "password";
        toggle.innerText = "👀"; // Show Icon
    }
}
