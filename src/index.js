import { Client, GatewayIntentBits, REST, Routes, ChannelType } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
});

const commands = [
  {
    name: 'mood',
    description: 'Manage standup mood polls',
    options: [
      {
        type: 1,
        name: 'test',
        description: 'Post a test poll now',
      },
      {
        type: 1,
        name: 'set-time',
        description: 'Set poll time',
        options: [
          {
            type: 3,
            name: 'time',
            description: 'Time in HH:MM format',
            required: true,
          },
        ],
      },
    ],
  },
];

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guildId = process.env.GUILD_ID;
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
      body: commands,
    });
    console.log('Registered slash commands');
  } catch (err) {
    console.error('Failed to register commands:', err);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'mood') {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'test') {
      await interaction.reply({
        content: 'How are you feeling about standup today?',
        components: [
          {
            type: 1,
            components: [
              { type: 2, style: 1, emoji: '😄', custom_id: 'mood_great' },
              { type: 2, style: 1, emoji: '😐', custom_id: 'mood_ok' },
              { type: 2, style: 1, emoji: '😟', custom_id: 'mood_worried' },
            ],
          },
        ],
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
