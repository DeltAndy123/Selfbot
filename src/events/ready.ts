import {SelfbotEvent, SelfbotEventOpts} from "../handler";

class ReadyEvent extends SelfbotEvent {
  constructor(opts: SelfbotEventOpts) {
    super({
      ...opts,
      event: "ready",
      once: true
    });
  }
  run() {
    console.log(`Logged in as ${this.client.user!.tag}`)
  }
}

export const events = [ReadyEvent]