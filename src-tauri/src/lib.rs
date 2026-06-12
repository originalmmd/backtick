use std::sync::Mutex;
use tauri::{Emitter, Manager};

struct AppState {
    initial_path: Option<String>,
}

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    let abs = std::path::Path::new(&path);
    let abs = if abs.is_relative() {
        let cwd = std::env::current_dir().map_err(|e| e.to_string())?;
        cwd.join(abs)
    } else {
        abs.to_path_buf()
    };
    std::fs::read_to_string(&abs).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_initial_path(state: tauri::State<'_, Mutex<AppState>>) -> Option<String> {
    state.lock().ok()?.initial_path.take()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_single_instance::init(|app, args, _cwd| {
            let path = args.get(1).cloned().unwrap_or_default();
            if let Some(win) = app.get_webview_window("main") {
                let _ = win.emit("single-instance", path);
            }
        }))
        .setup(|app| {
            let args: Vec<String> = std::env::args().collect();
            let initial = args.get(1).filter(|p| !p.starts_with('-')).cloned();
            app.manage(Mutex::new(AppState { initial_path: initial }));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![read_file, get_initial_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
