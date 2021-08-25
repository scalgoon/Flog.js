const { MessageEmbed } = require('discord.js');


module.exports.run = async(client, message, args) =>  {

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("You do not have the perms to use this command");

        if(!args[0]) return message.channel.send("Please provide a title and a description for this action")

        let userembed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(args.shift())
        .setDescription(args.join(" "))
        .setColor('27cc9a')
        .setTimestamp()


        message.channel.bulkDelete(parseInt(1))
        message.channel.send({ embeds: [userembed] });
    
       }


    module.exports.config = {
        name: "embed",
        aliases: ["e"],
        category: "Moderation",
        usage: "*embed 'title' 'description'",
        description: "Sends a custom embed"
    }