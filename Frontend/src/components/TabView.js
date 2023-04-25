import React from "react";
import Alerts from "./Alerts";
import Stocks from "./Stocks";

const TabView = ({stockData, setStockData}) => {
  return (
    <div className="tab-container">
      <ul className="nav nav-tabs">
        <li className="active">
          <a data-toggle="tab" href="#alerts">
            Alerts
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#stocks">
            Stocks
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div id="alerts" className="tab-pane fade in active">
            <Alerts stockData={stockData} setStockData={setStockData}/>
        </div>
        <div id="stocks" className="tab-pane fade">
            <Stocks stockData={stockData} />
        </div>
      </div>
    </div>
  );
};

export default TabView;
