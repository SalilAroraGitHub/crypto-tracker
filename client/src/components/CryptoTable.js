import React from 'react';

function CryptoTable({ data }) {
  return (
    <table border="1" cellPadding="8" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price (USD)</th>
          <th>Market Cap</th>
          <th>24h % Change</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.coinId}>
            <td>{coin.name}</td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>${coin.price.toFixed(2)}</td>
            <td>${coin.marketCap.toLocaleString()}</td>
            <td style={{ color: coin.change24h >= 0 ? 'green' : 'red' }}>
              {coin.change24h.toFixed(2)}%
            </td>
            <td>{new Date(coin.lastUpdated).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CryptoTable;
