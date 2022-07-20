const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('ban')
    .setDefaultMemberPermissions(BigInt(PermissionFlagsBits.ViewChannel))
    .setDescription("Bans a user from the server.")
    .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to ban."))
    .addStringOption(option =>
		option.setName('reason')
			.setDescription('What to tell the user about the ban.')
			.setRequired(false))
    // .addStringOption(option =>
    //             option.setName('delete')
    //                 .setDescription('Within how many days should the bot delete the user\'s messages')
    //                 .setRequired(true)
    //                 .addChoices(
    //                     { name: '1 Week (7 Days)', value: '7' },
    //                     { name: '6 Days', value: '6' },
    //                     { name: '5 Days', value: '5' },
    //                     { name: '4 Days', value: '4' },
    //                     { name: '3 Days', value: '3' },
    //                     { name: '2 Days', value: '2' },
    //                     { name: '1 Days', value: '1' },
    //                     { name: 'Don\'t Delete', value: '0' },
                        
                        
                        
    //                 ))
    
module.exports.execute = async (client, interaction) => {
    if (!interaction.guildId) return;
    await interaction.deferReply({ ephemeral: true });
    const user = interaction.options.getUser('target')
    
        const member1 = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
        const guild = await client.guilds.fetch(member1.guild.id)
        const member = await guild.members.fetch(user.id)
    console.dir(interaction.member)
    if (!member) return;
    if(!member.bannable) return interaction.editReply('This member is not bannable.', { ephemeral: true })

    if(!interaction.member.permissions.has(BigInt(PermissionFlagsBits.BanMembers))) {
   return interaction.editReply('You do not have permission to ban this member.', { ephemeral: true })
} else {
    interaction.editReply('Banning user...')
    try {member.user.send("You have been banned from the server `" + interaction.member.guild.name + "` Because of the reason: `" + (interaction.options.getString('reason') || 'No reason given.') + "`")} 
    catch (e) {
        console.log(e)
        interaction.editReply('Failed to send a message to the user... Continuing to ban the user.', { ephemeral: true })
    }
  await member.ban({reason: "Banned by " + interaction.member.user.tag + " for: " + (interaction.options.getString('reason') || 'No reason given.')})
    return interaction.followUp({content: 'The user has been banned.', ephemeral: true })
}


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 0;