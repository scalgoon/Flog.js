require("colors");

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
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
const db = require('quick.db');


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
client.log('Load', `Loading a total of ${evtFiles.length} events`)
klaw('./events').on("data", (item) => {
    const evtFile = path.parse(item.path);
    if (!evtFile.ext || evtFile.ext !== ".js") return;
    const event = require(`./events/${evtFile.name}${evtFile.ext}`);
    client.on(evtFile.name, event.bind(null, client));
    client.log('EVENT BIND', `Event ${evtFile.name.green} was linked to file ${(evtFile.name + evtFile.ext).green}`)
});


//slash commands

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
        client.log('Slash', `Started refreshing application (/) commands.`)

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: slashCommands },
        );

        client.log('Slash', `Successfully reloaded application (/) commands.`)
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

        await interaction.reply({ content: `Ticket options for **${interaction.guild.name}**`, components: [row], ephemeral: true });
    }
});

client.on('interactionCreate', async (interaction, guild) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'tickets_select') {
        await interaction.update({ content: `Your option has been selected`, components: [], ephemeral: true });
    }

    if (interaction.values.includes('mod_option')) {
        let tik = db.fetch(`tickchnl_${interaction.guild.id}`);

        if (tik === null) {
            return interaction.channel.send("Please set a ticket channel category")
        };

        let donetik = await interaction.guild.channels.create(`Ticket: ${interaction.user.username}`, {
            type: 'text',
            parent: `${tik}`,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }
            ]
        })

        interaction.followUp({ content: `Your ticket has been made: ${donetik}`, ephemeral: true });

        const row = new MessageActionRow()
            .addComponents(

                new MessageButton()
                    .setCustomId('del')
                    .setLabel('Delete')
                    .setStyle('DANGER'),

                new MessageButton()
                    .setCustomId('lok')
                    .setLabel('Lock')
                    .setStyle('SECONDARY')


            );

        donetik.send({ content: `Thank you for contacting ${interaction.guild.name} support!\nA staff member will be right with you **${interaction.user.username}**`, components: [row] });

        let chx = db.get(`botlgs_${interaction.guild.id}`);

        if (chx === null) {
            return;
        }

        let tikmade = new MessageEmbed()
            .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
            .setDescription(`Ticket was made`)
            .addField("Author", `Name: **${interaction.user.tag}** \nID: ${interaction.user.id}`)
            .addField("Channel", `Name: ${donetik} \nID: ${donetik.id}`)
            .setColor("PURPLE")
            .setTimestamp()

        client.channels.cache.get(chx).send({ embeds: [tikmade] });
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isButton()) return
    switch (interaction.customId) {
        case "del":
            interaction.reply("This ticket will be automatically deleted in 5 seconds.")
            setTimeout(() => interaction.channel.delete(), 5000);

            let chx = db.get(`botlgs_${interaction.guild.id}`);

        if (chx === null) {
            return;
        }

        let tikgone = new MessageEmbed()
            .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
            .setDescription(`Ticket was deleted`)
            .addField("Moderator", `Name: **${interaction.user.tag}** \nID: ${interaction.user.id}`)
            .addField("Channel", `Name: ${interaction.channel.name} \nID: ${interaction.channel.id}`)
            .setColor("RED")
            .setTimestamp()

        client.channels.cache.get(chx).send({ embeds: [tikgone] });
    }
    
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isButton()) return
    switch (interaction.customId) {
        case "lok":
            interaction.reply("This ticket is now locked")
            interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: false });
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isButton()) return
    switch (interaction.customId) {
        case "topdel":
            let chx = db.get(`topchannel_${interaction.guild.id}`);

    try {
        client.channels.cache.get(chx).send("This topic will be automatically deleted in 5 seconds.")
        setTimeout(() =>  client.channels.cache.get(chx).delete(), 5000);

        interaction.reply({ content: "Topic successfully deleted!", ephemeral: true })

        db.set(`topchannel_${interaction.guild.id}`, null);
    }catch(e){
        interaction.reply({ content: "An error occured! \nMaybe this topic is already deleted?", ephemeral: true })
    }
    }
})

client.on("messageDelete", (message) => {
    let chx = db.get(`botlgs_${message.guild.id}`);

    if (chx === null) {
        return;
    }


    let delet = new MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL())
        .setDescription(`Message deleted in <#${message.channel.id}>`)
        .addField("Author", `Name: <@${message.author.id}> \nID: ${message.author.id}`)
        .addField("Channel", `Name: ${message.channel.name} \nID: ${message.channel.id}`)
        .addField(`Content:`, `\`\`\`\n${message.content}\n\`\`\``)
        .setColor("PURPLE")
        .setTimestamp()

    client.channels.cache.get(chx).send({ embeds: [delet] });

})



client.login(config.token);

