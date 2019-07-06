const voiceService = require('../../services/voiceService');

exports.run = async (client, message, args) => {
    const conn = voiceService.getConnection(message);
    conn.disconnect();
    message.channel.send(':hand_splayed: It is a far, far better thing that I do, than I have ever done; it is a far, far better rest that I go to than I have ever known.');
}