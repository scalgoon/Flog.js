const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    let bal;
    if(args[0]){
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    bal = db.get(`eco_${message.guild.id}_${user.id}`)
        if(!bal) {
            db.set(`eco_${message.guild.id}_${user.id}`, 0)
        }
        return message.channel.send(`${user}'s balance is ${bal}`)
    }
    bal = db.get(`eco_${message.guild.id}_${message.member.id}`)
    if(!bal) {
        db.set(`eco_${message.guild.id}_${message.member.id}`, 0)
    }
    return message.channel.send(`Your balance is ${bal}`)
}

module.exports.config = {
    name: "balance", 
    aliases: ['bal'], 
    description: "get balance"
}