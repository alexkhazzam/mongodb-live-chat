const settingsLi = document.getElementById('settings-li');
const html = document.querySelector('html');
const navLinks = document.querySelectorAll('.nav-link');
const modalNav = document.getElementById('main-settings-nav');
const closeModal = document.getElementById('close-modal');
const settingsModal = document.getElementById('settings-modal');

const preferencesLink = document.getElementById('preferences-link');
const preferencesContent = document.getElementById('preferences');

const securityLink = document.getElementById('security-link');
const securityContent = document.getElementById('security');

const adminLink = document.getElementById('admin-link');
const adminContent = document.getElementById('admin');

adminLink.addEventListener('click', () => {
  adminContent.style.display = 'block';
  preferencesContent.style.display = 'none';
  securityContent.style.display = 'none';
});

preferencesLink.addEventListener('click', () => {
  adminContent.style.display = 'none';
  securityContent.style.display = 'none';
  preferencesContent.style.display = 'block';
});

securityLink.addEventListener('click', () => {
  adminContent.style.display = 'none';
  preferencesContent.style.display = 'none';
  securityContent.style.display = 'block';
});

let clicked = false;

closeModal.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

settingsLi.addEventListener('click', () => {
  settingsModal.style.display = 'block';
  preferencesLink.className += ' active-link';
  closeModal.className = 'nav-link';
  securityLink.className = 'nav-link';
  adminLink.className = 'nav-link';
  adminContent.style.display = 'none';
  securityContent.style.display = 'none';
  preferencesContent.style.display = 'block';
});

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    navLinks.forEach((l) => {
      if (l.className.includes('active-link')) {
        l.className = 'nav-link';
      }
    });
    e.target.className += ' active-link';
  });
});
