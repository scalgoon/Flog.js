const Guild  = require("../models/guild");

module.exports = (client) => {
    /**
     * Get the guild database from the given id.
     * @param {Snowflake} gID - Guild id from where to get the document to.
     * @returns {Promise<*|Document<any, {}>>} - The returned document.
     */
    client.getGuildDB = async function (gID) {
        let guildDB = await Guild.findOne( { guildID: gID } );

        if(guildDB)
            return guildDB;
        else {
            guildDB = new Guild({
                guildID: gID,
                guildName: (await client.guilds.fetch(gID)).name
            });
            await guildDB.save().catch(err => console.log(err));
            return guildDB;
        }
    };

}
