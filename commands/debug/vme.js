const { MessageEmbed } = require('discord.js')
const { exec } = require('child_process')
module.exports.run = async ( client, message, args) => {
if(message.author.id === "403668506287144981")
    {try {
        exec(args.join(" "), (e, out, err) => {
            let embed = new MessageEmbed()
            .setDescription(`\`\`\`${out}\\n${err}\`\`\``)
            message.channel.send({embeds: [embed]})
        });
    } catch (e) {
        message.reply("Message too long.");
    }
} else {
    message.channel.send('conrad only bitchass')
}
}

module.exports.config = {
    name: "vme", 
    aliases: ['vm'], 
    
}