import React from "react";

const CurrencyGroup = ({ arr, option, filterStatement, groupId }) => {
  return (
    arr.filter(filterStatement).length >= 1 && (
      <div className="rates-group">
        <span>Group{groupId}</span>
        {arr.filter(filterStatement).map((rate) => (
          <div key={rate[1]}>
            {option}-{rate[0].toUpperCase()}: {rate[1]}
          </div>
        ))}
        <span>Count: {arr.filter(filterStatement).length}</span>
        <hr />
      </div>
    )
  );
};

export default CurrencyGroup;
