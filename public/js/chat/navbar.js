const scrollUpLi = document.getElementById('scroll-up-li');
const pageName = document.getElementById('page-name');

scrollUpLi.addEventListener('click', () => {
  pageName.scrollIntoView({ behavior: 'smooth' });
});
