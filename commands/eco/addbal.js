const db = require('quick.db')


module.exports.run = async(client, message, args) => {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
    if(isNaN(args[0])) return;
    db.add(`eco_${message.guild.id}_${message.member.id}`, args[0]);
    message.channel.send(`added ${args[0]} to your balance!`)
}

module.exports.config = {
    name: "addbalance", 
    aliases: ["addbal"],
    description: "add money to balance", 
    usage: "*addbalance <amount>"
}