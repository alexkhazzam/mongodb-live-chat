const form = document.getElementById('register-form');
const registerBtn = document.getElementById('register-btn');
const password = document.getElementById('password');
const email = document.getElementById('email');
const lastName = document.getElementById('lastName');
const passwordConf = document.getElementById('passwordConf');
const passwordError = document.getElementById('password-error');

let errors = 0;

const showCreatingAccountSpinner = () => {
  const loadingSpinner = document.getElementById('creating-account-spinner');
  loadingSpinner.style.display = 'inline-block';
};

// const showLoadingSpinner = () => {
//   const loadingSpinner = document.getElementById('loading-spinner');
//   if (errors === 0) {
//     loadingSpinner.style.display = 'inline-block';
//   }
// };

// registerBtn.addEventListener('click', () => {
//   if (!usingStudentEmail()) {
//     errors++;
//     const emailError = document.getElementById('email-error');
//     return (emailError.style.display = 'block');
//   }
//   if (!isRealFirstName()) {
//     errors++;
//     const firstNameError = document.getElementById('firstName-error');
//     return (firstNameError.style.display = 'block');
//   }
//   if (!isRealLastName()) {
//     errors++;
//     const lastNameError = document.getElementById('lastName-error');
//     return (lastNameError.style.display = 'block');
//   }
//   if (!arePasswordsMatching()) {
//     errors++;
//     passwordError.textContent = 'Passwords need to match.';
//     return (passwordError.style.display = 'block');
//   }
//   if (!isPasswordLongEnough()) {
//     errors++;
//     passwordError.textContent = 'Password must be at least 7 characters long.';
//     return (passwordError.style.display = 'block');
//   }
//   if (!passwordContainsSymbols()) {
//     errors++;
//     passwordError.textContent = 'Password cannot contain symbols.';
//     return (passwordError.style.display = 'block');
//   }
//   if (!doesPasswordContainNumber()) {
//     errors++;
//     passwordError.textContent = 'Password must include at least 1 number.';
//     return (passwordError.style.display = 'block');
//   }
//   form.submit();
// });

// const arePasswordsMatching = () => {
//   if (password.value.trim() !== passwordConf.value.trim()) {
//     return false;
//   } else {
//     return true;
//   }
// };

// const isPasswordLongEnough = () => {
//   if (password.value.trim().length < 7) {
//     return false;
//   } else {
//     return true;
//   }
// };

// const passwordContainsSymbols = () => {
//   return true;
// };

// const usingStudentEmail = () => {
//   if (email.value.trim().split('@')[1] !== 'student.gn.k12.ny.us') {
//     return false;
//   } else {
//     return true;
//   }
// };

// const isRealFirstName = () => {
//   const firstNameLetter = firstName.value.trim().charAt(0).toUpperCase();
//   const firstLetterEmail = email.value.trim().charAt(0).toUpperCase();

//   if (firstNameLetter !== firstLetterEmail) {
//     return false;
//   } else {
//     return true;
//   }
// };

// const isRealLastName = () => {
//   const emailLastName = email.value
//     .trim()
//     .split('@')[0]
//     .substring(1)
//     .slice(0, -1);

//   if (lastName.value.trim().toUpperCase() !== emailLastName.toUpperCase()) {
//     return false;
//   } else {
//     return true;
//   }
// };

// const doesPasswordContainNumber = () => {
//   let numbers = 0;

//   for (let i = 0; i < password.value.trim().length; i++) {
//     if (!isNaN(password.value.trim().charAt(i))) {
//       numbers++;
//     }
//   }

//   if (numbers === 0) {
//     return false;
//   } else {
//     return true;
//   }
// };
