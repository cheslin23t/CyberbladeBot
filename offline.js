const fs = require("fs");
const Path = require("path");
const { Client, Collection, IntentsBitField }= require("discord.js");
require('dotenv').config()
const shell = require('shelljs')

 

 

const client = global.client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,

      ],
    allowedMentions: {
        parse: ["users"]
    }
});

client.on('messageCreate', async (message) => {
    if(message.content == "c!start"){
        await message.channel.send({content: "Starting..."});
        shell.exec(__dirname + "\\start.bat");
    }   
})
client.login(process.env.TOKEN);


