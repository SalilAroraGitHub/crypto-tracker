import cron from 'node-cron';
import axios from 'axios';

cron.schedule('0 * * * *', async () => { 
    try {
        await axios.post('http://localhost:5000/api/history'); 
    } catch (err) {
        console.error(' Cron job failed:', err.message);
    }
});
