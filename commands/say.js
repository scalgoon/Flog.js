const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {

    if (!args[0]) return message.channel.send("Please specify a message for me to say")

    if (message.content.includes("@everyone") || message.content.includes("<@")) return message.channel.send("The message cannot contain a ping");

    if (message.content.includes("@here") || message.content.includes("<@")) return message.channel.send("The message cannot contain a ping");

    message.channel.bulkDelete(parseInt(1))
    message.channel.send(args.join(" "))

    

   }

   module.exports.config = {
    name: "say",
    aliases: ["talk"],
    category: "Misc",
    usage: "*say 'message'",
    description: "Sends a requested message"
}