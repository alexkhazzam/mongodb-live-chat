const showClientSecurity = document.getElementById('security-link');
const submitSecurityQuestion = document.getElementById(
  'submit-security-question'
);
const securitySuggestion = document.getElementById('security-suggestion');
const loadingSpinner = document.getElementById('loading-spinner');
const createNewPassword = document.getElementById('submit-password');

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

// createNewPassword.addEventListener('click', async () => {
//   const password = document.getElementById('current-password');
//   const newPassword = document.getElementById('password');
//   const confPassword = document.getElementById('confirm-password');

//   if (
//     password.value.trim() === '' ||
//     newPassword.value.trim() === '' ||
//     confPassword.value.trim() === ''
//   ) {
//     return;
//   } else {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt
//       .hash(newPassword, saltRounds)
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });

//     console.log(hashedPassword);

//   fetch('/api/client/security/password-matches', hashedPassword).then(
//     async (response) => {
//       if (response) {
//         const passwordsChanged = await fetch(
//           '/api/client/security/change-password',
//           hashedPassword
//         ).catch((err) => {
//           console.log(err);
//           throw err;
//         });
//         if (passwordsChanged) {
//           console.log('passwords changed');
//         }
//       }
//     }
//   );
//   }
// });

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
