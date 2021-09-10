import React from "react";
import CurrencyMenu from "../components/CurrencyMenu";

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
