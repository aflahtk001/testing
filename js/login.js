
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;
      if (username === 'admin' && password === 'password') {   
          window.location.href = 'admin-index.html';  
      } 
      else if (username === 'student' && password === 'password') {
        window.location.href = 'std-index.html';  
      } 
      else {
          errorMessage.textContent = 'Invalid username or password.';
      }
  });
});
