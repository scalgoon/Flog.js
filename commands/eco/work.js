const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    //add some creative messages if you wish. otherwise its undefined!
    //make sure to end it with something along the lines of "and earned" or "and made".
    let workMessages = [
        ""
    ]
    let response = workMessages[Math.floor(Math.random() * workMessages.length)]
    let amount = Math.floor(Math.random() * 537) + 1;
    db.add(`eco_${message.guild.id}_${message.member.id}`, amount)

    //keep in mind this part is completely customizable! Add a embed if you want.
    
    //Another cool idea: let the money emoji be customizable! let it be set via command.

    //Better idea: let the entire message use flags and be customizable.
    message.channel.send(`${response} ${amount} :coin:!`)
}

module.exports.config = {
    name: "work", 
    aliases: [], 
    description: "work to earn money", 
    usage: "*work"
}
