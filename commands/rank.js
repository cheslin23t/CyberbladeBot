const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const data = new SlashCommandBuilder()
    .setName('rank')
    .setDescription("Changes a user's rank.")
    
    .addUserOption(option => option.setName('target').setRequired(true).setDescription("The user to change the rank of."))
    .addStringOption(option =>
		option.setName('rank')
			.setDescription('The rank to change the user to.')
			.setRequired(true)
			.addChoices(
                { name: 'Developer', value: 'developer' },
                { name: 'Bot Manager', value: 'botmanager' },
                { name: 'Beta Commands', value: 'beta' },
                { name: 'Premium', value: 'premium' },
				{ name: 'VIP', value: 'vip' },
                { name: 'None', value: 'none' },
                { name: 'Blacklisted', value: 'blacklisted' },
				
                
                
			))
    // .addStringOption(option =>
	// 	option.setName('reason')
	// 		.setDescription('What to tell the user about the kick.')
	// 		.setRequired(false))
    
module.exports.execute = async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const user = interaction.member.user
    const admin = require('../models/admin.js')
    // const admin1 = await admin.findOne({ userID: user.id })
    // if(!admin1) return interaction.editReply('Error: `You do not have permission to use this command.`\nErrorcode: `UserLacksRankInDatabase`', { ephemeral: true })
    // if(admin1.level >= 5) {
        const target = interaction.options.getUser('target')
        const rankStr = interaction.options.getString('rank')
        var admin2 = await admin.findOne({ userID: target.id })
        
        var rank
        if(rankStr == 'developer') {rank = 5} else if(rankStr == 'botmanager') {rank = 4} else if(rankStr == 'beta') {rank = 3} else if(rankStr == 'premium') {rank = 2} else if(rankStr == 'vip') {rank = 1} else if(rankStr == 'none') {rank = 0} else if(rankStr == 'blacklisted') {rank = -1}
        var humanReadableRank
        if(rank == 5) {humanReadableRank = 'Developer'} else if(rank == 4) {humanReadableRank = 'Bot Manager'} else if(rank == 3) {humanReadableRank = 'Beta Commands'} else if(rank == 2) {humanReadableRank = 'Premium'} else if(rank == 1) {humanReadableRank = 'VIP'} else if(rank == 0) {humanReadableRank = 'None'} else if(rank == -1) {humanReadableRank = 'Blacklisted'}
        if(admin2){
            admin2.level = rank
            await admin2.save()
            return interaction.editReply(`Successfully changed <@${target.id}>'s rank to \`${humanReadableRank}\``, { ephemeral: true })
        }
        const newAdmin = new admin({userID: target.id, level: rank, name: target.username})
        await newAdmin.save()
        return interaction.editReply('Successfully changed <@' + target.id + '>\'s rank to `' + humanReadableRank + '`', { ephemeral: true })
    // } else {
    //     return interaction.editReply('Error: `You do not have permission to use this command.`\nErrorcode: `UserRequiresDeveloper`', { ephemeral: true })
    // }
}


module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

module.exports.level = 5;