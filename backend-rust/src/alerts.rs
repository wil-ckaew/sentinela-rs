use chrono::Utc;

pub fn generate_alert(level: &str, message: &str) -> String {
    format!(
        "[{}] [{}] {}",
        Utc::now().to_rfc3339(),
        level.to_uppercase(),
        message
    )
}

pub fn critical_alert(message: &str) -> String {
    generate_alert("CRITICAL", message)
}

pub fn warning_alert(message: &str) -> String {
    generate_alert("WARNING", message)
}
