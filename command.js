const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('cmd')
    .setDescription("Command")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;


}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 0 //remove this line if level 0