#![feature(proc_macro_hygiene)]
#[mantle::service]
mod service {
    #[derive(Service)]
    pub struct HelloWorld;

    impl HelloWorld {
        pub fn new(_ctx: &Context) -> Result<Self> {
            Ok(Self)
        }

        pub fn say_hello(&mut self, ctx: &Context) -> Result<String> {
            Ok(format!("Hello, {:x}!", ctx.sender()))
        }
    }
}

#[test]
fn test() {
    let sender = mantle_test::create_account(1);
    let ctx = Context::default().with_sender(sender);
    let mut client = HelloWorld::new(&ctx).unwrap();
    println!("{}", client.say_hello(&ctx).unwrap());
}
