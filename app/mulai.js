const { sock, msg, isiPesan } = require('../index');

async function startHandler(sock, msg) {
    sock.readMessages([msg.key])
    await sock.sendMessage(msg.key.remoteJid, { text: `Selamat datang  Bpk/Ibu *${msg.pushName}*
    \n\nuntuk memulai percakapan dengan bot whatsapp ini ketik *panduan*` }, { quoted: msg })
 }
module.exports = {
    startHandler
}
