const ytdl = require('ytdl-core');

function getDispatcher(message) {
    return message.guild.voiceConnection.dispatcher;    
}

function getConnection(message) {
    return message.guild.voiceConnection;
}

async function getBotVoiceChannel(message) {
    return message.guild.voiceConnection.channel;    
}

function inVoiceChannel(message) {
    return message.guild.voiceConnection ? true : false;    
}

async function joinVoiceChannel(message) {
    return message.member.voiceChannel.join();    
}

async function leaveVoiceChannel(message) {
    return message.guild.voiceConnection.disconnect; 
}

async function nowPlaying(message, url) {
    ytdl.getInfo(url)
        .then(info => message.channel.send(
            `Playing: ${info.title}\nBy: ${info.author.name}`
        ))
        .catch(console.error);
}

module.exports = {
    getDispatcher: getDispatcher,
    getConnection: getConnection,
    getBotVoiceChannel: getBotVoiceChannel,
    inVoiceChannel: inVoiceChannel,
    joinVoiceChannel: joinVoiceChannel,
    leaveVoiceChannel: leaveVoiceChannel,
    nowPlaying: nowPlaying
}