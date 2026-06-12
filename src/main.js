import { invoke } from '@tauri-apps/api/core';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { render } from './renderer.js';

const appWindow = getCurrentWebviewWindow();

async function openFile(path) {
  try {
    const content = await invoke('read_file', { path });
    render(content);
  } catch (err) {
    document.getElementById('loading').innerHTML = `<p>Error: ${err}</p>`;
  }
}

appWindow.listen('file-opened', (event) => {
  openFile(event.payload);
});

appWindow.listen('single-instance', (event) => {
  const path = event.payload;
  if (path) openFile(path);
});

(async () => {
  const path = await invoke('get_initial_path');
  if (path) openFile(path);
})();
