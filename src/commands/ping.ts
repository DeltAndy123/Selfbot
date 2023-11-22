import {SelfbotOptionTypes, SelfbotCommand, SelfbotCommandRunOptions, SelfbotCommandOpts} from "../handler";

class PingCommand extends SelfbotCommand {
  constructor(opts: SelfbotCommandOpts) {
    super({
      ...opts,
      name: "ping",
      options: [
        {
          name: "pong",
          description: "Pong!",
          type: SelfbotOptionTypes.String,
          required: true,
          choices: [
            {
              name: "Pong!",
              value: "pong"
            }
          ],
          default: "pong",
          parse: (val: string) => val.toLowerCase(),
          validate: (val: string) => val === "pong",
          validateError: "You must say pong!",
        }
      ]
    });
  }
  public run({message, output}: SelfbotCommandRunOptions) {
    const messageSentTime = message.createdAt.getTime();
    const messageReceivedTime = Date.now();
    const messageRoundTripTime = messageReceivedTime - messageSentTime;
    output(`Pong! (${messageRoundTripTime}ms)`);
  }
}

export const commands = [PingCommand]