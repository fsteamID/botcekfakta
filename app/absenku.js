const axios = require('axios');
const { sock, msg, isiPesan } = require('../index');
const statusBotVia = 'Lewat Bot';
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();

//const LinkApi = 'https://script.google.com/macros/s/AKfycbznw_cNM14cLpPGLGLKZbTTOVRp6hOY3mMmWiscbYUT6QrGSVxJHs4BXt0Gi6fa16RPyQ/exec?';
//
const LinkApi = 'https://script.google.com/macros/s/AKfycbyleVo-62gTDUyj4Wu2cQVQBlbjwrDZbP58wtZPGrIVFB9kY8SMwDR5UKmeDia4ISiEtQ/exec?';


async function absenkuHandler(sock, msg) {
  const nama = msg.message.conversation.replace('https://', '') //.replace("#w/","")
  // .replace("Gunakan Format pesan absen seperti ini", "")
  //.replace(/(?:\r\n|\r|\n)/g, "");
  //console.log(nama);
  // &
  // action=register&nama=${namaMu}&whatsapp=${msg.key.remoteJid.replace("@s.whatsapp.net", "")}8&tautan=${nama}&status=Lewat%20Bot%20WA
  // memanggil api action=register&nama=${namaMu}&whatsapp=6655578&tautan=jkjhjjjjjjj1666&status=Lewat%20Bot%20WA

  axios.get(`${LinkApi}action=register&nama=${msg.pushName}&whatsapp=${msg.key.remoteJid}8&tautan=${nama}&status=${statusBotVia}&tanggal=${date + "/" + month + "/" + year}`)
    .then(async (response) => {
      //
      // console.log('Respon :'+JSON.stringify(response.data));
      let { success, data, message } = response.data;
      if (success) {
        let str = `${message}\n\nmakasih sayangku *${msg.pushName}*\nBot udah masukan ke database ya sayang\nBerikut absen Kamu\n\n\nTautan Absen  kamu :\n${nama}\n\n\nYuk ah absen lagi sayangku\nbot akan selalu nunggu absen kamu\nklik tombol dibawah`;

        sock.sendMessage(msg.key.remoteJid, { text: str }, { quoted: msg })

      } else {
        let str2 = `${message}\n\nYah bot gak bisa masukan absen tersebut ke databse bot\nbot udah deteksi tautan yang kamu kirim sepertinya udah ada didatabse bot\n\nini bot tunjukin kesalahanya kamu ngirim ke bot \n\n ~${nama}~ \n\n\nTuh kan bener bot bilang, data tersebut udah ada\n\nyuk ah kirim lagi sayang link absenya yang lain ya sayangku *${msg.pushName}* `;
        sock.readMessages([msg.key])
        sock.sendMessage(msg.key.remoteJid, { text: str2 }, { quoted: msg })
      }
    })
}


module.exports = {
  absenkuHandler
}
