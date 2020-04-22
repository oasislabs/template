use oasis_std::{abi::*, collections::Set, Address, Context, Event};

#[derive(oasis_std::Service)]
struct Greeter {
    greeting: String,
    greeted: Set<String>,
    /* all fields must be (de)serializable, so remember to use
     * `#[derive(Serialize, Deserialize)]` when storing your own types */
}

impl Greeter {
    pub fn new(_ctx: &Context, greeting: String) -> Self {
        eprintln!("new confidential greeter has been deployed");
        Self {
            greeting,
            greeted: Set::new(), // a more efficient `Set` type for short-lived Wasm
        }
    }

    pub fn greet(&mut self, ctx: &Context, name: String) -> String {
        let greeting = format!("{} {}", self.greeting, name);
        Event::emit(&Greeted {
            from: &ctx.sender(),
            to: &name,
        });
        self.greeted.insert(name);
        greeting
    }

    pub fn get_greeted(&self, _ctx: &Context) -> &Set<String> {
        &self.greeted
    }
}

#[derive(Serialize, Event)]
// Events are only emitted (never read), so no need to derive `Deserialize`.
pub struct Greeted<'a> {
    from: &'a Address,
    to: &'a String,
}

fn main() {
    oasis_std::service!(Greeter);
}
