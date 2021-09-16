const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {
    
    //redoing permissions as this can be abused
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return; 
    if (!args[0]) return message.channel.send("Please specify a message for me to say")
    
    if(message.content.has(message.mentions)) return message.channel.send("The message cannot contain a ping!"); 
    // message.channel.bulkDelete(parseInt(1))
    //^^ this is dumb, message has a delete method lmfao 
    message.delete();
    message.channel.send(args.join(" "))

    

   }

   module.exports.config = {
    name: "say",
    aliases: ["talk"],
    
    usage: "*say 'message'",
    description: "Sends a requested message"
}
