const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');


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
    try {
        return message.member.voiceChannel.join();
    } catch(e) {
        console.error(`joinVoiceChannel ${e}`);
    }
}

async function leaveVoiceChannel(message) {
    return message.guild.voiceConnection.disconnect;
}

async function nowPlaying(message, url) {
    ytdl.getInfo(url)
        .then(info => message.channel.send(
            `:musical_note: ${info.title}\n:information_desk_person: ${info.author.name}`
        ))
        .catch(console.error);
}

async function playAudio(connection, url, volume) {
    const dispatcher = connection.playOpusStream(
        await ytdlDiscord(url, {filter: 'audioonly'}),
        // { type: 'opus', passes: 3 }
        { passes: 3 }
    );
    
    dispatcher.on('error', error => console.error(error));
    dispatcher.on('end', reason => {
        if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
        else console.log(reason);
    });

    dispatcher.setVolumeLogarithmic(1 / 5);
}

module.exports = {
    getDispatcher: getDispatcher,
    getConnection: getConnection,
    getBotVoiceChannel: getBotVoiceChannel,
    inVoiceChannel: inVoiceChannel,
    joinVoiceChannel: joinVoiceChannel,
    leaveVoiceChannel: leaveVoiceChannel,
    nowPlaying: nowPlaying,
    playAudio: playAudio
}