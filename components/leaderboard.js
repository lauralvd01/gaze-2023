import Image from "next/image";
import ComputeCurrentDegree from "@/usefultools/ComputeCurrentDegree";
import { useState, useEffect } from "react";

export default function Leaderboard() {
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

  return (
    <div className="leader_box">
      <h1>Le classement des champions :</h1>
      <ul className="list-group">
        {degrees == [] ? (
          <li className="list-group-item">
            <p>Tout le monde est sobre, on se fait chier putain...</p>
          </li>
        ) : (
          degrees
            .filter((obj) => obj.degree != 0)
            .map((degree, index) => {
              return (
                <li key={index} className="list-group-item">
                  {index == 0 ? (
                    <div key={0}>
                      <Image
                        src="/../public/medalGold.png"
                        alt="Bootstrap"
                        className="medalImage"
                        width="32"
                        height="30"
                      />
                    </div>
                  ) : index == 1 ? (
                    <div key={1}>
                      <Image
                        src="/../public/medalSilver.png"
                        alt="Bootstrap"
                        className="medalImage"
                        width="32"
                        height="30"
                      />
                    </div>
                  ) : index == 2 ? (
                    <div key={2}>
                      <Image
                        src="/../public/medalBronze.png"
                        alt="Bootstrap"
                        className="medalImage"
                        width="32"
                        height="30"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {degree.username} avec {degree.degree}g/L
                </li>
              );
            })
        )}
      </ul>
    </div>
  );
}
