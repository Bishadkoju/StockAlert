import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../App";

const AlertForm = ({ stockData, setStockData }) => {
  const [tickerList, setTickerList] = useState([]);
  const [ticker, setTicker] = useState("");
  const [threshold, setThreshold] = useState("");
  const [thresholdType, setThresholdType] = useState("1");
  const [frequency, setFrequency] = useState("1");
  const [contactId, setContactId] = useState("");
  const [notificationMethod, setNotificationMethod] = useState("email");

  useEffect(() => {
    if (stockData && stockData.current_prices) {
      setTickerList(Object.keys(stockData.current_prices));
      if (ticker === "") {
        setTicker(Object.keys(stockData.current_prices)[0]);
      }
    }
  }, [stockData]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("ticker", ticker);
    formData.append("threshold", threshold);
    formData.append("threshold_type", thresholdType);
    formData.append("frequency", frequency);
    formData.append("contact_id", contactId);
    formData.append("notification_method", notificationMethod);

    try {
      const res = await fetch(BACKEND_URL + "add_alert", {
        method: "POST",
        body: formData,
      });
      console.log(res);
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        setStockData(response);
      }
      // handle successful response
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="ticker">Stock symbol:</label>
        <select
          id="ticker"
          name="ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        >
          {tickerList.map((ticker, index) => (
            <option name={ticker} key={index}>
              {ticker}
            </option>
          ))}
        </select>

        <label htmlFor="threshold">Price threshold:</label>
        <input
          type="number"
          step="0.01"
          id="threshold"
          name="threshold"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          required
        />

        <label htmlFor="thresholdType">Threshold Type:</label>
        <select
          id="thresholdType"
          name="thresholdType"
          value={thresholdType}
          onChange={(e) => setThresholdType(e.target.value)}
        >
          <option value="1">Greater Than</option>
          <option value="-1">Lower Than</option>
        </select>

        <label htmlFor="frequency">Check frequency:</label>
        <select
          id="frequency"
          name="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="1">Every Minute</option>
          <option value="60">Every Hour</option>
          <option value="1440">Every Day</option>
        </select>

        <label htmlFor="contactId">Contact Id:</label>
        <input
          type="text"
          id="contactId"
          name="contactId"
          value={contactId}
          onChange={(e) => setContactId(e.target.value)}
          required
          placeholder="Email or Phone Number"
        />

        <label htmlFor="notificationMethod">Notification Method:</label>
        <select
          id="notificationMethod"
          name="notificationMethod"
          value={notificationMethod}
          onChange={(e) => setNotificationMethod(e.target.value)}
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>

        <input type="submit" value="Create alert" />
      </form>
    </div>
  );
};

export default AlertForm;
