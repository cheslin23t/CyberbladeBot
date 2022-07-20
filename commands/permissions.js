const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('permissions')
    .setDescription("Shows the permissions for a user")
    
    .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to check."))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    
    const user = interaction.options.getUser('target');
    const member1 = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
        const guild = await client.guilds.fetch(member1.guild.id)
        const member = await guild.members.fetch(user.id)
    const memberPermissions = member.permissions.toArray()
    interaction.reply(memberPermissions.join(', '));

}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
