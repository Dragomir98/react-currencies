import React from "react";
import { Card, Col } from "react-bootstrap";

const CurrencyGroup = ({ arr, option, filterStatement, groupId }) => {
  return (
    <Col
      lg={4}
      md={6}
      sm={6}
      xs={12}
      className={`mx-auto ${
        arr.filter(filterStatement).length < 1 && "d-none"
      }`}
    >
      {arr.filter(filterStatement).length >= 1 && (
        <Card className="my-3 border border-secondary">
          <Card.Header className="text-center bg-secondary text-white">
            Group {groupId}:
          </Card.Header>
          <Card.Body className="text-center">
            <div>
              {arr.filter(filterStatement).map((rate) => (
                <div key={rate[1]}>
                  {option}-{rate[0].toUpperCase()}: {rate[1].toFixed(1)}
                </div>
              ))}
            </div>
            <Card.Subtitle className="mt-2 text-center">
              Count: {arr.filter(filterStatement).length}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};

export default CurrencyGroup;
