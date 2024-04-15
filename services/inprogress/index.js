import gTTS from "gtts";
import path from "path";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getData = async (fastify, req, region, filename) => {
  try {
    const conn = fastify.mysql;
    const [data] = await conn.query(`select group_concat(Diambil_oleh) as Nama, count(*) as total
        from dt_complain 
        where 
        Kode_Lokasi_Tujuan ='${region}'
        and Status_Komplain rlike 'INPROGRESS'
        and TIMESTAMPDIFF(MINUTE, Tanggal_Ambil, NOW()) > 20
        and Tipe_Lokasi_Asal ='store'
        and bagian_tujuan ='EDP Region'
        and Tujuan_Relasi_Komplain =''`);

    if (data[0].total === 0) return { code: 200, message: "Tidak Ada Data" };

    const textSuara = `Perhatian... Perhatian... Kepada ${data[0].Nama}, Anda tercatat sedang mengerjakan komplen lebih dari 20 menit dan belum diselesaikan, Apakah ada kendala dalam pengerjaan?`;
    const outputPath = path.join(process.cwd(), "public", filename);

    var gtts = new gTTS(textSuara, "id");
    gtts.save(outputPath, function (err, result) {
      if (err) {
        throw new Error(err);
      }
      console.log(`Success! Open file ${outputPath} to hear result.`);
    });
    await sleep(3000);
    fastify.mqttClient.publish(`start-inprogress-${region.toLowerCase().replace(/0/g, "g")}`, "1", (err) => {
      if (err) {
        console.error("Error publishing message:", err);
        return {
          code: 500,
          message: err,
        };
      } else {
        console.log(`Published message 1 to topic "start-inprogress-${region.toLowerCase().replace(/0/g, "g")}"`);
      }
    });
    return {
      code: 200,
      message: "Sukses",
      data: textSuara,
    };
  } catch (error) {
    fastify.log.error(error, "Error Service (/services/inprogress/index.js)");
    return {
      code: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
