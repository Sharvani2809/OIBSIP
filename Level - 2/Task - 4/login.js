const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

registerBtn.addEventListener('click', registerUser);
loginBtn.addEventListener('click', loginUser);
logoutBtn.addEventListener('click', logoutUser);

function registerUser() {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const regMessage = document.getElementById('regMessage');

    if (!username || !password) {
        regMessage.textContent = "Please fill in all fields.";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.find(user => user.username === username)) {
        regMessage.textContent = "Username already exists.";
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    regMessage.textContent = "Registration successful!";
}

function loginUser() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const loginMessage = document.getElementById('loginMessage');

    if (!username || !password) {
        loginMessage.textContent = "Please fill in all fields.";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        loginMessage.textContent = "";
        document.getElementById('login').style.display = 'none';
        document.getElementById('securedPage').style.display = 'block';
    } else {
        loginMessage.textContent = "Invalid username or password.";
    }
}

function logoutUser() {
    document.getElementById('securedPage').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('loginMessage').textContent = '';
    document.getElementById('regMessage').textContent = '';
}
