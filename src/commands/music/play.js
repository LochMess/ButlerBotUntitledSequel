const ytdl = require('ytdl-core');
const voiceService = require('../../services/voiceService');

// TODO: Add prompt for the correct discord permissions to talk in a voice channel
// TODO: rename channel to current song
exports.run = async (client, message, args) => {
    if (!message.member.voiceChannel) return message.channel.send(`Join a voice channel dofus.`);

    const url = args[0];
    if (!await ytdl.validateURL(url)) return message.channel.send(`Please provide a YouTube link to play.`);

    const volume = args[1] ? args[1] : 1;

    voiceService.nowPlaying(message, url);

    if (voiceService.inVoiceChannel(message)) {
        const dispatcher = voiceService.getDispatcher(message);
        console.log(`Ending stream dispatcher`);
        if (dispatcher) dispatcher.end();
    }
    const conn = voiceService.inVoiceChannel(message) ? voiceService.getConnection(message) : await voiceService.joinVoiceChannel(message);

    voiceService.playAudio(conn, url, volume);
}