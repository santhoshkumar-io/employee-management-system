document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  const errorMessage = document.querySelector('#error-message');
  errorMessage.classList.add('hidden');

  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const username = document.querySelector('#uname').value;
    const password = document.querySelector('#password').value;
    if (username === 'santhosh' && password === 'santa') {
      // Save login status in localStorage

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', username);

      // Redirect to dashboard
      window.location.href = './src/employee-dashboard/dashboard.html';
    } else {
      document.querySelector('#uname').value = '';
      document.querySelector('#password').value = '';
      errorMessage.classList.remove('hidden');
    }
  });
});
