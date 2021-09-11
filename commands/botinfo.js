const db = require('quick.db');

const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    try {

        let prefixes = db.get(`prefix1_${message.guild.id}`)

        if (prefixes === null) {
            prefix = "*"
        } else {
            prefix = prefixes
        }

        let info = new MessageEmbed()
            .setAuthor(`Information about Terminal`, client.user.displayAvatarURL())
            .setDescription("[Top.gg](https://top.gg/bot/745358062025703445) - [Listcord.gg](https://listcord.gg/bot/745358062025703445)")
            .setColor('27cc9a')
            .addField("Info", `Name: ${client.user.tag}\nID: ${client.user.id}`)
            .addField("Version", "v3.0.0")
            .addField("Server Prefix", `${prefix}`)
            .addField("Guilds", `${client.guilds.cache.size}`)
            .addField("Support Server", "[Click here](https://discord.gg/TjYsAr4xA3)")

            message.channel.send({ embeds: [info] });

    } catch (e) {

        let reembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Command Error")
            .addField("Command", "botinfo")
            .addField("Guild", `${message.guild.name} (${message.guildId})`)
            .addField("Error:", `> ${e}`)
            .setTimestamp()

        await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

        message.reply("An error has occured and has been reported to my creator!");
    }

}


module.exports.config = {
    name: "botinfo",
    aliases: ["bi"],
    category: "Misc",
    usage: "*botinfo",
    description: "Sends the bots information"
}