import React from "react";
import CurrencyMenu from "../components/CurrencyMenu";

export const currencyList = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
  { value: "CHF", label: "CHF" },
  { value: "NZD", label: "NZD" },
  { value: "BGN", label: "BGN" },
];

export const writeToCache = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const readFromCache = (key) =>
  JSON.parse(localStorage.getItem(key)) || null;

export const removeFromCache = (key) => localStorage.removeItem(key);

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

    removeFromCache("requestResults");
    removeFromCache("exchangeRates");
    removeFromCache("storageRates");
    removeFromCache("storageCurrency");
  }, remainingTime);
};

export const apiRequest = (apiVersion, startCurrency, endCurrency) => {
  return [
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/latest/currencies/${startCurrency}/${endCurrency}.json`,
    startCurrency,
    endCurrency,
  ];
};

export const difference = (firstNum, secondNum) =>
  firstNum > secondNum
    ? Math.abs(firstNum - secondNum)
    : Math.abs(secondNum - firstNum);

export default function Home() {
  return (
    <div>
      <h2 className="py-4 text-center">
        Choose a currency to view all conversion rates
      </h2>

      <CurrencyMenu />
    </div>
  );
}
