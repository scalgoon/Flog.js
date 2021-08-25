const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {

    let embed = new MessageEmbed()
            .setColor('27cc9a')
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .addField('Server ID', message.guild.id)
            .addField('Server owner', `${(message.guild.fetchOwner().id)}`)
            .addField("Total members", `Users: ${message.guild.memberCount} \nHumans: ${message.guild.members.cache.filter(member => !member.user.bot).size} \nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`)
            .addField('Total channels', `Text: ${message.guild.channels.cache.filter(channel => channel.type === 'text').size} \nVoice: ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`)
            .addField('Roles', `${message.guild.roles.cache.size}`)
            .addField('Created at', `${message.guild.createdAt}`);

        message.channel.send({ embeds: [embed] })
    

   }

   module.exports.config = {
    name: "serverinfo",
    aliases: ["si"],
    category: "Misc",
    usage: "*ping",
    description: "Sends the current server's information"
}