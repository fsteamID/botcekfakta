const { sock, msg, isiPesan } = require('../index');

async function panduanHandler(sock, msg) {
    sock.readMessages([msg.key])
    await sock.sendMessage(msg.key.remoteJid, { text: `Selamat datang dipanduan` }, { quoted: msg })
    await sock.sendMessage(msg.key.remoteJid, { text: 'ikuti panduan ini untuk memulai percakapan' })
    await sock.sendMessage(msg.key.remoteJid, { 
        text: `*about*\n_akan memunculkan Informasi tentang kami_
        \n\n*cek*\n_akan menampilkan artikel terbaru sebanyak 10 data dari server kami_
        \n\n*cari*\n_anda dapat mencari lebih spesifik artikel yang diinginkan\n*Contoh*: _cari politik_ 
        \nkami akan menampilakan 5 atau lebih dari itu sesuai artikel *politik* yang anda maksud sesuai yang ada di database server kami .
        \n\n*kirim hoax*\nanda bisa mengirimkan artikel atau informasi seputar hoax kepada kami
        \n\n*patner*\nanda akan menerima pesan semua informasi tim dan patner resmi kami disini
        \n\nCatatan:\nKami mohon maaf jika ada pesan delay / telat terkirim ke whatsapp anda, dikarenakan server mengalami beban yang sangat tinggi
        \nsegala informasi yang kami berikan sudah divalidasi oleh tim cek fakta indonesia, google cek fakta dan lainya
        \nTerimakasih

     `})
}
module.exports = {
    panduanHandler
}
