import {SelfbotClient} from "./client";
import {ClientEvents} from "discord.js-selfbot-v13";

export interface SelfbotEventOpts {
  client: SelfbotClient;
}

interface SelfbotEventConstructor {
  client: SelfbotClient;
  event: keyof ClientEvents;
  once?: boolean;
}
export class SelfbotEvent {
  public event: keyof ClientEvents;
  public once: boolean;
  public client: SelfbotClient;
  constructor(opts: SelfbotEventConstructor) {
    this.client = opts.client;
    this.event = opts.event;
    this.once = opts.once || false;
  }
  run(...opts: any) {}
}