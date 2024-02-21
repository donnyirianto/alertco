import fastifyPlugin from 'fastify-plugin';
import mqtt from 'mqtt';

async function mqttPlugin(fastify, options) {
  // MQTT broker options
  const mqttOptions = {
    host: '172.24.16.131',
    port: 1883,
    reconnectPeriod: 2000,
    // Add more options as needed, such as username and password
  };

  // Connect to MQTT broker
  const client = mqtt.connect(mqttOptions);

  // MQTT client events
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
  });

  client.on('error', (error) => {
    console.error('Error:', error);
  });

  client.on('reconnect', () => {
    console.log('Attempting to reconnect to MQTT broker...');
  });

  // Decorate Fastify instance with MQTT client
  fastify.decorate('mqttClient', client);
}

export default fastifyPlugin(mqttPlugin, {
  name: 'mqttPlugin'
});
