import gTTS from "gtts";
import path from "path";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getData = async (fastify, req, region, filename) => {
  try {
    //const { alerts } = req.body

    const conn = fastify.mysql;
    const [alerts] = await conn.query(`select count(*) as Total_CO,group_concat(kode_lokasi_asal) as toko 
        from dt_complain where 
        Kode_Lokasi_Tujuan ='${region}'
        and (Deskripsi rlike 'pesan|klik|apka|grab|istore|dms|sales|kasir|jual|absen|kasir|jual|pos|posmain' or masalah rlike'KLIK')
        and Status_Komplain rlike 'OPEN'
        and date(tanggal_buat) = curdate()
        and bagian_tujuan ='EDP Region' 
        order by Total_CO`);

    if (alerts[0].Total_CO === 0) return { code: 200, message: "Tidak Ada Data" };

    const textSuara = `Perhatian... Perhatian... Ada ${
      alerts[0].toko.split(",").length
    } komplen bersifat urgent, toko ${alerts[0].toko}. Tolong segera di cek... terima kasih.`;
    const outputPath = path.join(process.cwd(), "public", filename);

    var gtts = new gTTS(textSuara, "id");
    gtts.save(outputPath, function (err, result) {
      if (err) {
        throw new Error(err);
      }
      console.log(`Success! Open file ${outputPath} to hear result.`);
    });
    await sleep(3000);
    fastify.mqttClient.publish(`start-urgent-${region.toLowerCase().replace(/0/g, "g")}`, "1", (err) => {
      if (err) {
        console.error("Error publishing message:", err);
        return {
          code: 500,
          message: err,
        };
      } else {
        console.log(`Published message 1 to topic "start-urgent-${region.toLowerCase().replace(/0/g, "g")}"`);
      }
    });
    return {
      code: 200,
      message: "Sukses",
      data: textSuara,
    };
  } catch (error) {
    fastify.log.error(error, "Error Service (/services/urgent/index.js)");
    return {
      code: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
