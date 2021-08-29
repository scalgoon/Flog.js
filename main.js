const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING'
    ],
    allowedMentions: ["roles", "users"],
    partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION']
});

const fs = require('fs');
const config = require('./config.json');
const klaw = require('klaw');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');


client.commands = new Discord.Collection();
client.description = new Discord.Collection();
client.category = new Discord.Collection();
client.categories = fs.readdirSync("./commands");
client.slashCategories = fs.readdirSync("./slashCommands");
client.aliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();

require("./utils/utilsMain")(client);

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {

    let commandfile = require(`./commands/${file}`)

    client.commands.set(commandfile.config.name, commandfile);

    commandfile.config.aliases.forEach(alias => {
        client.aliases.set(alias, commandfile.config.name)
    });
}

const evtFiles = fs.readdirSync('./events');
klaw('./events').on("data", (item) => {
    const evtFile = path.parse(item.path);
    if (!evtFile.ext || evtFile.ext !== ".js") return;
    const event = require(`./events/${evtFile.name}${evtFile.ext}`);
    client.on(evtFile.name, event.bind(null, client));
});


Math.randomBetween = function (min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
};

Array.prototype.remove = function () {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//slash commands

// Place your client and guild ids here

const slashCommands = [];
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = config.clientId;
const guildId = '745925853229350972';

for (const file of slashCommandFiles) {
    const command = require(`./slashCommands/${file}`);
    slashCommands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: slashCommands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        let ping = new MessageEmbed()
            .setTitle(`Calculating ping...`)

        const startTime = Date.now();
        interaction.reply({ embeds: [ping], ephemeral: true })
            .then(msg => {
                const endTime = Date.now();
                var pong = endTime - startTime;

                let ping = new MessageEmbed()
                    .setTitle(`:ping_pong: Pong!`)
                    .setColor('27cc9a')
                    .setDescription(`Latency: ${pong} ms \nApi Latency: ${Math.round(client.ws.ping)} ms`)

                interaction.editReply({ embeds: [ping], ephemeral: true });
            });

    }

    if (interaction.commandName === 'tickets') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('tickets_select')
                    .setPlaceholder('What are you making a ticket for?')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Reporting a user',
                            description: 'This will open a mod ticket',
                            value: 'mod_option'
                        },
                        {
                            label: 'Giving a server suggestion',
                            description: 'This will open a suggestion ticket',
                            value: 'suggestion_option'
                        },
                    ]),
            );

        await interaction.reply({ content: `Ticket options for **${interaction.guild.name}**`, components: [row] });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'tickets_select') {
        await interaction.update({ content: `${interaction.values} was selected`, components: [] });
    }

    if (interaction.values.includes('mod_option')) {
        await interaction.channel.send({ content: `MOD`, components: [] });
    }
});
    

client.login(config.token);
