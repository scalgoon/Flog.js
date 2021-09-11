const { MessageEmbed } = require('discord.js');

const db = require('quick.db');


module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command!');

    try {

        let user1 = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!args[0]) return message.reply("Please specify a user for this action")

        let role = db.get(`mrole_${message.guild.id}`);

        if (role === null) {
            return message.reply("There is no mute role to remove")
        }
        user1.roles.remove(role);

        let success = new MessageEmbed()
            .setDescription(`<:check:782029189963710464> Successfully unmuted ${user1}`)
            .setColor("GREEN")

        message.channel.send({ embeds: [success] });

        let chx = db.get(`botlgs_${message.guild.id}`);

        if (chx === null) {
            return message.channel.send("Please set a bot logs channel if you want command logs")
        }

        let unm = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setDescription(`${user1} has been unmuted`)
            .addField("Moderator", `Name: <@${message.author.id}> \nID: ${message.author.id}`)
            .addField("User", `Name: ${user1.user.tag} \nID: ${user1.id}`)
            .setColor("BLUE")
            .setTimestamp()

        client.channels.cache.get(chx).send({ embeds: [unm] });

    } catch (e) {

        let reembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Command Error")
            .addField("Command", "unmute")
            .addField("Guild", `${message.guild.name} (${message.guildId})`)
            .addField("Error:", `> ${e}`)
            .setTimestamp()

        await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

        message.reply("An error has occured and has been reported to my creator!");
    }

}


module.exports.config = {
    name: "unmute",
    aliases: ["unm"],
    category: "Moderation",
    usage: "*unmute @member",
    description: "Unmutes a specified user"
}