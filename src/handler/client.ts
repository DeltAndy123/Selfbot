import {Client, ClientOptions, Collection} from "discord.js-selfbot-v13";
import {SelfbotCommand} from "./commands";
import {SelfbotEvent} from "./events";
import {readdirSync} from "fs";
import path from "path";

interface SelfbotCommandType {
  new(opts: {client: SelfbotClient}): SelfbotCommand;
}
interface SelfbotEventType {
  new(opts: {client: SelfbotClient}): SelfbotEvent;
}
export class SelfbotClient extends Client {
  public container: Collection<string, any> = new Collection();
  public commands: Collection<string, SelfbotCommand> = new Collection();
  public events: Set<SelfbotEvent> = new Set();
  public prefix: string;
  constructor({
      prefix,
      ...opts
              } : {
      prefix: string;
  } & ClientOptions) {
    super(opts);
    this.prefix = prefix;
    this.loadEvents(path.join(__dirname, "./events"));
  }
  async loadCommands(commandsDir: string) {
    const commands = readdirSync(commandsDir).filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
    for (const command of commands) {
      const file: {
        commands: SelfbotCommandType[]
      } = await import(`${commandsDir}/${command}`);
      file.commands.forEach((cmdClass) => {
        const cmd = new cmdClass({
          client: this
        });
        this.commands.set(cmd.name, cmd);
      })
    }
  }
  async loadEvents(eventsDir: string) {
    const events = readdirSync(eventsDir).filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
    for (const event of events) {
      const file: {
        events: SelfbotEventType[]
      } = await import(`${eventsDir}/${event}`);
      file.events.forEach((evtClass) => {
        const evt = new evtClass({
          client: this
        });
        this.events.add(evt);
      })
    }
  }

  public listenForEvents() {
    this.events.forEach((event) => {
      if (event.once) return this.once(event.event, event.run.bind(event));
      this.on(event.event, event.run.bind(event));
    })
  }
}