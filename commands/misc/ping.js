const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {


        let ping = new MessageEmbed()
    .setTitle(`Calculating ping...`)

    const startTime = Date.now();
    message.channel.send({ embeds: [ping] })
    .then(msg => {
        const endTime = Date.now();
        var pong = endTime-startTime;

            let ping = new MessageEmbed()
            .setTitle(`:ping_pong: Pong!`)
            .setColor('27cc9a')
            .setDescription(`Latency: ${pong} ms \nApi Latency: ${Math.round(client.ws.ping)} ms` )

            msg.edit({ embeds: [ping] });
        }); 

   };

   module.exports.config = {
    name: "ping",
    aliases: ["p"],
    
    usage: "*ping",
    description: "Sends the bot's ping and latency"
};