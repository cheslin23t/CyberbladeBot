const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('kick')
    .setDefaultMemberPermissions(BigInt(PermissionFlagsBits.ViewChannel))
    .setDescription("Kicks a user from the server.")
    
    .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to kick."))
    .addStringOption(option =>
		option.setName('reason')
			.setDescription('What to tell the user about the kick.')
			.setRequired(false))

            
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    await interaction.deferReply({ ephemeral: true });
    const user = interaction.options.getUser('target')
    
        const member1 = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
        const guild = await client.guilds.fetch(member1.guild.id)
        const member = await guild.members.fetch(user.id)
    console.dir(interaction.member)
    if (!member) return;
    if(!member.kickable) return interaction.editReply('This member is not kickable.', { ephemeral: true })

    if(!interaction.member.permissions.has(BigInt(PermissionFlagsBits.KickMembers))) {
   return interaction.editReply('You do not have permission to kick this member.', { ephemeral: true })
} else {
    interaction.editReply('Kicking user...')
    try {member.user.send("You have been kicked from the server `" + interaction.member.guild.name + "` Because of the reason: `" + (interaction.options.getString('reason') || 'No reason given.') + "`")} 
    catch (e) {
        console.log(e)
        interaction.editReply('Failed to send a message to the user... Continuing to kick the user.', { ephemeral: true })
    }
  await member.kick("Kicked by " + interaction.member.user.tag + " for: " + (interaction.options.getString('reason') || 'No reason given.'))
    return interaction.followUp({content: 'The user has been kicked.', ephemeral: true })
}


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 0;