const axios = require('axios');
const qs = require('qs');
const { sock, msg, isiPesan} = require('../index');

async function bacaHandler(sock, msg) {
   // let fs1 = 'Terimakasih sudah membaca artikel ini'
    let baseurl = 'https://yudistira.turnbackhoax.id/api/antihoax/';
    const isiPesan = msg.message.conversation.replace("baca", "")
    .replace(/(?:\r\n|\r|\n)/g, "");
    let apiKey = qs.stringify({
        'key': '528b200xxb53cx5c797a881dd30b0ac2',
        'id': isiPesan,
        'limit': 1
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://yudistira.turnbackhoax.id/api/antihoax/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'ci_session=22g058djjji2f86l1tq65qf9ptl63e2k'
        },
        data: apiKey
    };

    try {

        axios.request(config)
            .then((response) => {
              //  console.log(JSON.stringify(response.data));
              setTimeout(() => {
                sock.readMessages([msg.key])
                sock.sendMessage(msg.key.remoteJid, { image: { url: `${response.data.picture1}` }, caption: `[${response.data.classification}] ${response.data.content}  \nIsi diatas adalah narasi yang disebarkan oleh pelaku hoax`, mimetype: 'image/png' })
                sock.sendMessage(msg.key.remoteJid, { text: `*${response.data.title}* \nTim Penulis: ${response.data.authors} \nditerbitkan: Tanggal _${response.data.tanggal}_ \n\n${response.data.fact} \n\n*Kesimpulan* : ${response.data.conclusion}  \n*Peringatan* : pesan berantai ini sering disebarkan di platform media social terutama *${response.data.source_issue}* \n*Referensi* : ${response.data.references} \n*Sumber Arsip* : ${response.data.source_link} 
                \n*Tags* : ${response.data.tags} 
                \n\nTerimakasih sudah membaca artikel => *${response.data.title}*.  <= bagikan atau forward pesan ini untuk memerangi hoax di indonesia
                \njadilah pahlawan indonesia tanpa hoax, stop hoax dimulai dari tangan anda *${msg.pushName}*`
                }, { quoted: msg })
                
              }, 5000);
                   // console.log(`ini adalah ke ${e.id}`)


            });


    } catch (error) {
        console.error('An error occurred:', error);
    }


}
module.exports = {
    bacaHandler
}
