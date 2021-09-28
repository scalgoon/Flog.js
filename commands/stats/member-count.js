const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports.run = async(client, message, args) =>  {

    let noperm = new MessageEmbed()
        .setDescription("<:cross:782029257739599873> You do not have permission to use this command!")
        .setColor("RED")

    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ embeds: [noperm] });

    try{

    if(args[0] === "on") {
        let isMade = db.fetch(`smstats_${message.guild.id}`)

        if(isMade === null) {

            let donetik = await message.guild.channels.create(`Total Members: ${message.guild.memberCount}`, {
                type: 'GUILD_VOICE',
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['CONNECT'],
                    }
                ]
            })

            db.set(`smstats_${message.guild.id}`, donetik.id)

            let sucembed = new MessageEmbed()
                    .setDescription(`<:check:782029189963710464> Member count is now on`)
                    .setColor("GREEN")

                message.channel.send({ embeds: [sucembed] });

        }else{
            message.reply("Member count is already on!")
        }
    }

    if(args[0] === "off") {
        let memupd = db.fetch(`smstats_${message.guild.id}`)

        client.channels.cache.get(memupd).delete()

        db.set(`smstats_${message.guild.id}`, null)

        let embed = new MessageEmbed()
            .setDescription(`<:check:782029189963710464> Member count is now off`)
            .setColor("GREEN")

        message.channel.send({ embeds: [embed] });
    }

} catch (e) {

    let reembed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Command Error")
        .addField("Command", "member-count")
        .addField("Guild", `${message.guild.name} (${message.guildId})`)
        .addField("Error:", `> ${e}`)
        .setTimestamp()

    await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

    message.reply("An error has occured and has been reported to my creator!");
}

   };

   module.exports.config = {
    name: "member-count",
    aliases: ["mc"],
    usage: "*member-count <on | off>",
    description: "Displays the servers member count in a channel"
};
