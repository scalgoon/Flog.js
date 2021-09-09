const { MessageEmbed } = require('discord.js');

const db = require('quick.db');

module.exports = async (client, message) => {

    let chx = db.get(`botlgs_${message.guild.id}`);

    if (chx === null) {
        return;
    }

try{
    let delet = new MessageEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
    .setDescription(`Message deleted in <#${message.channel.id}>`)
    .addField("Author", `Name: <@${message.author.id}> \nID: ${message.author.id}`)
    .addField("Channel", `Name: ${message.channel.name} \nID: ${message.channel.id}`)
    .addField(`Content:`, `\`\`\`\n${message.content}\n\`\`\``)
    .setColor("PURPLE")
    .setTimestamp()

client.channels.cache.get(chx).send({ embeds: [delet] });
}catch(e){
    return;
}
};