const { sock, msg, isiPesan } = require('../index');
const axios = require('axios');
const qs = require('qs');

async function tentangkamiHandler(sock, msg) {
    let baseurl = 'https://yudistira.turnbackhoax.id/api/antihoax/get_authors';
    let apiKey = qs.stringify({
        'key': '528b200xxb53cx5c797a881dd30b0ac2',
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://yudistira.turnbackhoax.id/api/antihoax/get_authors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'ci_session=22g058djjji2f86l1tq65qf9ptl63e2k'
        },
        data: apiKey
    };

    try {

        axios.request(config)
            .then((response) => {
                //console.log(JSON.stringify(response.data));
                // response.data.forEach(function (e) {


                sock.readMessages([msg.key])
                sock.sendMessage(msg.key.remoteJid, {
                    text: `Selamat datang di Whatsapp dan Telegram Bot kami
                    \nkami berkomitmen menjadi salah satu organisasi anti-hoaks terkemuka di Indonesia, berkontribusi dalam meningkatkan literasi digital masyarakat Indonesia dan membantu masyarakat untuk membedakan antara informasi yang benar dan hoaks, kami hadir sebagai tanggapan terhadap maraknya penyebaran informasi bohong (hoaks) di media sosial  
                    \nKami juga telah teraflisiasi dengan *Google cekfakta Indonesia* dan termasuk patner resmi Kominfo
                    \nmari kita perangi hoax, jadilah pahlawan indonesia anti hoax 
                    \nPastikan cek kembali informasi sebelum menyebar luaskanya
                    \n\nTerimakasih Bpk/Ibu *${msg.pushName}*` })


                // console.log(`ini adalah ke ${e.id}`)

                // })
            });


    } catch (error) {
        console.error('An error occurred:', error);
        sock.sendMessage(msg.key.remoteJid, { text: 'mohon ada kesalahan diserver '+error+''})
    }


}
module.exports = {
    tentangkamiHandler
}
