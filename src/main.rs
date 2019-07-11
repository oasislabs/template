use mantle::{Context, Service};

#[derive(Service)]
struct MyService;

impl MyService {
    pub fn new(_ctx: &Context) -> Self {
        Self
    }

    pub fn say_hello(&mut self, ctx: &Context) -> String {
        format!("Hello, {}!", ctx.sender())
    }
}

fn main() {
    mantle::service!(MyService);
}

#[cfg(test)]
mod tests {
    extern crate mantle_test;

    use super::*;

    #[test]
    fn test() {
        let sender = mantle_test::create_account(1);
        let ctx = Context::default().with_sender(sender);
        let mut client = MyService::new(&ctx);
        println!("{}", client.say_hello(&ctx));
    }
}
