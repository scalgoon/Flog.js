const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

const db = require('quick.db');

module.exports.run = async(client, message, args) =>  {

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("You do not have the perms to use this command");

    let chx = db.get(`botlgs_${message.guild.id}`);
  
              if (chx === null) {
                  return message.channel.send("Please set a bot logs channel")
              }

    try {

      let isopen =  db.fetch(`topchannel_${message.guild.id}`);

      if(isopen === null) {
        let wordarray = [
          'Animals',
          'Appearance',
          'Communication',
          'Culture',
          'Food',
          'Health',
          'Homes',
          'Buildings',
          'Leisure',
          'Books',
          'Notions',
          'People',
          'Politics',
          'Society',
          'Science',
          'Technology',
          'Sports',
          'Nature',
          'Time',
          'Space',
          'Travel',
          'Work',
          'Buisness',
          'Farming'
          
      ]
          const thread = await message.channel.threads.create({
              name: `${wordarray[Math.floor(Math.random() * wordarray.length)]}-Topic`,
              autoArchiveDuration: 60,
              reason: 'Topic was asked for',
          });
      
              await thread.join();
  
              let topicembed = new MessageEmbed()
                  .setTitle("Here is your topic")
                  .setTimestamp()
                  .setDescription(`Topic opened by: <@${message.author.id}>`)
                  .setColor('00cba9')
  
                  const row = new MessageActionRow()
              .addComponents(
  
                  new MessageButton()
                      .setCustomId('topdel')
                      .setLabel('Delete')
                      .setStyle('DANGER'),
  
              );
  
              await thread.send({ embeds: [topicembed] });
      
              let tikgone = new MessageEmbed()
                  .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                  .setDescription(`A topic was opened`)
                  .addField("Moderator", `Name: **${message.author.tag}** \nID: ${message.author.id}`)
                  .addField("Channel", `Name: <#${thread.id}> \nID: ${thread.id}`)
                  .addField("Started In", `Name: <#${message.channel.id}> \nID: ${message.channel.id}`)
                  .setColor("GREEN")
                  .setTimestamp()
      
              client.channels.cache.get(chx).send({  embeds: [tikgone], components: [row] });
  
              db.set(`topchannel_${message.guild.id}`, thread.id)
  
              
      }else {
         message.reply("Looks like a topic is already open! Please close that topic before making a new one.")
      }
  
    } catch (e) {
  
      let reembed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Command Error")
        .addField("Command", "topic")
        .addField("Guild", `${message.guild.name} (${message.guildId})`)
        .addField("Error:", `> ${e}`)
        .setTimestamp()
  
      await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });
  
      message.reply("An error has occured and has been reported to my creator!");
    }
   };

   module.exports.config = {
    name: "topic",
    aliases: ["tp"],
    category: "Misc",
    usage: "*ping",
    description: "Sends the bot's ping and latency"
};