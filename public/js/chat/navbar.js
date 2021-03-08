const scrollUpLi = document.getElementById('scroll-up-li');
const pageName = document.getElementById('page-name');
const activePageHeader = document.getElementById('header');

scrollUpLi.addEventListener('click', () => {
  activePageHeader.scrollIntoView({ behavior: 'smooth' });
  pageName.scrollIntoView({ behavior: 'smooth' });
});
