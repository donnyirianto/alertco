import fastifyPlugin from 'fastify-plugin';
import dayjs from 'dayjs';
import 'dayjs/locale/id.js'; 

const tanggalIndo = (fastify, options,done) => {
  // Register a decorator to format responses
  fastify.decorate('tanggalIndo', function (tanggal) {
    try {
      
      dayjs.locale('id');
      const inputDateObj = dayjs(tanggal);
      const indonesianDate = inputDateObj.format('dddd, DD MMMM YYYY');
      return indonesianDate; 
    } catch (error) {
        return "Invalid date format";
    }
  });
  fastify.decorate('hariIndo', function (tanggal) {
    try {
      
      dayjs.locale('id');
      const inputDateObj = dayjs(tanggal);
      const indonesianDate = inputDateObj.format('dddd');
      return indonesianDate; 
    } catch (error) {
        return "Invalid date format";
    }
  });
  fastify.decorate('periodeIndo', function (tanggal) {
    try {
      
      dayjs.locale('id');
      const inputDateObj = dayjs(tanggal);
      const indonesianDate = inputDateObj.format('MMMM YYYY');
      return indonesianDate; 
    } catch (error) {
        return "Invalid date format";
    }
  });
 done();
}
export const fastifyTanggalIndoPlugin = fastifyPlugin(tanggalIndo,{ name: 'fastify-tanggalIndo-plugin' })
 
