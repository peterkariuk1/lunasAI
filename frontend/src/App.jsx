import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [dbData, setDbData] = useState({});

  async function fetchData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/patient");

      setDbData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <>
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        {dbData.data?.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.id}</p>
              <p>{data.created_at}</p>
              <p>{data.age}</p>
              <p>{data.gender}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
