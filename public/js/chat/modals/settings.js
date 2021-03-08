const settingsLi = document.getElementById('settings-li');
const html = document.querySelector('html');
const settingsModal = document.getElementById('settings-modal');

settingsLi.addEventListener('click', () => {
  settingsModal.style.display = 'block';
  settingsModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });
});
