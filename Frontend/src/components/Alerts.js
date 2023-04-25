import React from "react";
import { BACKEND_URL } from "../App";
const frequencyMap={
    '1': 'Minutely',
    '60': 'Hourly',
    '1440': 'Daily'
}

const Alerts = ({ stockData, setStockData }) => {
  const deleteAlert = async (id) => {
    try {
      const res = await fetch(BACKEND_URL + "delete_alert/" + id);
      if (res && res.ok) {
        console.log(res);
        const response = await res.json();
        console.log(response);
        setStockData(response)
      }
    } catch (e) {
      console.log("Error ", e);
    }
  };
  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Threshold</th>
          <th>Alert Type</th>
          <th>Frequency</th>
          <th>Contact</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="stocks-table-body">
        {stockData && stockData.alerts && stockData.alerts.map((alert, i) => (
          <tr key={alert.id}>
            <td>{alert.ticker}</td>
            <td>
              {alert.threshold_type === "1" ? "> " : "< "}${alert.threshold}
            </td>
            <td>{alert.notification_method}</td>
            <td>{frequencyMap[alert.frequency]}</td>
            <td>{alert.contact_id.substring(0, 5)}******</td>
            <td>
              <button className="btn btn-danger" onClick={()=>deleteAlert(alert.id)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Alerts;
