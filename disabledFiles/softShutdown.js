const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const shell = require('shelljs')

const data = new SlashCommandBuilder()
    .setName('softshutdown')
    .setDescription("Shuts down the bot in a way where you can start it back up without going to the console!")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    await interaction.reply("Shutting down...")
    shell.exec(__dirname + "\\..\\toOffline.bat");

}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 5 //remove this line if level 0