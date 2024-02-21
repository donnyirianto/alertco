import gTTS from "gtts";
import path from 'path';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getData =  async(fastify,req,filename)=>{
    try { 
        
        const { alerts } = req.body
        
        if(alerts[0].labels.toko.length === 0) return {code: 200, message: "Tidak Ada Data"}

        const textSuara = `Perhatian... Perhatian... Ada ${alerts[0].labels.toko.split(",").length} komplen bersifat urgent, toko ${alerts[0].labels.toko}. Tolong segera di cek... terima kasih.`
        const outputPath = path.join(process.cwd(), 'public', filename);

        var gtts = new gTTS(textSuara, 'id');
        gtts.save(outputPath, function (err, result) {
          if(err) { throw new Error(err) }
          console.log(`Success! Open file ${outputPath} to hear result.`);
        });
        await sleep(3000)
        fastify.mqttClient.publish(`start-urgent-${region.toLowerCase().replace(/0/g, 'g')}`,"1", (err) => {
            if (err) {
                console.error('Error publishing message:', err);
                return { 
                    code: 500,
                    message: err
                } 
            } else {
              console.log(`Published message 1 to topic "start-urgent-${region.toLowerCase().replace(/0/g, 'g')}"`);
            }
        });
        return { 
            code: 200,
            message: "Sukses",
            data: textSuara
        } 

    } catch (error) {
        fastify.log.error(error, "Error Service (/services/urgent/index.js)")
        return { 
            code: 500,
            message: "Internal Server Error",
            error: error.message
        }
    }
}