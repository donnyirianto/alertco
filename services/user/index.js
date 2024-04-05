import gTTS from "gtts";
import path from "path";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getData = async (fastify, req, region, filename) => {
  try {
    const conn = fastify.mysql;
    const [data] = await conn.query(`SELECT group_concat(SUBSTRING_INDEX(Nama, '-', 1)) as Nama,count(*) as total
                                        from (
                                        select
                                        nama
                                        from
                                        (
                                            SELECT
                                            concat(
                                                SUBSTRING_INDEX(SUBSTRING_INDEX(Diambil_Oleh, '-', 1), ' ', 2),
                                                ' - ',
                                                if(
                                                hour(min(Tanggal_ambil)) between 5
                                                and 10,
                                                '(Shift 1)',
                                                (
                                                    if(
                                                    hour(min(Tanggal_ambil)) between 13
                                                    and 19,
                                                    '(Shift 2)',
                                                    '(Shift 3)'
                                                    )
                                                )
                                                )
                                            ) as Nama,
                                            diambil_oleh,
                                            max(Tanggal_selesai) as Pengerjaan_Terakhir,
                                            sum(if(Status_Komplain != 'OPEN', 1, 0)) as Total_Co,
                                            sum(if(Status_Komplain = 'INPROGRESS', 1, 0)) as Total_Inprogress,
                                            sum(if(Status_SLA = 'Lewat SLA', 1, 0)) as Total_SLA
                                            FROM
                                            dt_complain
                                            where
                                            Kode_Lokasi_Tujuan = '${region}'
                                            and date(Tanggal_Buat) = curdate()
                                            and diambil_oleh != ''
                                            and diambil_oleh in(
                                                select
                                                nama
                                                from
                                                dt_userco
                                                where
                                                subdivisi in('Support Toko', 'Support DC & Collect')
                                            )
                                            and diambil_oleh not in(
                                            select 
                                                nama 
                                            from 
                                                dt_dispensasi_user
                                            where now() between jam_start and jam_end
                                            )
                                            group by
                                            Diambil_Oleh
                                            having TIMESTAMPDIFF(MINUTE, Pengerjaan_Terakhir, NOW()) > 10
                                        ) a
                                        where
                                        Total_Inprogress = 0
                                        HAVING Nama RLIKE (
										    CASE 
										        WHEN HOUR(NOW()) BETWEEN 6 AND 14 THEN 'Shift 1'
										        WHEN HOUR(NOW()) BETWEEN 15 AND 22 THEN 'Shift 2'
										        ELSE 'Shift 3'
										    end
                                        )
                                        order by
                                        Pengerjaan_terakhir asc
                                        ) a`);

    if (data[0].total === 0) return { code: 200, message: "Tidak Ada Data" };

    const textSuara = `Perhatian... Perhatian... Kepada ${data[0].Nama}, Anda tercatat sedang tidak mengerjakan komplen lebih dari 10 menit, Apakah ada kendala? Jika Tidak, Segera Ambil Komplen Onlain kembali`;
    const outputPath = path.join(process.cwd(), "public", filename);

    var gtts = new gTTS(textSuara, "id");
    gtts.save(outputPath, function (err, result) {
      if (err) {
        throw new Error(err);
      }
      console.log(`Success! Open file ${outputPath} to hear result.`);
    });

    await sleep(3000);

    fastify.mqttClient.publish(`start-user-${region.toLowerCase().replace(/0/g, "g")}`, "1", (err) => {
      if (err) {
        console.error("Error publishing message:", err);
        return {
          code: 500,
          message: err,
        };
      } else {
        console.log(`Published message 1 to topic "start-user-${region.toLowerCase().replace(/0/g, "g")}"`);
      }
    });
    return {
      code: 200,
      message: "Sukses",
      data: textSuara,
    };
  } catch (error) {
    fastify.log.error(error, "Error Service (/services/user/index.js)");
    return {
      code: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
