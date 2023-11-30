# Selfbot

This is a Discord Selfbot project written in TypeScript using [`discord.js-selfbot-v13`](https://www.npmjs.com/package/discord.js-selfbot-v13). It contains a framework and some basic commands and utilities.

## Prerequisites

- Node.js
- pnpm
- TypeScript

## Installation

1. Clone the repository
```bash
git clone https://github.com/DeltAndy123/Selfbot
```
2. Install dependencies
```bash
pnpm install
```
3. Fill in your Discord token and command prefix in `config.yml`
```yaml
# Enter your user token here. Paste the code from ./docs/get_user_token.js
# to the console copy your user token.
token: ""

# Enter the prefix here. This is the prefix that you will use for commands.
prefix: "!"
```
4. Compile TypeScript files
```bash
pnpm build
```
5. Run the bot
```bash
pnpm start
```

## Features

- Command handler
- Event handler
- `ping` command

## Usage

Commands and events are loaded from the `commands` and `events` directories respectively. To add a new command or event, create a new file in the corresponding directory. Refer to the existing commands and events for examples.

## Disclaimer

This project is for educational purposes only. Selfbots violate Discord's Terms of Service and can lead to account termination.

## License

[MIT](https://choosealicense.com/licenses/mit/)
