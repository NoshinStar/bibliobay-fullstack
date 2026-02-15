// Login Handler
async function handleLogin(event) {
  event.preventDefault();
  
  try {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    const loginBtn = document.getElementById('login');
    if (loginBtn) {
      loginBtn.disabled = true;
      loginBtn.textContent = 'Logging in...';
    }
    
    // Call API
    await AuthAPI.login(username, password);
    
    alert('Login successful!');
    window.location.href = 'dashboard.html';
    
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message || 'Login failed.');
    
    const loginBtn = document.getElementById('login');
    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Sign In';
    }
  }
}

// Register Handler (Standard User)
async function handleRegister(event) {
  event.preventDefault();
  
  try {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
    
    const registerBtn = document.querySelector('button[name="register"]');
    if (registerBtn) {
      registerBtn.disabled = true;
      registerBtn.textContent = 'Signing up...';
    }
    
    await AuthAPI.register(username, email, password, passwordConfirm);
    
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
    
  } catch (error) {
    console.error('Registration error:', error);
    alert(error.message || 'Registration failed.');
    
    const registerBtn = document.querySelector('button[name="register"]');
    if (registerBtn) {
      registerBtn.disabled = false;
      registerBtn.textContent = 'Sign Up';
    }
  }
}

// NEW: Member Registration Handler
async function handleMemberRegister(event) {
  event.preventDefault();
  
  try {
      const storeName = document.getElementById('storeName').value;
      const ownerName = document.getElementById('ownerName').value;
      
      // FIXED: Get the username from the input field
      const usernameInput = document.getElementById('memberUsername').value;
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;

      if (password !== passwordConfirm) {
          alert('Passwords do not match');
          return;
      }

      const btn = document.querySelector('.btn-color-theme');
      if (btn) {
          btn.disabled = true;
          btn.textContent = 'Registering...';
      }

      // Call API
      await AuthAPI.register(usernameInput, email, password, passwordConfirm, {
          role: 'member',
          address: storeName,
          first_name: ownerName
      });

      alert(`Success! Welcome ${ownerName}.\n\nUsername: ${usernameInput}\n\nRedirecting to dashboard...`);
      window.location.href = 'dashboard.html';

  } catch (error) {
      console.error('Member Registration error:', error);
      
      let msg = error.message;
      if (msg.includes('{')) {
          try {
             const obj = JSON.parse(msg);
             msg = Object.values(obj).flat().join('\n');
          } catch(e) {}
      }
      
      alert(msg || 'Registration failed.');
      
      const btn = document.querySelector('.btn-color-theme');
      if (btn) {
          btn.disabled = false;
          btn.textContent = 'Submit';
      }
  }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
  try {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', handleRegister);

    const memberForm = document.getElementById('memberForm');
    if (memberForm) memberForm.addEventListener('submit', handleMemberRegister);

  } catch (error) {
    console.error('Error setting up event listeners:', error);
  }
});

// Helper Functions
function displayPassword() {
    toggleVisibility('password', 'display-pass', 'hiden-pass');
}
function displayPasswordConfirm() {
    toggleVisibility('passwordConfirm', 'display-passConfirm', 'hiden-passConfirm');
}
function toggleVisibility(inputId, showIconId, hideIconId) {
    const input = document.getElementById(inputId);
    const show = document.getElementById(showIconId);
    const hide = document.getElementById(hideIconId);
    if(input.type === 'password') {
        input.type = 'text';
        if(show) show.style.display = 'block';
        if(hide) hide.style.display = 'none';
    } else {
        input.type = 'password';
        if(show) show.style.display = 'none';
        if(hide) hide.style.display = 'block';
    }
}