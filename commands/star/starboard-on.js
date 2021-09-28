const { MessageEmbed } = require('discord.js');

const db = require('quick.db');


module.exports.run = async (client, message, args) => {

    let noperm = new MessageEmbed()
        .setDescription("<:cross:782029257739599873> You do not have permission to use this command!")
        .setColor("RED")

    let nouser = new MessageEmbed()
        .setDescription("<:argerr:782032926547378176> Please specify a channel")
        .setColor("ORANGE")


    try {

        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ embeds: [noperm] });


        let ch = db.fetch(`starboardop_${message.guild.id}`);

            if (ch === null) {

                let channel = message.mentions.channels.first()

                if(!channel) return message.reply({ embeds: [nouser] });

                db.set(`starboardop_${message.guild.id}`, channel.id);

                let embed = new MessageEmbed()
                    .setDescription(`<:check:782029189963710464> The starboard channel is now ${channel}`)
                    .addField("Warning", "Please make sure the channel you set is a new channel!")
                    .setColor("GREEN")

                message.channel.send({ embeds: [embed] });
            } else {
                let ch = db.fetch(`starboardop_${message.guild.id}`); 

                message.reply(` Starboard is already on!\nChannel: <#${ch}>`);
            }

        

	} catch (e) {

        let reembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Command Error")
            .addField("Command", "starboard-on")
            .addField("Guild", `${message.guild.name} (${message.guildId})`)
            .addField("Error:", `> ${e}`)
            .setTimestamp()

        await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

        message.reply("An error has occured and has been reported to my creator!");
    }

}

module.exports.config = {
    name: "starboard-on",
    aliases: ["sb-on"],
    usage: "*starboard-on <starboard channel>",
    description: "Turns the starboard feature on"
}
