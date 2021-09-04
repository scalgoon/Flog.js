const db = require('quick.db');

const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    try {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!args[0]) return message.reply("Please specify a user to warn")

        if (user.permissions.has('MANAGE_MESSAGES')) return message.reply("You cannot warn users with the same perms");

        let reason = args.splice(1).join(' ');
        if (!reason) reason = "No reason specified"

        let amount = 1

        db.add(`cases_${message.guild.id}`, amount);

        let cases = db.fetch(`cases_${message.guild.id}`)

        let data = {
            staff: `\n**Case ${cases}**\nModerator: <@${message.author.id}>\nType: Warn\nReason: ${reason}`,
        }

        db.push(`logsdb_${message.guild.id}_${user.id}`, data)

        let embed = new MessageEmbed()
            .setTitle(`Case Number ${cases}`)
            .setDescription(`${user} has been warned`)
            .setColor("GREEN")

        message.channel.send({ embeds: [embed] })


    } catch (e) {

        let reembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Command Error")
            .addField("Command", "warn")
            .addField("Guild", `${message.guild.name} (${message.guildId})`)
            .addField("Error:", `> ${e}`)
            .setTimestamp()

        await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

        message.reply("An error has occured and has been reported to my creator!");
    }

}

module.exports.config = {
    name: "warn",
    aliases: ["w"],
    category: "Moderation",
    usage: "*warn 'user'\nOption 2: *warn 'user' 'reason'",
    description: "Warns a specified user"
}