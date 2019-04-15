const ytdl = require('ytdl-core');
const voiceService = require('../services/voiceService');

// TODO: rename channel to current song
exports.run = async (client, message, args) => {
    if (!message.member.voiceChannel) return message.channel.send(`Join a voice channel dofus.`);

    const url = args[0];
    if (!await ytdl.validateURL(url)) return message.channel.send(`Please provide a YouTube link to play.`);

    const volume = args[1] ? args[1] : 1;

    voiceService.nowPlaying(message, url);

    if (voiceService.inVoiceChannel(message)) {
        const conn = voiceService.getConnection(message);
        voiceService.playAudio(conn, url, volume);
    }
    else {
        voiceService.joinVoiceChannel(message)
            .then(conn => voiceService.playAudio(conn, url, volume))
            .catch(console.error);
    }
}