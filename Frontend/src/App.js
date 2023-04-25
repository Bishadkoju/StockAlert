import "./App.css";
import React, { useEffect, useState } from "react";
import AlertForm from "./components/AlertForm";
import TabView from "./components/TabView";
import logo from './stock.png'
export const BACKEND_URL = "http://localhost:8000/"

function App() {
  const [stockData, setStockData] = useState({})
  const fetchStockData = async() => {
    const res = await(fetch(BACKEND_URL+'tick'));
    if(res){
      const res2 = await(fetch(BACKEND_URL+'get_data'))
      if(res2.status === 200){
      const response = await(res2.json())
      console.log(response)
      setStockData(response)
      }
    }

  }
  useEffect(()=>{
    fetchStockData()
    const interval = setInterval(()=> fetchStockData(), 60000);
    return ()=> clearInterval(interval)
  } , [])

  return (
    <div className="App">
      <h1 className="title">Stock Price Alert</h1>
      <img id="logo" src={logo} alt="Logo" />
      <div className="container">
        <AlertForm stockData={stockData} setStockData={setStockData}/>
        <TabView stockData={stockData} setStockData={setStockData}/>
      </div>
    </div>
  );
}

export default App;
