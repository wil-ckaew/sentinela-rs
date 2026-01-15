use redis::{Commands, RedisResult};

pub fn push_to_queue(payload: &str) -> RedisResult<()> {
    let client = redis::Client::open("redis://redis:6379")?;
    let mut con = client.get_connection()?;

    con.lpush::<_, _, ()>("sentinela_queue", payload)?;
    Ok(())
}
