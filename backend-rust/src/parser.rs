use rayon::prelude::*;

pub fn parse_logs(lines: Vec<String>) -> Vec<String> {
    lines
        .par_iter()
        .filter(|line| line.contains("ERROR") || line.contains("WARN"))
        .cloned()
        .collect()
}
