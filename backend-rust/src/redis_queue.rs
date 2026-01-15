use redis::{Commands, Client};

pub fn push_log(log: &str) {
    let client = Client::open("redis://redis:6379").unwrap();
    let mut con = client.get_connection().unwrap();

    let _: () = con.rpush("logs", log).unwrap();
}

pub fn get_logs() -> Vec<String> {
    let client = Client::open("redis://redis:6379").unwrap();
    let mut con = client.get_connection().unwrap();

    con.lrange("logs", 0, -1).unwrap()
}
