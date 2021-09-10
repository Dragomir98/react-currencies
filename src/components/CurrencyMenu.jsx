import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Select from "react-select";
import { readFromCache, removeFromCache, writeToCache } from "../pages/Home";
import CurrencyGroup from "./CurrencyGroup";
import Loader from "./Loader";

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

export const clearLocalStorage = () => {
  const actualTime = new Date(Date.now());
  const endOfDay = new Date(
    actualTime.getFullYear(),
    actualTime.getMonth(),
    actualTime.getDate() + 1,
    0,
    0,
    0
  );
  const remainingTime = endOfDay.getTime() - actualTime.getTime();
  setTimeout(() => {
    console.log("The end of the current day has come");
    // localStorage.removeItem("requestResults");
    // localStorage.removeItem("exchangeRates");
    removeFromCache("requestResults");
    removeFromCache("exchangeRates");
  }, remainingTime);
};

export default function CurrencyMenu(props) {
  const [listOption, setListOption] = useState(currencyList[0].value);
  const [requestResults, setRequestResults] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(false);

  //chunks of array items
  const [chunkedRates, setChunkedRates] = useState([]);
  const [loadedCurrencyRates, setLoadedCurrencyRates] = useState([]);

  useEffect(async () => {
    if (!readFromCache("exchangeRates") || !readFromCache("requestResults")) {
      console.log("rates not found in local storage");

      for (let i in currencyList) {
        for (let j in currencyList) {
          if (currencyList[i].value !== currencyList[j].value) {
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

      //saving the api request formats in local storage
      writeToCache("requestResults", requestResults);

      //saving the exchange rates in local storage
      writeToCache("exchangeRates", exchangeRates);
    } else {
      console.log("getting exchangeRates data from local storage");
      const storageRequestResults = readFromCache("exchangeRates");

      for (let i in storageRequestResults) {
        setLoading(true);
        const resultCurrency = storageRequestResults[i];
        exchangeRates.push(resultCurrency);
      }
    }

    //remove the rates from local storage at the end of the day
    clearLocalStorage();

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
        setLoadedCurrencyRates(chunkedRates[i]);
      }
    }
  }, [listOption]);

  return (
    <div>
      <Select
        options={currencyList}
        value={currencyList.find((obj) => obj.value === listOption)}
        onChange={handleCurrencyChange}
        className="currency-select"
      />

      <div className="rates-output">
        {loading ? (
          <Loader />
        ) : (
          <Container className="rates-container">
            <Row>
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
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}
