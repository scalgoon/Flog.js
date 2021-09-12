const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("You do not have the perms to use this command");

        if (!args[0]) return message.channel.send("Please specify on or off");

        if (args[0] === "on") {
            let onlock = new MessageEmbed()
                .setDescription(`<:check:782029189963710464> Successfully locked <#${message.channel.id}>`)
                .setColor("GREEN")

            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: false

            })
            return message.channel.send({ embeds: [onlock] });
        };

        if (args[0] === "off") {
            let unlock = new MessageEmbed()
                .setDescription(`<:check:782029189963710464> Successfully unlocked <#${message.channel.id}>`)
                .setColor("GREEN")

            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: true

            })
            return message.channel.send({ embeds: [unlock] });
        }
}

module.exports.config = {
    name: "lock",
    aliases: ["l"],
    
    usage: "*lock on or off",
    description: "Locks the channel the author is in"
}
