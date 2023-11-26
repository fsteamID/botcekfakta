const { sock, msg, isiPesan } = require('../index');

async function kirimhoaxHandler(sock, msg) {
    sock.readMessages([msg.key])
    await sock.sendMessage(msg.key.remoteJid, { text: `Mohon Maaf sistem kami sedang dalam pemeliharaan silahkan coba kembali nanti `})
}
module.exports = {
    kirimhoaxHandler
}
