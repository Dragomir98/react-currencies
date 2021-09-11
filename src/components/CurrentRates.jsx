import React from "react";
import { Card } from "react-bootstrap";

export default function CurrentRates({ values, selectedCurrency }) {
  return (
    <Card className="currency-output mt-3 border border-secondary">
      <Card.Title className="text-center bg-secondary text-white p-2 m-0">
        All rates that include{" "}
        <strong className="fw-bold">{selectedCurrency}</strong>
      </Card.Title>
      <Card.Body className="text-center">
        {values.map((item) => (
          <div key={Math.random() + item[3]}>
            {item[1].toUpperCase()}-{item[2].toUpperCase()}:{" "}
            {item[0].toFixed(1)}
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
