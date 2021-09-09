const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports = async (client, message) => {

    let chx = db.get(`welchannel_${message.guild.id}`);

    if (chx === null) {
        return;
    }


    let wembed = new MessageEmbed()
        .setTitle("A New Member Arrived")
        .setDescription(`Hi <@${message.user.id}>! welcome to **${message.guild.name}**!`)
        .setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
        .setColor('27cc9a')

    client.channels.cache.get(chx).send({ embeds: [wembed] });
};