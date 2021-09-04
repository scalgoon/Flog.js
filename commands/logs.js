const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    try {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

        if (!args[0]) return message.channel.send(embed3);

        if (!args[1]) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

            let database = db.fetch(`logsdb_${message.guild.id}_${user.id}`)

            let nolog = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription("There is no logs for this user")


            if (database === null) return message.channel.send({ embeds: [nolog] });


            if (database) {
                let array1 = []
                database.forEach(m => {
                    array1.push(m.staff)
                })

                let embed = new MessageEmbed()
                    .setTitle(`<a:edit:762444537573801994> Fetching logs for user...`)

                message.channel.send({ embeds: [embed] })
                    .then(message => {
                        let embed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`${user.user.username}'s Logs`)
                            .setDescription(`${array1}`)
                            .setTimestamp()
                        message.edit({ embeds: [embed] })
                    })




            }
        }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (args[1] === "clear") {

            db.delete(`logsdb_${message.guild.id}_${user.id}`)



            message.channel.send(`The logs for **${user.user.username}** are now deleted`);

        }

    } catch (e) {

        let reembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Command Error")
            .addField("Command", "logs")
            .addField("Guild", `${message.guild.name} (${message.guildId})`)
            .addField("Error:", `> ${e}`)
            .setTimestamp()

        await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

        message.reply("An error has occured and has been reported to my creator!");
    }

}

module.exports.config = {
    name: "logs",
    aliases: ["l"],
    category: "Moderation",
    usage: "*logs @user\n*logs @user clear",
    description: "Shows the users server logs"
}