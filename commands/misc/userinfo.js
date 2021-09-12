const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "<:online:751564607843205131> Online";
                break;
            case "dnd":
                status = "<:Dnd:751565131812569158> Dnd";
                break;
            case "idle":
                status = "<:idle:751566207873843270> Idle";
                break;
            case "offline":
                status = "<:offline:751566764848185354> Offline";
                break;
        }

        try {

            const embed = new MessageEmbed()
            .setColor(`27cc9a`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`User ID | ${user.user.id}`)
            .setTitle(`${user.user.username}#${user.user.discriminator}'s Stats`)
            .addField("Online status:", `${status}`)
            .addField("Game:", `${user.presence.activities[0] ? user.presence.activities[0].name : 'No game is being played'}`)
            .addField("Creation Date:", `${user.user.createdAt}`)
            .addField("Joined Date:", `${user.joinedAt}`)
            .addField(`User's Roles  [${user.roles.cache.size}]:`, `${ user.roles.cache.map(role => role.toString()).join(" ,")}`)

        message.channel.send({ embeds: [embed] });
    
        } catch (e) {
    
            let reembed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Command Error")
                .addField("Command", "8ball")
                .addField("Guild", `${message.guild.name} (${message.guildId})`)
                .addField("Error:", `> ${e}`)
                .setTimestamp()
    
            await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });
    
            message.reply("An error has occured and has been reported to my creator!");
        }
    

   }

   module.exports.config = {
    name: "userinfo",
    aliases: ["ui"],
    
    usage: "*userinfo \nOption 2: *userinfo @user",
    description: "Shows the information of the author or another user"
}