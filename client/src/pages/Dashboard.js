import React, { useEffect, useState } from 'react';
import { fetchCoins } from '../services/api';
import CryptoTable from '../components/CryptoTable';

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);

    const loadData = async () => {
        const result = await fetchCoins();
        setCoins(result);
        setLastUpdated(new Date().toLocaleTimeString());
    };

      useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 30 * 60 * 1000); // 30 minutes
        return () => clearInterval(interval);
      }, []);

 
    return (
        <div style={{ padding: '20px' }}>
            <h1>Top 10 Cryptocurrencies</h1>
            <p>Auto-refresh every 30 minutes</p>
            {lastUpdated && <p>Last Refreshed: {lastUpdated}</p>}
            <CryptoTable data={coins} />
        </div>
    );
};

export default Dashboard;
