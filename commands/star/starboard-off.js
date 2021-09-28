const { MessageEmbed } = require('discord.js');

const db = require('quick.db');


module.exports.run = async (client, message, args) => {

    let noperm = new MessageEmbed()
        .setDescription("<:cross:782029257739599873> You do not have permission to use this command!")
        .setColor("RED")

    try {

        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ embeds: [noperm] });


        let ch = db.fetch(`starboardop_${message.guild.id}`);

                db.set(`starboardop_${message.guild.id}`, null);

                let embed = new MessageEmbed()
                    .setDescription(`<:check:782029189963710464> The starboard feature is now off`)
                    .setColor("GREEN")

                message.channel.send({ embeds: [embed] });


        

	} catch (e) {

        let reembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Command Error")
            .addField("Command", "starboard-off")
            .addField("Guild", `${message.guild.name} (${message.guildId})`)
            .addField("Error:", `> ${e}`)
            .setTimestamp()

        await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

        message.reply("An error has occured and has been reported to my creator!");
    }

}

module.exports.config = {
    name: "starboard-off",
    aliases: ["sb-off"],
    usage: "*starboard-off",
    description: "Turns the starboard feature off"
}