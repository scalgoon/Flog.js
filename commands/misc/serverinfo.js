const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {

    try {

		let embed = new MessageEmbed()
            .setColor('27cc9a')
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .addField('Server ID', message.guild.id)
            .addField('Server owner', `<@${(message.guild.ownerId)}> (${message.guild.ownerId})`)
            .addField("Total members", `Users: ${message.guild.memberCount} \nHumans: ${message.guild.members.cache.filter(member => !member.user.bot).size} \nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`)
            .addField('Total channels', `Text: ${message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size} \nVoice: ${message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size}`)
            .addField('Roles', `${message.guild.roles.cache.size}`)
            .addField('Created at', `${message.guild.createdAt}`);

        message.channel.send({ embeds: [embed] })

	} catch (e) {

		let reembed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Command Error")
			.addField("Command", "serverinfo")
			.addField("Guild", `${message.guild.name} (${message.guildId})`)
			.addField("Error:", `> ${e}`)
			.setTimestamp()

		await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

		message.reply("An error has occured and has been reported to my creator!");
	}

   }

   module.exports.config = {
    name: "serverinfo",
    aliases: ["si"],
    
    usage: "*ping",
    description: "Sends the current server's information"
}