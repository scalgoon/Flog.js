const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports = async (client, member) => {

    let chx = db.get(`welchannel_${member.guild.id}`);

    if (chx === null) {
        return;
    }

    
    let embed = new MessageEmbed()
        .setTitle("A New Member Arrived")
        .setDescription(`Hi <@${member.user.id}>! welcome to **${member.guild.name}**!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor('27cc9a')

    client.channels.cache.get(chx).send({ embeds: [embed] });
};