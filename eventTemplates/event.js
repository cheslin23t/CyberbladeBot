const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        if (!interaction.guildId) return;
        const adminModel = require("../models/admin");
        const admin = await adminModel.findOne({userID: interaction.user.id})
      
            
    };
}

