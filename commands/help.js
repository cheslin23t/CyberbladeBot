const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription("Shows you where to find commands")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    await interaction.reply("This is a list of commands: ");
    await interaction.channel.send("https://imgur.com/RvDSIVg")
    await interaction.channel.send("Or you can use the command `/commands` to get a more neatly formatted list of commands.")
    
}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
