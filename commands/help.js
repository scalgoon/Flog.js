const { MessageEmbed } = require('discord.js');


module.exports.run = async(client, message, args) =>  {

    let embed = new MessageEmbed()
        .setTitle("Help Embed")
        .addField("Command Info", "To get more information on a command do *help <command>")
        .addField("Moderation", "Slowmode, Embed, Lock, Tickets")
        .addField("Misc", "Ping, Say, Serverinfo")
        .addField("Server", "Prefix")
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor('27cc9a')

    let command = args[0]

       if(!args[0]) return message.channel.send({ embeds: [embed] });

       
        if(client.commands.has(command)) {
            command = client.commands.get(command);
        } else {
            message.channel.send("That doesn\'t seem to be a command I have");
        }
       
         

        if(args[0] === "eval") return  message.channel.send("That doesn\'t seem to be a command I have");
        if(args[0] === "reload") return  message.channel.send("That doesn\'t seem to be a command I have");
       
        if(args[0]) {
            try {
                let embed1 = new MessageEmbed()
                .setTitle(`Info for **${command.config.name}**`)
                .addField(`Aliases`, `${command.config.aliases}`)
                .addField(`Catagory`, `${command.config.category}`)
                .addField(`Description`, `${command.config.description}`)
                .addField(`Usage`, `${command.config.usage}`)
                .setColor("27cc9a")
        
                message.channel.send({ embeds: [embed1] });
                }catch(e){
                    console.log(e);
                }
        }

        
       }


    module.exports.config = {
        name: "help",
        aliases: ["h"],
        category: "Misc",
        usage: "*help\n*help <command name>",
        description: "Sends the bot's command information"
    }
