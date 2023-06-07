import Image from "next/image";
import ComputeCurrentDegree from "@/usefultools/ComputeCurrentDegrees";
import { useState, useEffect } from "react";

export default function Leaderboard({leader_list}){
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

    return(
        <div className="leader_box">
            <h1>Le classement des champions :</h1>
            <ul class="list-group">
                {leader_list.map((pers, index) => 
                    <li class="list-group-item">
                        {index == 0?(
                            <>
                                <Image
                                    src="/../public/medalGold.png"
                                    alt="Bootstrap"
                                    className="medalImage"
                                    width="32"
                                    height="30"
                                />
                            </>
                        ):(index == 1?(
                            <>
                                <Image
                                    src="/../public/medalSilver.png"
                                    alt="Bootstrap"
                                    className="medalImage"
                                    width="32"
                                    height="30"
                                />
                            </>
                        ):(index == 2?(
                            <>
                                <Image
                                    src="/../public/medalBronze.png"
                                    alt="Bootstrap"
                                    className="medalImage"
                                    width="32"
                                    height="30"
                                />
                            </>
                        ):(
                            <>
                            </>
                        ))
                        )}
  
                        {pers}
                    </li>
                )}
            </ul>
        </div>
    )
}



// const Leaderboard = () => {
//   const [degrees, setDegrees] = useState([]);

//   useEffect(() => {
//     const LogDegrees = async () => {
//       const degrees = await ComputeCurrentDegree();
//       setDegrees(degrees);
//     };
//     LogDegrees();
//     console.log("degrees successfully set");
//     console.log("degrees,", degrees);
//   }, []);

//   return (
//     <div style={{ backgroundColor: "#cdb4c4" }}>
//       {degrees == []
//         ? "Fetching degrees ..."
//         : degrees.map((degree) => {
//             return (
//               <div key={degree.username}>
//                 {degree.username} : {degree.degree}
//               </div>
//             );
//           })}
//     </div>
//   );
// };

// export default Leaderboard;