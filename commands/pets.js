const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const fetch = require('node-fetch');
const data = new SlashCommandBuilder()
    .setName('dog')
    .setDescription("Shows a picture of a dog!")
    
    // .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    fetch("https://dog.ceo/api/breeds/image/random").then(res => res.json()).then(json => {
        interaction.reply(json.message);
    });

}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 3;