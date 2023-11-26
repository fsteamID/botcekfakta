const axios = require('axios');
const qs = require('qs');
const { sock, msg, isiPesan } = require('../index');

let baseurl = 'https://yudistira.turnbackhoax.id/api/antihoax/search/';
let apiKey = qs.stringify({
    'key': '528b200xxb53cx5c797a881dd30b0ac2',
    'method': 'content',
    'value': isiPesan,
    'limit': '5'
});
async function cariHandler(sock, msg) {
    let baseurl = 'https://yudistira.turnbackhoax.id/api/antihoax/search/';
    const isiPesan = msg.message.conversation.replace("cari", "")
        .replace(/(?:\r\n|\r|\n)/g, "");
    let apiKey = qs.stringify({
        'key': '528b200xxb53cx5c797a881dd30b0ac2',
        'method': 'content',
        'value': isiPesan,
        'limit': '5'
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://yudistira.turnbackhoax.id/api/antihoax/search/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'ci_session=22g058djjji2f86l1tq65qf9ptl63e2k'
        },
        data: apiKey
    };

    try {

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                response.data.forEach(function (e) {
                    // console.log(`ini adalah ke ${e.id}`)

                    sock.readMessages([msg.key])
                    sock.sendMessage(msg.key.remoteJid, { image: { url: `${e.picture1}` }, caption: `[${e.title}] \n\nJenis konten : *${e.classification}* \n\nBpk/ibu *${msg.pushName}* bisa baca selengkapnya dengan cara *baca ${e.id}* `, mimetype: 'image/png' })

                    // sock.sendMessage(msg.key.remoteJid, {
                    // text: `judul Berita : *${e.title}+* \nJenis konten : *${e.classification}* 
                    // \nDiterbitkan *${e.tanggal}+*
                    // \n_baca artikel ini dengan cara kirim pesan_
                    // \n\n*baca ${e.id}* `
                    // }, { quoted: msg })
                    // 

                })

            });


    } catch (error) {
        console.error('An error occurred:', error);
    }


}
module.exports = {
    cariHandler
}
