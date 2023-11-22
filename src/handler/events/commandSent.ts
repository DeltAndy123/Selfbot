import {SelfbotEvent, SelfbotEventOpts} from "../";
import {Message} from "discord.js-selfbot-v13";

class CommandSentEvent extends SelfbotEvent {
  constructor(opts: SelfbotEventOpts) {
    super({
      ...opts,
      event: "messageCreate"
    });
  }
  run(message: Message) {
    if (message.author.id !== this.client.user!.id) return;
    if (!message.content.startsWith(this.client.prefix)) return;
    const strippedText = message.content.substring(this.client.prefix.length);
    const argArr = [...strippedText.matchAll(/-*([^ ]+)\s*=\s*(".*?(?<!\\)"|[^ ]+)|[^ ]+/g)];
    const commandName = argArr.shift()![0];
    const command = this.client.commands.get(commandName);
    if (!command) return;
    const opts = Object.fromEntries([...argArr].map((arg) => {
      const optionName = arg[1];
      const optionValue = arg[2];
      if (!optionName) return [arg[0], true];
      if (!optionValue) return [optionName, true];
      if (optionValue.startsWith("\"") && optionValue.endsWith("\"")) {
        return [optionName, optionValue.substring(1, optionValue.length - 1)];
      }
      return [optionName, optionValue];
    }));
    const commandOutput: string[] = [];
    command.run({
      message,
      output: (content: string) => {
        commandOutput.push(content);
        return message.edit(`\`Used command ${this.client.prefix}${commandName}\`\n\n${commandOutput.join("\n")}`);
      },
      getOption: (name: string) => opts[name]
    })
  }
}

export const events = [CommandSentEvent]