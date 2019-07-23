use oasis_std::{Context, Service};

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
    oasis_std::service!(MyService);
}

#[cfg(test)]
mod tests {
    extern crate oasis_test;

    use super::*;

    #[test]
    fn test() {
        let sender = oasis_test::create_account(1);
        let ctx = Context::default().with_sender(sender);
        let mut client = MyService::new(&ctx);
        println!("{}", client.say_hello(&ctx));
    }
}
