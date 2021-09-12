const db = require('quick.db');

const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('You do not have permission to use this command!');

	try {

		if (args[0] === "on") {

            let ch = db.fetch(`antispam_${message.guild.id}`);

            if (ch === null) {
                db.set(`antispam_${message.guild.id}`, message.guild.id);

                let embed = new MessageEmbed()
                    .setDescription(`<:check:782029189963710464> Antispam is now turned on`)
                    .setColor("GREEN")

                message.channel.send({ embeds: [embed] });
            } else {
                message.reply("Antispam is already on");
            }
        };

        if (args[0] === "off") {
            db.set(`antispam_${message.guild.id}`, null)

            let embed = new MessageEmbed()
                .setDescription(`<:check:782029189963710464> Automod is now turned off`)
                .setColor("GREEN")

            message.channel.send({ embeds: [embed] });
        }

	} catch (e) {

		let reembed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Command Error")
			.addField("Command", "antispam")
			.addField("Guild", `${message.guild.name} (${message.guildId})`)
			.addField("Error:", `> ${e}`)
			.setTimestamp()

		await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

		message.reply("An error has occured and has been reported to my creator!");
	}

}


module.exports.config = {
	name: "antispam",
	aliases: ["as"],
	
	usage: "*antispam 'on or off'",
	description: "Turns antispam on or off"
}