const cron = require('node-cron');
const axios = require('axios');

// Run every 20 seconds
cron.schedule('*/20 * * * * *', async () => {
  try {
    const response = await axios.get('http://localhost:4000/refresh');
    console.log(`[${new Date().toISOString()}] Refresh successful:`, response.status);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Refresh failed:`, error.message);
  }
});

console.log('🔄 Cron job started to hit http://localhost:4000/refresh every 20 seconds.');
