import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CurrencyGroup from "./CurrencyGroup";
import Loader from "./Loader";

// export const currencyList = ["USD", "EUR", "AUD", "CAD", "CHF", "NZD", "BGN"];
export const currencyList = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
  { value: "CHF", label: "CHF" },
  { value: "NZD", label: "NZD" },
  { value: "BGN", label: "BGN" },
];

export const apiRequest = (apiVersion, startCurrency, endCurrency) => {
  return [
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/latest/currencies/${startCurrency}/${endCurrency}.json`,
    startCurrency,
    endCurrency,
  ];
};

export default function CurrencyMenu(props) {
  const [listOption, setListOption] = useState(currencyList[0].value);
  const [requestResults, setRequestResults] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(false);

  //chunks of array items
  const [chunkedRates, setChunkedRates] = useState([]);
  const [loadedCurrencyRates, setLoadedCurrencyRates] = useState([]);

  for (let i in currencyList) {
    for (let j in currencyList) {
      if (currencyList[i].value !== currencyList[j].value) {
        //store all exchange rates
        requestResults.push(
          apiRequest(
            1,
            currencyList[i].value.toLowerCase(),
            currencyList[j].value.toLowerCase()
          )
        );
      }
    }
  }

  useEffect(async () => {
    for (let i in requestResults) {
      setLoading(true);
      try {
        const serviceRequest = await axios
          .get(requestResults[i][0])
          .then((res) => res.data);
        const serviceCurrency = Object.entries(serviceRequest)[1];
        exchangeRates.push(serviceCurrency);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }

    // split exchangeRates into chunks
    ((arr, size) => {
      for (let i = 0; i < arr.length; i += size) {
        const chunk = arr.slice(i, i + size);
        chunkedRates.push(chunk);
      }
    })(exchangeRates, 6);
    setLoadedCurrencyRates(chunkedRates[0]);
    setLoading(false);
  }, []);

  //rates for current selected currency
  const handleCurrencyChange = (e) => {
    const newValue = e.value;
    setListOption(newValue);
  };

  useEffect(() => {
    for (let i in currencyList) {
      if (listOption === currencyList[i].value) {
        console.log(`${listOption}, ${currencyList[i].value}`);
        setLoadedCurrencyRates(chunkedRates[i]);
      }
    }
    console.log(`List option updated to ${listOption}`);
  }, [listOption]);

  return (
    <div>
      <Select
        options={currencyList}
        value={currencyList.find((obj) => obj.value === listOption)}
        onChange={handleCurrencyChange}
      />

      <div className="rates-output">
        {loading ? (
          <Loader />
        ) : (
          <div className="rates-container">
            <CurrencyGroup
              arr={loadedCurrencyRates}
              option={listOption}
              filterStatement={(filteredRate) => filteredRate[1] < 1}
              groupId={1}
            />

            <CurrencyGroup
              arr={loadedCurrencyRates}
              option={listOption}
              filterStatement={(filteredRate) =>
                filteredRate[1] >= 1 && filteredRate[1] <= 1.5
              }
              groupId={2}
            />

            <CurrencyGroup
              arr={loadedCurrencyRates}
              option={listOption}
              filterStatement={(filteredRate) => filteredRate[1] > 1.5}
              groupId={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}
