import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Tab, Tabs, Container } from "react-bootstrap";
import Select from "react-select";
import {
  apiRequest,
  clearLocalStorage,
  currencyList,
  difference,
  readFromCache,
  removeFromCache,
  writeToCache,
} from "../pages/Home";
import CurrencyGroup from "./CurrencyGroup";
import CurrentRates from "./CurrentRates";
import Loader from "./Loader";

export default function CurrencyMenu() {
  const [listOption, setListOption] = useState(currencyList[0].value);
  const [requestResults, setRequestResults] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(false);

  //split items from request into chunks
  const [chunkedRates, setChunkedRates] = useState([]);
  const [loadedCurrencyRates, setLoadedCurrencyRates] = useState([]);

  //local storage data:
  const [storageRates, setStorageRates] = useState([]);
  const [storageRequestResults, setStorageRequestResults] = useState([]);
  const [absoluteValues, setAbsoluteValues] = useState([]);

  const [renderedState, setRenderedState] = useState([]);

  useEffect(async () => {
    if (!readFromCache("exchangeRates") || !readFromCache("requestResults")) {
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

  // rates for current selected currency
  const handleCurrencyChange = (e) => {
    const newValue = e.value;
    setListOption(newValue);
    removeFromCache("storageRates");
    removeFromCache("storageCurrency");
    removeFromCache("absoluteValues");
    setStorageRates([]);
    setStorageRequestResults([]);
    setAbsoluteValues([]);
  };

  useEffect(async () => {
    for (let i in currencyList) {
      if (listOption === currencyList[i].value) {
        setLoadedCurrencyRates(chunkedRates[i]);
      }
    }

    if (!readFromCache("requestResults") || !readFromCache("storageCurrency")) {
      setLoading(true);
      const requestsFromStorage = readFromCache("requestResults");
      for (let i in requestsFromStorage) {
        if (requestsFromStorage[i][0].includes(listOption.toLowerCase())) {
          storageRates.push(requestsFromStorage[i]);
        }
      }

      let storageId = 1;
      for (let i in storageRates) {
        const storageRequest = await axios
          .get(storageRates[i][0])
          .then((res) => res.data);
        const storageCurrency = [Object.values(storageRequest)[1]].concat(
          storageRates[i][1],
          storageRates[i][2],
          storageId
        );
        storageRequestResults.push(storageCurrency);
        storageId++;
      }
      writeToCache("storageCurrency", storageRequestResults);
      setLoading(false);
    } else {
      const storageCurrency = readFromCache("storageCurrency");
      setStorageRequestResults(storageCurrency);
    }

    if (!readFromCache("absoluteValues")) {
      for (let i = 0; i < storageRequestResults.length; i++) {
        let currentVal;
        for (let j = i + 1; j < storageRequestResults.length; j++) {
          if (
            difference(
              storageRequestResults[i][0].toFixed(1),
              storageRequestResults[j][0].toFixed(1)
            ) <= 0.5
          ) {
            currentVal = storageRequestResults[i];
          }
        }
        if (Boolean(currentVal)) absoluteValues.push(storageRequestResults[i]);
      }
      writeToCache("absoluteValues", absoluteValues);
      setAbsoluteValues(absoluteValues);
    } else {
      const absoluteValues = readFromCache("absoluteValues");
      setAbsoluteValues(absoluteValues);
    }

    setRenderedState((prevState) => ({ ...prevState, absoluteValues }));
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
          <Tabs
            defaultActiveKey="rates1"
            className="my-4 justify-content-center"
          >
            <Tab eventKey="rates1" title="Exchange rates for current currency">
              <Container>
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
            </Tab>
            <Tab eventKey="rates2" title="All possible rates">
              <Container>
                <CurrentRates
                  values={absoluteValues}
                  selectedCurrency={listOption}
                />
              </Container>
            </Tab>
          </Tabs>
        )}
      </div>
    </div>
  );
}
