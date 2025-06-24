/*
  index.js - Lógica para multilenguaje, tabs, modo oscuro y animaciones suaves
  Autor: Dylan Elizondo
*/

// --- Multilenguaje global ---
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'es';

function setLanguage(lang) {
  currentLang = lang;
  // Cambia textos con data-es/data-en
  document.querySelectorAll('[data-es], [data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  // Cambia el botón de idioma
  langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
  // Tabs de Sobre mí
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.getAttribute('data-lang') === lang);
  });
  // Cambia el CV según idioma
  const cvBtn = document.getElementById('cv-btn');
  if (cvBtn) {
    if (lang === 'es') {
      cvBtn.setAttribute('href', './Resume/DYLAN_ELIZONDO_ALVARADO_CV_ESP.pdf');
      cvBtn.setAttribute('download', 'DYLAN_ELIZONDO_ALVARADO_CV_ESP.pdf');
    } else {
      cvBtn.setAttribute('href', './Resume/DYLAN_ELIZONDO_ALVARADO_CV_ENG.pdf');
      cvBtn.setAttribute('download', 'DYLAN_ELIZONDO_ALVARADO_CV_ENG.pdf');
    }
  }
  // Traduce la barra de navegación
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.hasAttribute(`data-${lang}`)) {
      link.textContent = link.getAttribute(`data-${lang}`);
    }
  });
}

langToggle.addEventListener('click', () => {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
});

// Tabs de Sobre mí
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.getAttribute('data-lang'));
  });
});

// --- Modo oscuro ---
const darkToggle = document.getElementById('darkmode-toggle');
const darkIcon = document.getElementById('darkmode-icon');

function setDarkMode(active) {
  document.body.classList.toggle('darkmode', active);
  darkIcon.textContent = active ? '☀️' : '🌙';
  localStorage.setItem('darkmode', active ? '1' : '0');
}

darkToggle.addEventListener('click', () => {
  setDarkMode(!document.body.classList.contains('darkmode'));
});

// Persistencia de modo oscuro
if (localStorage.getItem('darkmode') === '1') setDarkMode(true);

// --- Animaciones suaves con IntersectionObserver ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// --- Navegación sticky y scroll suave ---
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
    // Cierra menú hamburguesa en móvil
    document.querySelector('.navbar__links').classList.remove('open');
  });
});

// --- Menú hamburguesa ---
const burger = document.getElementById('navbar-burger');
const navLinksList = document.querySelector('.navbar__links');
if (burger && navLinksList) {
  burger.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
  });
  // Cierra menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!navLinksList.contains(e.target) && !burger.contains(e.target)) {
      navLinksList.classList.remove('open');
    }
  });
}

// Inicializa idioma por defecto
setLanguage('es');
