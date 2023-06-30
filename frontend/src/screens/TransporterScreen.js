import axios from "axios";
import React, { useEffect, useState } from "react";
import TransporterList from "../components/TransporterList";

const TransporterComponent = () => {
  const [transporters, setTransporters] = useState([]);

  useEffect(() => {
    const fetchTransporters = async () => {
      try {
        const response = await axios.get("/api/transporters");
        setTransporters(response.data);
      } catch (error) {
        console.error("Error fetching transporters:", error);
      }
    };

    fetchTransporters();
  }, []);

  return (
    <div className="mt-5">
      <TransporterList transporters={transporters} />
    </div>
  );
};

export default TransporterComponent;
