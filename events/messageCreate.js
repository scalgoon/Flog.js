const { MessageEmbed } = require('discord.js');

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = async (client, message) => {
    if(!message.guild ||
        message.author.bot) return;

    client.settings = await client.getGuildDB(message.guild.id);

    /**
     * @param str - text
     * @return Array - a splitted array of str.
     */
    const splitWhitespace = (str) => str.split(/[ ,]+/).filter(Boolean);

    let mbed = new MessageEmbed()
            .setDescription(`Your sentence:\n> ${message.content}\nContains a banned word`)
            .setColor("RED")

    splitWhitespace(message.content).map(async(word) => {
        if (message.member.permissions.has('MANAGE_GUILD')) return;
        if(client.settings.blacklist.includes(word.toLowerCase())) {
            message.delete();
            message.author.send({ embeds: [mbed] });
        }            
    });

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.settings.prefix)})\\s*`); // from rom, Allowing either an mention or the prefix to respond to.
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
};
