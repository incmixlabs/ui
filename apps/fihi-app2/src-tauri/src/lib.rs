// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_shell::ShellExt;
use tauri_plugin_deep_link::DeepLinkExt;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_google_auth(app_handle: AppHandle, url: String) -> Result<(), String> {
    app_handle
        .shell()
        .open(url, None)
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, argv, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                if argv.len() > 1 && argv[1].contains("/auth/callback") {
                    let url = argv[1].clone();
                    window.unminimize().unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                    window.emit("google_auth_callback", url).unwrap();
                }
            }
        }));
    }

    builder
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            #[cfg(any(windows, target_os = "linux"))]
            {
                app.deep_link().register("fihi-app")?;
            }
            // app.deep_link().on_open_url(|event| {
            //     println!("deep link URLs: {:?}", event.urls());
            // });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            open_google_auth
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
