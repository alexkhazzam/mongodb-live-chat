const showClientSecurity = document.getElementById('security-link');
const submitSecurityQuestion = document.getElementById(
  'submit-security-question'
);
const securitySuggestion = document.getElementById('security-suggestion');
const loadingSpinner = document.getElementById('loading-spinner');

submitSecurityQuestion.addEventListener('click', () => {
  if (securitySuggestion.value.trim() === '') {
    return;
  } else {
    const data = securitySuggestion.textContent.trim();
    loadingSpinner.style.display = 'inline-block';

    fetch('/api/client/security/credential-question', { email: data })
      .then((response) => {
        console.log(response);
        securitySuggestion.value = '';
        loadingSpinner.style.display = 'none';
      })
      .catch((err) => {
        console.log('err');
        securitySuggestion.value = '';
        loadingSpinner.style.display = 'none';
        throw err;
      });
  }
});

showClientSecurity.addEventListener('click', () => {
  fetch('/api/client/security/user-credentials').then((response) => {
    response.json().then((data) => {
      if (data.clientEmail && data.clientFirstName && data.clientLastName) {
        const firstName = document.getElementById('security-item__first-name');
        const lastName = document.getElementById('security-item__last-name');
        const email = document.getElementById('security-item__email');
        const password = document.getElementById('security-item__password');

        firstName.textContent = data.clientFirstName;
        lastName.textContent = data.clientLastName;
        email.textContent = data.clientEmail;
        password.textContent = data.clientPasswordHash;
      }
    });
  });
});
