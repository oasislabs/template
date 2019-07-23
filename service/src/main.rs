use oasis_std::Context;

#[derive(oasis_std::Service)]
struct Quickstart;

impl Quickstart {
    pub fn new(_ctx: &Context) -> Self {
        Self
    }

    pub fn say_hello(&mut self, ctx: &Context) -> String {
        format!("Hello, {}!", ctx.sender())
    }
}

fn main() {
    oasis_std::service!(Quickstart);
}

#[cfg(test)]
mod tests {
    extern crate oasis_test;

    use super::*;

    #[test]
    fn test() {
        let sender = oasis_test::create_account(1);
        let ctx = Context::default().with_sender(sender);
        let mut client = Quickstart::new(&ctx);
        println!("{}", client.say_hello(&ctx));
    }
}
