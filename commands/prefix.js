const { MessageEmbed } = require('discord.js');

const mongoose = require('mongoose');

const Guild = require('../models/guild');

const config = require('../config.json');

module.exports.run = async(client, message, args) =>  {

    if (!message.member.permissions.has('MANAGE_GUILD')) {
        return message.channel.send('You do not have permission to use this command!');
    };

    const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: config.prefix
            })

            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
        }
    });

    if (args.length < 1) {
        return message.channel.send('Please specify a prefix for me to set');
    };

    await settings.updateOne({
        prefix: args[0]
    });

    let embed = new MessageEmbed()
        .setTitle('Prefix Set')
        .setDescription(`<:check:782029189963710464> The prefix for this server is now **${args[0]}**`)
        .setColor('GREEN')

    message.channel.send({ embeds: [embed] });
}

   module.exports.config = {
    name: "prefix",
    aliases: ["setprefix"],
    category: "Setup",
    usage: "*prefix 'new prefix'",
    description: "Changes the bot's prefix for the guild"
}