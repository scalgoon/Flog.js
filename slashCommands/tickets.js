const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
     .setName('tickets')
     .setDescription('Sends options to open a ticket'),
};