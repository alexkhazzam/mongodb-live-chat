const clientEmail = document.getElementById('email');
const createAccountBtn = document.querySelector('.create-account');
const loginAccountBtn = document.getElementById('login-btn');

if (createAccountBtn) {
  createAccountBtn.addEventListener('click', () => {
    window.localStorage.setItem('clientEmail', clientEmail.value.trim());
  });
}

if (loginAccountBtn) {
  console.log(window.location.href);
  clientEmail.value = window.localStorage.getItem('clientEmail');
}
