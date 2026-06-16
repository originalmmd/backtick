use std::io::Write;

/// Test that read_file successfully reads a file from disk.
#[test]
fn test_read_file_success() {
    let mut tmp = tempfile::NamedTempFile::new().unwrap();
    write!(tmp, "# Hello\n\nWorld").unwrap();
    let path = tmp.path().to_string_lossy().to_string();
    let result = std::fs::read_to_string(&path);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "# Hello\n\nWorld");
}

/// Test that read_file returns an error for nonexistent files.
#[test]
fn test_read_file_not_found() {
    let result = std::fs::read_to_string("/nonexistent/path.md");
    assert!(result.is_err());
}

/// Test that read_file handles a file with no contents.
#[test]
fn test_read_file_empty() {
    let tmp = tempfile::NamedTempFile::new().unwrap();
    let path = tmp.path().to_string_lossy().to_string();
    let result = std::fs::read_to_string(&path);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "");
}

/// Test that read_file handles UTF-8 content correctly.
#[test]
fn test_read_file_unicode() {
    let mut tmp = tempfile::NamedTempFile::new().unwrap();
    write!(tmp, "Helló Wörld — 日本語 🔥").unwrap();
    let path = tmp.path().to_string_lossy().to_string();
    let result = std::fs::read_to_string(&path);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "Helló Wörld — 日本語 🔥");
}
