import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user?.tag || 'unknown'}`);
});

client.on('messageCreate', (msg) => {
  if (msg.content === '!ping') {
    msg.reply('pong');
  }
});

if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN);
} else {
  console.log('DISCORD_TOKEN not set');
}
