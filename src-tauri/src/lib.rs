use tauri::{Emitter, Manager};

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_single_instance::init(|app, args, _cwd| {
            let window = app.get_webview_window("main");
            if let Some(win) = window {
                let path = args.get(1).cloned().unwrap_or_default();
                let _ = win.emit("single-instance", path);
            }
        }))
        .setup(|app| {
            let args: Vec<String> = std::env::args().collect();
            if let Some(path) = args.get(1) {
                if !path.starts_with('-') {
                    if let Some(window) = app.get_webview_window("main") {
                        let _ = window.emit("file-opened", path.clone());
                    }
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
