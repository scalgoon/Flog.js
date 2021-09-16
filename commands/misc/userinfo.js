const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) =>  {
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(user) {
            
            
            const EMOJIS = {
                earlysupportemoji: client.emojis.cache.get('886781775592955995'),
                bughunteremoji: client.emojis.cache.get('886782014718619708'),
                verifiedBotDev: client.emojis.cache.get('886781880375070791'),
                VerifiedBot: client.emojis.cache.get('782035058176294932'),
                ServerPartner: client.emojis.cache.get('886781952177356800'),
                hypebrillance: client.emojis.cache.get('886781742659305492'),
                discordemployee: client.emojis.cache.get('886783764825522226'),
                hypebravery: client.emojis.cache.get('886781718462353428'),
                hypesquad: client.emojis.cache.get("886781830307655720"), 
                bughunterlvl2: client.emojis.cache.get("886782029000224870"),
                certifiedModerator: client.emojis.cache.get("886928758945218561"), 
                online: client.emojis.cache.get("887098826287091722"), 
                offline: client.emojis.cache.get("887098919618748464"),
                dnd: client.emojis.cache.get("887098946210652160"), 
                idle: client.emojis.cache.get("887098873875685416")
        }
        const FLAGS = {
                DISCORD_EMPLOYEE: `${EMOJIS.discordemployee} | Discord Employee`,
                PARTNERED_SERVER_OWNER: `${EMOJIS.ServerPartner} | Verified Discord Partner`,
                BUGHUNTER_LEVEL_1: `${EMOJIS.bughunteremoji} | Bug Hunter (Level 1)`,
                HOUSE_BRAVERY: ` ${EMOJIS.hypebravery} | House of Bravery`,
                HOUSE_BRILLIANCE: `${EMOJIS.hypebrillance} | House of Brilliance`,
                HOUSE_BALANCE: `${EMOJIS.hypebalance} | House of Balance`,
                EARLY_SUPPORTER: `${EMOJIS.earlysupportemoji} | Early Supporter`,
                TEAM_USER:'Team User',
                SYSTEM: 'System ',
                BUGHUNTER_LEVEL_2: `${EMOJIS.bughunterlvl2} | Bug Hunter (Level 2)`,
                VERIFIED_BOT: `${EMOJIS.VerifiedBot} | Verified Bot`,
                EARLY_VERIFIED_BOT_DEVELOPER: `${EMOJIS.verifiedBotDev} | Verified Bot Developer`,
                DISCORD_CERTIFIED_MODERATOR: `${EMOJIS.certifiedModerator} | Discord Certified Moderator`, 
                HYPESQUAD_EVENTS: `${EMOJIS.hypesquad} | HypeSquad Events`, 

        }

        let userFlags = user.user.flags.toArray();
        try {

            const embed = new MessageEmbed()
            .setColor(`27cc9a`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`User ID | ${user.user.id}`)
            .setTitle(`${user.user.username}#${user.user.discriminator}'s Stats`)
            .addField("Online status:", `${user.presence.status === "online" ? `${EMOJIS.online} Online` : user.presence.status === "idle" ? `${EMOJIS.idle} Idle` : user.presence.status === "dnd" ? `${EMOJIS.dnd} Do Not Disturb` : user.presence.status === "offline" ? `${EMOJIS.offline} Offline` :  "Couldn't find status"}`)
            .addField("Game:", `${user.presence.activities[0] ? user.presence.activities[0].name : 'No game is being played'}`)
            .addField("Creation Date:", `${user.user.createdAt}`)
            .addField("Joined Date:", `${user.joinedAt}`)
            .addField(`User's Roles  [${user.roles.cache.size}]:`, `${ user.roles.cache.map(role => role.toString()).join(" ,")}`)
            .addField(`Badges: `, userFlags.length ? userFlags.map(flag => FLAGS[flag]).join('\n') : 'None')
        message.channel.send({ embeds: [embed] });

        } catch (e) {

            let reembed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Command Error")
                .addField("Command", "Userinfo")
                .addField("Guild", `${message.guild.name} (${message.guildId})`)
                .addField("Error:", `> ${e}`)
                .setTimestamp()

            await client.users.cache.get("734784924619505774").send({ embeds: [reembed] });

            message.reply("An error has occured and has been reported to my creator!");
        }

    }

   }

   module.exports.config = {
    name: "userinfo",
    aliases: ["ui"],
    
    usage: "*userinfo \nOption 2: *userinfo @user",
    description: "Shows the information of the author or another user"
}