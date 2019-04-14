const ytdl = require('ytdl-core');
const voiceService = require('../services/voiceService');

// TODO: rename channel to current song
function playAudio(connection, url, volume) {
    const dispatcher = connection.playStream(
        ytdl(url),
        { seek: 0.1, volume: volume }
    );
    dispatcher.on('error', console.error);
}

exports.run = async (client, message, args) => {
    if (!message.member.voiceChannel) return message.channel.send(`Join a voice channel dofus.`);

    const url = args[0];
    if (!await ytdl.validateURL(url)) return message.channel.send(`Please provide a YouTube link to play.`);

    const volume = args[1] ? args[1] : 1;

    voiceService.nowPlaying(message, url);

    if (voiceService.inVoiceChannel(message)) {
        const conn = voiceService.getConnection(message);
        playAudio(conn, url, volume);
    }
    else {
        voiceService.joinVoiceChannel(message)
            .then(conn => playAudio(conn, url, volume))
            .catch(console.error);
    }
}