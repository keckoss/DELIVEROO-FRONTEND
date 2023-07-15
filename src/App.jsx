import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Shop from "./components/Shop";
import Meals from "./components/Meals";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--deliveroo-backend--54hcj7vln9rf.code.run/"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <Header />
      </div>
      <Shop data={data} />
      <Meals data={data} />
    </div>
  );
}

export default App;
