import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMermaidTheme, render, applyTheme, initTheme } from './renderer.js';

vi.mock('marked', () => ({
  marked: {
    setOptions: vi.fn(),
    parse: vi.fn(() => '<p>rendered content</p>'),
  },
}));

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html) => html),
  },
}));

vi.mock('highlight.js', () => ({
  default: {
    highlightElement: vi.fn(),
  },
}));

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    run: vi.fn(),
  },
}));

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = `
    <div id="content"></div>
    <div id="loading">Loading...</div>
  `;
});

describe('getMermaidTheme', () => {
  it('returns dark when theme is dark', () => {
    localStorage.setItem('bt-theme', 'dark');
    expect(getMermaidTheme()).toBe('dark');
  });

  it('returns default when theme is light', () => {
    localStorage.setItem('bt-theme', 'light');
    expect(getMermaidTheme()).toBe('default');
  });
});

describe('initTheme', () => {
  it('sets default theme to system when unset', () => {
    initTheme();
    expect(localStorage.getItem('bt-theme')).toBe('system');
  });

  it('does not override existing theme', () => {
    localStorage.setItem('bt-theme', 'dark');
    initTheme();
    expect(localStorage.getItem('bt-theme')).toBe('dark');
  });
});

describe('render', () => {
  it('renders markdown content into the container', () => {
    render('# Hello');
    const container = document.getElementById('content');
    expect(container.innerHTML).toBe('<p>rendered content</p>');
    expect(container.classList.contains('visible')).toBe(true);
  });

  it('hides the loading indicator', () => {
    render('# Hello');
    const loading = document.getElementById('loading');
    expect(loading.style.display).toBe('none');
  });
});

describe('applyTheme', () => {
  it('applies data-theme attribute to document element', () => {
    localStorage.setItem('bt-theme', 'dark');
    applyTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
