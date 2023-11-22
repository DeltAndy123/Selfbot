import {SelfbotClient} from "./client";
import {Message} from "discord.js-selfbot-v13";

export interface SelfbotCommandOpts {
  client: SelfbotClient;
}
export const SelfbotOptionTypes = {
  String: 0,
  Integer: 1,
  Float: 2,
  Boolean: 3,
  User: 4,
  Role: 5,
  Mentionable: 6,
  Channel: 7,
}
interface SelfbotOption {
  name: string;
  description: string;
  type: number;
  required?: boolean;
  choices?: Array<{name: string, value: string}>;
  default?: string;
  parse?: (val: string) => any;
  validate?: (val: string) => boolean;
  validateError?: string;
}

export interface SelfbotCommandRunOptions {
  message: Message;
  output: (content: string) => Promise<Message>;
  getOption: (name: string) => any;
}

interface SelfbotCommandConstructor {
  client: SelfbotClient;
  name: string;
  options?: SelfbotOption[];
}
export class SelfbotCommand {
  public name: string;
  public options: SelfbotOption[];
  public client: SelfbotClient;
  constructor(opts: SelfbotCommandConstructor) {
    this.client = opts.client;
    this.name = opts.name;
    this.options = opts.options || [];
  }
  public run(opts: SelfbotCommandRunOptions) {}
}