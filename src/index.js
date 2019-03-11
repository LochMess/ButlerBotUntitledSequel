const auth = require('../config/auth.json');

const commandService = require('./services/commandService.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const ownerID = require('../config/owner.json').id; 

const commandChar = "!";

client.login(auth.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => { 
    if (msg.author.bot || !msg.content.startsWith(commandChar)) return;

    let args = msg.content.slice(commandChar.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    commandService.handle(client, msg, cmd, args);
});