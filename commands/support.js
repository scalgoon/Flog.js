const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => { 
    
    let Embed = new MessageEmbed() 
    .setDescription("[Click here](https://discord.gg/TjYsAr4xA3) to join my support server!") 
    .setColor('27cc9a') 
    
    message.channel.send({ embeds: [Embed] });
} 

module.exports.config = { 
name: "support", 
aliases: ["sup"], 
category: "Misc", 
usage: "*support", 
description: "Sends the bots support server link" 
}