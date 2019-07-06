const voiceService = require('../../services/voiceService');

exports.run = async (client, message, args) => {
    const dispatcher = voiceService.getDispatcher(message);
    dispatcher.setVolume(dispatcher.volume / 2);
}