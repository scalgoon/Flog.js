const { MessageEmbed } = require('discord.js');

const db = require("quick.db");

module.exports.run = async(client, message, args) =>  {

    let role = db.get(`verify_${message.guild.id}`);

    if (role === null) {
        return message.reply("Please set a verification role")
    };

    let verified = new MessageEmbed()
    .setDescription(`You have been verified in **${message.guild.name}**`)
    .setColor("GREEN")

    message.channel.bulkDelete(parseInt(1))
    message.member.roles.add(role)
    message.author.send(verified)
    

   }

   module.exports.config = {
    name: "verify",
    aliases: ["v"],
    
    usage: "*verify",
    description: "Gives the user a verification role"
}