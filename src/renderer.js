import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
});

marked.setOptions({
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: true,
});

const LIGHT_THEME = 'highlight.js/styles/github.css';
const DARK_THEME = 'highlight.js/styles/github-dark.css';

function getHighlightTheme(mode) {
  const saved = localStorage.getItem('bt-theme') || 'system';
  if (saved === 'light') return LIGHT_THEME;
  if (saved === 'dark') return DARK_THEME;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
}

function isDarkTheme() {
  const saved = localStorage.getItem('bt-theme') || 'system';
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function loadHighlightTheme() {
  let link = document.getElementById('hljs-theme');
  if (!link) {
    link = document.createElement('link');
    link.id = 'hljs-theme';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = getHighlightTheme();
}

export function getMermaidTheme() {
  return isDarkTheme() ? 'dark' : 'default';
}

export function render(markdown) {
  const rawHtml = marked.parse(markdown);
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'text', 'g', 'defs', 'use', 'foreignObject'],
    ADD_ATTR: ['viewBox', 'xmlns', 'd', 'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'transform', 'points', 'class', 'id'],
  });

  const container = document.getElementById('content');
  container.innerHTML = cleanHtml;
  container.classList.add('visible');
  document.getElementById('loading').style.display = 'none';

  renderMermaid();
  renderHighlighting();
}

export function applyTheme() {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('bt-theme') || 'system');
  loadHighlightTheme();
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: isDarkTheme() ? {
      background: '#0d1117',
      primaryColor: '#58a6ff',
      primaryTextColor: '#c9d1d9',
      primaryBorderColor: '#30363d',
      lineColor: '#8b949e',
      secondaryColor: '#161b22',
      tertiaryColor: '#21262d',
    } : {
      background: '#fafafa',
      primaryColor: '#0366d6',
      primaryTextColor: '#1a1a2e',
      primaryBorderColor: '#d1d5da',
      lineColor: '#666',
      secondaryColor: '#f6f8fa',
      tertiaryColor: '#eaecef',
    },
    securityLevel: 'loose',
  });
}

export function initTheme() {
  if (!localStorage.getItem('bt-theme')) {
    localStorage.setItem('bt-theme', 'system');
  }
  applyTheme();
}

function renderMermaid() {
  const els = document.querySelectorAll('.language-mermaid');
  if (!els.length) return;

  els.forEach((el) => {
    const pre = el.closest('pre');
    if (pre) {
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = el.textContent;
      pre.parentNode.replaceChild(div, pre);
    }
  });

  try {
    mermaid.run({ querySelector: '.mermaid' });
  } catch (_) {}
}

function renderHighlighting() {
  document.querySelectorAll('pre code:not(.language-mermaid)').forEach((block) => {
    hljs.highlightElement(block);
  });
}

let mq = window.matchMedia('(prefers-color-scheme: dark)');
mq.addEventListener('change', () => {
  if (localStorage.getItem('bt-theme') === 'system') {
    applyTheme();
  }
});
