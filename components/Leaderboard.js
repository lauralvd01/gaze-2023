import ComputeCurrentDegree from "@/usefultools/ComputeCurrentDegrees";
import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    const LogDegrees = async () => {
      const degrees = await ComputeCurrentDegree();
      setDegrees(degrees);
    };
    LogDegrees();
    console.log("degrees successfully set");
    console.log("degrees,", degrees);
  }, []);

  //   const LogDegrees = async () => {
  //     const degrees = await ComputeCurrentDegree();
  //     console.log(degrees);
  //   };

  return (
    <div style={{ backgroundColor: "#cdb4c4" }}>
      {degrees == []
        ? "Fetching degrees ..."
        : degrees.map((degree) => {
            return (
              <div key={degree.username}>
                {degree.username} : {degree.degree}
              </div>
            );
          })}
    </div>
  );
};

export default Leaderboard;
