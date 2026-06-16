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

#[cfg(windows)]
fn register_context_menu() {
    let exe = std::env::current_exe().ok().unwrap_or_default();
    if !exe.exists() {
        return;
    }
    let exe_path = exe.to_string_lossy().replace('/', "\\");
    let exe_cmd = format!("\"{}\" \"%1\"", exe_path);
    let extensions = ["md", "markdown", "mdown", "mkd"];
    let base = r"Software\Classes";

    if let Ok(classes) = winreg::RegKey::predef(winreg::enums::HKEY_CURRENT_USER)
        .open_subkey_with_flags(base, winreg::enums::KEY_READ | winreg::enums::KEY_WRITE)
    {
        for ext in &extensions {
            let label_path = format!(".{}\\shell\\Read with Backtick", ext);
            let cmd_path = format!("{}\\command", label_path);
            if let Ok(key) = classes.create_subkey(&label_path) {
                let _ = key.0.set_value("", &"Read with Backtick");
            }
            if let Ok(key) = classes.create_subkey(&cmd_path) {
                let _ = key.0.set_value("", &exe_cmd);
            }
        }
    }
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
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            #[cfg(windows)]
            register_context_menu();
            let args: Vec<String> = std::env::args().collect();
            let initial = args.get(1).filter(|p| !p.starts_with('-')).cloned();
            app.manage(Mutex::new(AppState {
                initial_path: initial,
            }));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![read_file, get_initial_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
