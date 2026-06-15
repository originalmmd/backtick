import { invoke } from '@tauri-apps/api/core';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { open } from '@tauri-apps/plugin-dialog';
import { render, applyTheme, initTheme } from './renderer.js';

const appWindow = getCurrentWebviewWindow();

async function openFile(path) {
  try {
    const content = await invoke('read_file', { path });
    render(content);
  } catch (err) {
    document.getElementById('loading').innerHTML = `<p>Error: ${err}</p>`;
  }
}

async function pickAndOpenFile() {
  const path = await open({
    multiple: false,
    filters: [{ name: 'Markdown', extensions: ['md', 'markdown', 'mdown', 'mkd'] }],
  });
  if (path) openFile(path);
}

appWindow.listen('file-opened', (event) => {
  openFile(event.payload);
});

appWindow.listen('single-instance', (event) => {
  if (event.payload) openFile(event.payload);
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
    e.preventDefault();
    pickAndOpenFile();
  }
});

document.getElementById('open-btn').addEventListener('click', pickAndOpenFile);

appWindow.onDragDropEvent((event) => {
  const overlay = document.getElementById('drop-overlay');
  if (event.payload.type === 'drop') {
    overlay.classList.remove('visible');
    const path = event.payload.paths[0];
    if (path && path.match(/\.md$/i)) openFile(path);
  } else if (event.payload.type === 'over' || event.payload.type === 'enter') {
    overlay.classList.add('visible');
  } else {
    overlay.classList.remove('visible');
  }
});

const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const themeSelect = document.getElementById('theme-select');

settingsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsPanel.classList.toggle('visible');
});

document.addEventListener('click', (e) => {
  if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
    settingsPanel.classList.remove('visible');
  }
});

themeSelect.addEventListener('change', (e) => {
  localStorage.setItem('bt-theme', e.target.value);
  applyTheme();
});

initTheme();
themeSelect.value = localStorage.getItem('bt-theme') || 'system';

(async () => {
  const path = await invoke('get_initial_path');
  if (path) openFile(path);
})();
