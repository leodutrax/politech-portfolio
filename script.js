const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
const links = [...navigation.querySelectorAll('a')];
document.documentElement.classList.add('js');
toggle.hidden = false;

function showMenu(open) {
  navigation.dataset.open = String(open);
  toggle.setAttribute('aria-expanded', String(open));
}

showMenu(false);
toggle.addEventListener('click', () => showMenu(navigation.dataset.open !== 'true'));
navigation.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    showMenu(false);
    toggle.focus();
  }
});

function markCurrent(id) {
  links.forEach((link) => {
    if (link.hash === '#' + id) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

links.forEach((link) => link.addEventListener('click', () => {
  showMenu(false);
  markCurrent(link.hash.slice(1));
}));

const sections = [...document.querySelectorAll('main section[id]')];
function syncNavigation() {
  const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
  const current = atEnd ? sections.at(-1) : sections.findLast((section) => section.getBoundingClientRect().top < 150);
  markCurrent(current?.id || sections[0].id);
}
window.addEventListener('scroll', syncNavigation, {passive:true});
window.addEventListener('resize', syncNavigation);
syncNavigation();

const viewer = document.querySelector('#visualizador');
const enlarged = viewer.querySelector('img');
const caption = viewer.querySelector('p');
document.querySelectorAll('.shot a').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !viewer.showModal) return;
    event.preventDefault();
    const image = link.querySelector('img');
    enlarged.src = link.href;
    enlarged.alt = image.alt;
    viewer.querySelector('strong').textContent = link.dataset.title;
    caption.textContent = link.nextElementSibling.querySelector('span').textContent;
    viewer.showModal();
  });
});
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});
