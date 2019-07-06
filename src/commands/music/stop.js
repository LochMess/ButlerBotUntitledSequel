const voiceService = require('../../services/voiceService');

exports.run = async (client, message, args) => {
    const dispatcher = voiceService.getDispatcher(message);
    dispatcher.end(`Stop command issued by: ${message.author.username}`);
    message.channel.send(':stop_button: Stop that guy! #TobyMySpider');
}