const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types');
const fs = require('fs');
const config = require('./config.json');

module.exports = (client, guild) => {
    const commands = [];

    const commandFiles = fs.readdirSync('../slashCommands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../slashCommands/${file}`);

        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(config.token);

    (async () => {
        try {
            console.log("Slash Commands being registered");

            await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: commands },
            );

            console.log('Slash Commands successfully registered');
        } catch (e) {
            console.log(e);
        }
    })();

}