import React from "react";

const Stocks = ({ stockData }) => {
  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {stockData &&
          stockData.current_prices &&
          Object.entries(stockData.current_prices).map(([ticker, price], i) => (
            <tr key={i}>
                <td>{ticker}</td>
                <td>${price}</td>
                <td><span className={"has-text-"+((stockData.change_prices[ticker]>0)?"success":"danger")}>{String(stockData.change_prices[ticker]).substring(0,5)}</span></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Stocks;
