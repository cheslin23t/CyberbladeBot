const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        if (!interaction.guildId) return;
        const adminModel = require("../models/admin");
        const admin = await adminModel.findOne({userID: interaction.user.id});
        const cmd = client.commands.get(interaction.commandName || null);
      if (!admin && cmd.level && cmd.level !== -1) {
            
                return interaction.reply({ephemeral: true, content: "You do not have permission to use this command."});
           
        }
      if (!admin && !cmd.level) {
            
                return cmd.execute(client, interaction);
           
        }
        if (admin && !cmd.level && admin.level !== -1) {
            
            return cmd.execute(client, interaction);
       
    }
        
        
        if(admin && admin.level == -1){
            if(cmd.level == -1){
                
            return cmd.execute(client, interaction);
            }
            return interaction.reply({ephemeral: true, content: "You are blacklisted from this bot."});
        }
        else if(admin.level >= cmd.level) {
            cmd.execute(client, interaction);
        } else {
            interaction.reply("You do not have permission to use this command.");
        }
        };
            
    };

