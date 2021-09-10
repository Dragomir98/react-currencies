import React from "react";
import CurrencyMenu from "../components/CurrencyMenu";

export const writeToCache = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const readFromCache = (key) =>
  JSON.parse(localStorage.getItem(key)) || null;

export const removeFromCache = (key) => localStorage.removeItem(key);

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
