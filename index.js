const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    BufferJSON,
    useSingleFileAuthState
} = require('@whiskeysockets/baileys');
const axios = require('axios');
const { Boom } = require('@hapi/boom');

//const  { Boom } = require ('@hapi/boom');
const { tentangkamiHandler } = require('./app/tentangkami');
const { startHandler } = require('./app/mulai');
const { panduanHandler } = require('./app/panduan');
const { patnerHandler } = require('./app/patner');
const { absenkuHandler } = require('./app/absenku');
const { cariHandler } = require('./app/cari');
const { kirimhoaxHandler } = require('./app/kirimhoax');

const { hoaxHandler } = require('./app/mafindo');
const { bacaHandler } = require('./app/bacartikel');
// tambahan buat bot
//const statusBotVia = 'Lewat Bot';
// tanggal
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
// memulai bot koneksi

const fsBot = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('botSaya');
    const sock = makeWASocket({
        printQRInTerminal: true,
        browser: ['fsteamID Bot Whatsapp Project', 'Chrome', '110.0.5481.177'],
        auth: state
    });

    // menyimpan koneksi ke folder botSaya
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', function (update, connection2) {
        let _a, _b;
        let connection = update.connection, lastDisconnect = update.lastDisconnect;
        if (connection == 'close') {
            if (((_b = (_a = lastDisconnect.error) == null
                || _a == void 0 ? void 0 : _a.output) == null
                || _b == void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
                fsBot();
            }
        } else {
            //console.log('Koneksi : '+JSON.stringify(connection));
        }
        // sampai sini oke

    });

    //  seting buat pesan
    sock.ev.on("messages.upsert", async m => {
        const msg = m.messages[0];
        const namaMu = m.messages[0].pushName;
        const nmrWa = m.messages[0].remoteJid;
        const isiPesan = m.messages[0].message?.conversation
        const key = {
          remoteJid: nmrWa,
          id: msg.key.id,
          participant: msg.key.participant
        }

        // mencetak data di console log
        console.log((msg));
        if (!msg.key.fromMe && m.type == 'notify') {
            if (msg.key.remoteJid.includes('@s.whatsapp.net')) {
                //i
                if (isiPesan?.includes('about')) {
                    await tentangkamiHandler(sock, msg);
                }
                if (isiPesan?.includes('mulai')) {
                    await startHandler(sock, msg);
                }
                if (isiPesan?.includes('panduan')) {
                    await panduanHandler(sock, msg);
                }
                if (isiPesan?.includes('cari')) {
                    await cariHandler(sock, msg);
                }
                if (isiPesan?.includes('baca')) {
                    await bacaHandler(sock, msg);
                }if (isiPesan?.includes('cek')) {
                    await hoaxHandler(sock, msg);
                }
                if (isiPesan?.includes('kirim hoax')) {
                    await kirimhoaxHandler(sock, msg);
                }
                if (isiPesan.includes('patner')) {
                    await patnerHandler(sock, msg);
                }
               
            }
        }
    });
}
fsBot();
