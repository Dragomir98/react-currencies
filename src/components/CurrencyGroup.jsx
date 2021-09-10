import React from "react";
import { Card, Col } from "react-bootstrap";

const CurrencyGroup = ({ arr, option, filterStatement, groupId }) => {
  return (
    <Col
      lg={4}
      sm={6}
      xs={12}
      className={`mx-auto ${
        arr.filter(filterStatement).length < 1 && "d-none"
      }`}
    >
      {arr.filter(filterStatement).length >= 1 && (
        <Card className="my-3">
          <Card.Header>Group {groupId}:</Card.Header>
          <Card.Body>
            <div>
              {arr.filter(filterStatement).map((rate) => (
                <div key={rate[1]}>
                  {option}-{rate[0].toUpperCase()}: {rate[1]}
                </div>
              ))}
            </div>
            <Card.Subtitle className="mt-2">
              Count: {arr.filter(filterStatement).length}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};

export default CurrencyGroup;
