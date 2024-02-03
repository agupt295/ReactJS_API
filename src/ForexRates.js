import React, { useState, useEffect } from 'react';
const apiKey = process.env.REACT_APP_FOREX_API_KEY

const ForexRates = () => {
  const [baseCurrency, setBaseCurrency] = useState('INR');
  const [convertCurrencies, setConvertCurrencies] = useState('EUR,USD,JPY');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.forexrateapi.com/v1/latest?api_key=${apiKey}&base=${baseCurrency}&currencies=${convertCurrencies}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Forex Rates</h1>
      <div>
        <label>
          Base Currency:
          <input type="text" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Convert Currencies:
          <input type="text" value={convertCurrencies} onChange={(e) => setConvertCurrencies(e.target.value)} />
        </label>
      </div>
      <button onClick={handleButtonClick}>Get Rates</button>
      {data && (
        <div>
          <h2>Rates:</h2>
          <ul>
            {Object.entries(data.rates).map(([currency, rate]) => (
              <li key={currency}>
                {currency}: {rate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ForexRates;