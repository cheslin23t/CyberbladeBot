const Discord = require("discord.js");

module.exports = async (client, member) => {
        const serverModel = require("../models/server");
        const server = await serverModel.findOne({serverID: member.guild.id})
        if(!server) {
            var newServer = new serverModel({serverID: member.guild.id});
            await newServer.save();
            return
        }
        if(server.welcomeMessageEnabled) {
            client.enums[server.type](server, member)
        }
}

