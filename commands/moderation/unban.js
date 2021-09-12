const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply("You do not have permission to use this command!");

	try {

        let user =  args[0]
        if (!args[0]) return message.reply("Please specify a user to unban")

		try{
			message.guild.members.unban(user);
		} catch (e) {
			return;
		}

		let success = new MessageEmbed()
            .setDescription(`<:check:782029189963710464> Successfully unbanned <@${user}>`)
            .setColor("GREEN")

        message.channel.send({ embeds: [success] });

		let chx = db.get(`botlgs_${message.guild.id}`);

        if (chx === null) {
            return message.channel.send("Please set a bot logs channel if you want command logs")
        }

        let unm = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setDescription(`<@${user}> has been unbanned`)
            .addField("Moderator", `Name: <@${message.author.id}> \nID: ${message.author.id}`)
            .addField("User", `Name: <@${user}> \nID: ${user}`)
            .setColor("GREEN")
            .setTimestamp()

        client.channels.cache.get(chx).send({ embeds: [unm] });

	} catch (e) {

		let reembed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Command Error")
			.addField("Command", "unban")
			.addField("Guild", `${message.guild.name} (${message.guildId})`)
			.addField("Error:", `> ${e}`)
			.setTimestamp()

		await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

		message.reply("An error has occured and has been reported to my creator!");
	}

}


module.exports.config = {
	name: "unban",
	aliases: ["ub"],
	
	usage: "*unban 'user id'",
	description: "Unbans a user"
}