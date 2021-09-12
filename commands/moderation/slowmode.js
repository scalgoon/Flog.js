const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return;

        let time = message.content.split(' ').slice(1).join(' ')

        let curr = new MessageEmbed()
            .setDescription(`The current slowmode is ${message.channel.rateLimitPerUser}s`)
            .setColor('27cc9a')

        let embed = new MessageEmbed()
            .setTitle('Slowmode Set')
            .setDescription(`<:check:782029189963710464> Set the slowmode to ${time}s`)
            .setColor('GREEN')

        let off = new MessageEmbed()
            .setTitle('Slowmode Disabled')
            .setDescription(`<:check:782029189963710464> Disabled the slowmode for this channel`)
            .setColor('GREEN')

        if (!args[0]) return message.channel.send({ embeds: [curr] })


        if (isNaN(parseInt(args[0]))) return message.channel.send("Please specify a number for me to set the slowmode to")

        if (message.content.endsWith('m')) return message.channel.send("Please specify a number for me to set the slowmode to")

        if (message.content.endsWith('h')) return message.channel.send("Please specify a number for me to set the slowmode to")

        if (message.content.endsWith('s')) return message.channel.send("Please specify a number for me to set the slowmode to")

        if (message.content.endsWith('d')) return message.channel.send("Please specify a number for me to set the slowmode to")

        if (args[0] === '0') return message.channel.setRateLimitPerUser(0).then(
            message.channel.send({ embeds: [off] })
        );



        if (parseInt(args[0]) > 21600) return message.channel.send("The max slowmode is 6 hours (21600)!");
        message.channel.send({ embeds: [embed] })
        message.channel.setRateLimitPerUser(time)
    

   }

   module.exports.config = {
    name: "slowmode",
    aliases: ["sl", "slow"],
    
    usage: "*slowmode 'number'",
    description: "Changes the channel's slowmode"
}