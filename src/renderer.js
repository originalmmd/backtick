import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

marked.setOptions({
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: true,
});

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
