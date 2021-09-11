module.exports = async (client, guild) => {


    if (guild.systemChannel) {
        guild.systemChannel.send("Hello I'm Terminal!\nTo see my commands do *help").catch(e => console.log("failed to send message due to error: ", e))
    }

    console.log(`Server joined: ${guild.name}`);
};
