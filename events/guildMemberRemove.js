const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports = async (client, member) => {

let memupd = db.fetch(`smstats_${member.guild.id}`)

    if (memupd) {
        const channelz = member.guild.channels.cache.get(memupd)

        channelz.setName(`Total Members: ${member.guild.memberCount}`)
    }

    let chx = db.get(`welchannel_${member.guild.id}`);

    if (chx) {
        let embed = new MessageEmbed()
        .setTitle("Goodbye old member")
        .setDescription(`Come back soon **${member.user.username}**`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor('27cc9a')

    client.channels.cache.get(chx).send({ embeds: [embed] })
    }

    let chxz = db.get(`botlgs_${member.guild.id}`);
  
    if (chxz) {
        let removelog = new MessageEmbed()
        .setAuthor(`${member.guild.name}`, member.guild.iconURL())
        .setDescription(`Member left`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField("User", `Name: ${member.user.tag} \nID: ${member.user.id}`)
        .addField(`Total Users`, `${member.guild.memberCount}`)
        .setColor("RED")
        .setTimestamp()
    
    client.channels.cache.get(chxz).send({ embeds: [removelog] });
    } 

};
