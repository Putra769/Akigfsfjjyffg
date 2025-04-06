document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

const LOADING_DURATION = 2000;
const COPY_FEEDBACK_DURATION = 2000;
const SCROLL_THRESHOLD = 20;

const loadingSpinner = document.getElementById('loading-spinner');
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const copyButtons = document.querySelectorAll('.copy-button');

let isDark = localStorage.getItem('darkMode') === 'true';

function updateTheme() {
  document.body.classList.toggle('dark', isDark);
  themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  lucide.createIcons();
  localStorage.setItem('darkMode', isDark);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
  }, LOADING_DURATION);
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
});

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  updateTheme();
});

copyButtons.forEach(button => {
  button.addEventListener('click', async () => {
    try {
      const code = button.closest('.code-block').querySelector('code').textContent;
      await navigator.clipboard.writeText(code);

      const icon = button.querySelector('.copy-icon');
      icon.setAttribute('data-lucide', 'check');
      button.classList.add('copied');
      lucide.createIcons();

      setTimeout(() => {
        icon.setAttribute('data-lucide', 'copy');
        button.classList.remove('copied');
        lucide.createIcons();
      }, COPY_FEEDBACK_DURATION);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  });
});

updateTheme();