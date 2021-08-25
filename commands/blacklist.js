const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command!');

    // let blWord = args[1] // Bet: This made conrad.

    if(!args[0]) return message.channel.send("Please specify a option");

    if(!args[1]) return message.channel.send("Please specify a word to add/remove from the list");

    if(message.content.includes("<@")) return message.channel.send("The word cannot contain a ping");

    if(args[0] === "add") {
        client.settings.blacklist.push(args[1]);
        client.settings.save();

    let embed1 = new MessageEmbed()
        .setDescription(`<:check:782029189963710464> Successfully added **${args[1]}** to the blacklist`)
        .setColor("GREEN")

    await message.channel.send({ embeds: [embed1] });

    } else if(args[0] === "remove") {
        client.settings.blacklist.remove(args[1]);
        client.settings.save();

        let embed2 = new MessageEmbed()
            .setDescription(`<:check:782029189963710464> Successfully removed **${args[1]}** from the blacklist`)
            .setColor("GREEN")

        await message.channel.send({ embeds: [embed2] });
    } else
        await message.channel.send("Please specify a option");

}

module.exports.config = {
    name: "blacklist",
    aliases: ["bl"],
    category: "Moderation",
    usage: "*bl <add || remove> <WordToBlacklist>",
    description: "Lets the mod's add or removed words from the blacklist"
}