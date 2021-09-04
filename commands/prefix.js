const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    try {

        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        if (!args[0]) return message.channel.send("Please provide a new prefix for me to set")

        changes = args[0]

        if (changes.length > 3) return message.channel.send("The new prefix must be under 3 characters!");


        db.set(`prefix1_${message.guild.id}`, changes)


        message.channel.send(`My prefix is now **${args[0]}**`);

    } catch (e) {

        let reembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Command Error")
            .addField("Command", "prefix")
            .addField("Guild", `${message.guild.name} (${message.guildId})`)
            .addField("Error:", `> ${e}`)
            .setTimestamp()

        await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

        message.reply("An error has occured and has been reported to my creator!");
    }


}

module.exports.config = {
    name: "prefix",
    aliases: ["pr"],
    category: "Setup",
    usage: "*prefix 'new prefix'",
    description: "Changes the bot's prefix for the guild"
}