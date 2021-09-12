const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = async (client, message) => {
    if(!message.guild ||
        message.author.bot) return;
    let prefix; 
    let prefixes = db.get(`prefix1_${message.guild.id}`)

    if (prefixes === null) {
        prefix = "*"
    } else {
        prefix = prefixes
    }
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); // from rom, Allowing either an mention or the prefix to respond to.
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command){
        command.run(client, message, args);
    }

};
