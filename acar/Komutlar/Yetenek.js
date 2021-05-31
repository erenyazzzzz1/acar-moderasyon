const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
module.exports = {
    Isim: "yetenek",
    Komut: ["yetenek"],
    Kullanim: "yetenek @acar/ID <Yetenek İsmi>",
    Aciklama: "Etiketlenen kişiye belirlenen yetenek rolünü verir.",
    Kategori: "Yetkili Komutları",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
      let rolismi;
      let rolid;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!message.member.roles.cache.has(acarveri.Roller.botCommand) && !message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`).then(x => x.delete({timeout: 5000}));
     if(args[1] === "vokal" || args[1] === "Vokal") {
        rolismi = "Vokal"
        rolid = acarveri.Yetenek.vokalRolu
    } if (args[1] === "müzisyen" || args[1] === "müzisyen") {
        rolismi = "Müzisyen"
        rolid = acarveri.Yetenek.müzisyenRolu
    } if (args[1] === "telli" || args[1] === "Telli") {
        rolismi = "Telli"
        rolid = acarveri.Yetenek.telliRolu
    } 
    if (args[1] === "yazılımcı" || args[1] === "Yazılımcı") {
        rolismi = "Yazılımcı"
        rolid = acarveri.Yetenek.yazılımcıRolu
    } if (args[1] === "ressam" || args[1] === "Ressam") {
        rolismi = "Ressam"
        rolid = acarveri.Yetenek.ressamRolu
    } if (args[1] === "şair" || args[1] === "Şair") {
        rolismi = "Şair"
        rolid = acarveri.Yetenek.şairRolu
    } if (args[1] === "tasarımcı" || args[1] === "Tasarımcı") {
        rolismi = "Tasarımcı"
        rolid = acarveri.Yetenek.tasarımcıRolu
    } 
    const embed = new MessageEmbed().setColor(`YELLOW`)
    if (!uye) return message.channel.send(`Hata: yetenek rolü verebilmem için lütfen bir üyeyi etiketle __Örn:__ \`${client.sistem.a_Prefix}${module.exports.Isim} @acar/ID <Yetenek İsmi>\`!`).then(x => x.delete({timeout: 5000}));
    if(args[1] !== "vokal" && args[1] !== "Vokal" && 
       args[1] !== "müzisyen" && args[1] !== "Müzisyen" &&
       args[1] !== "telli" && args[1] !== "Telli" &&
       args[1] !== "yazılımcı" && args[1] !== "Yazılımcı" &&
       args[1] !== "tasarımcı" && args[1] !== "Tasarımcı" &&
       args[1] !== "ressam" && args[1] !== "Ressam" &&
       args[1] !== "şair" && args[1] !== "Şair" 
       ) return message.channel.send(embed.setAuthor(acarveri.Tag + " " + acarveri.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(client.altbaslik + ` • Örn; '${client.sistem.a_Prefix}${module.exports.Isim} @acar/ID müzisyen'`).setDescription(`Yetenek ismi belirlenmedi! lütfen aşağıdaki gibi yetenek ismi belirleyin! \`\`\`• Vokal\n• Müzisyen\n• Telli\n• Yazılımcı\n• Tasarımcı\n• Ressam\n• Şair\`\`\``));
      uye.roles.cache.has(rolid) ? uye.roles.remove(rolid) : uye.roles.add(rolid);
      if(!uye.roles.cache.has(rolid)) {
        message.channel.send(`${client.emoji(acarveri.Emojiler.Onay)} Başarıyla ${uye}, isimli kişiye **${rolismi}** rolü verildi.`).catch().then(x => x.delete({timeout: 7000}));
        message.react(client.emoji(acarveri.Emojiler.Onay))
      } else {
        message.channel.send(`${client.emoji(acarveri.Emojiler.Onay)} Başarıyla ${uye}, isimli kişinin **${rolismi}** rolü geri alındı.`).catch().then(x => x.delete({timeout: 7000}));
        message.react(client.emoji(acarveri.Emojiler.Onay))
      };
    }
};