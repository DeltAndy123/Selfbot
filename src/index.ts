import {existsSync, readFileSync} from "fs";
import * as YAML from "yaml";
import {SelfbotClient} from "./handler";
import path from "path";

if (!existsSync("./config.yml")) throw new Error("Config file does not exist");
const config = YAML.parse(readFileSync("./config.yml", "utf-8"));
if (!config) throw new Error("Config file is empty");
if (!config.token) throw new Error("Key 'token' is not provided in config file");
if (!config.prefix) throw new Error("Key 'prefix' is not provided in config file");

const client = new SelfbotClient({
  prefix: config.prefix,
  checkUpdate: false,
});

client.loadCommands(path.join(__dirname, "commands"))
    .then(() => {
      console.log(`Loaded ${client.commands.size} commands`);
      return client.loadEvents(path.join(__dirname, "events"))
    })
    .then(() => {
      console.log(`Loaded ${client.events.size} events`);
      client.listenForEvents()
    });

client.login(config.token);