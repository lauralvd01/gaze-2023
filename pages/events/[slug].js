// 1. Import controllers, elements, etc. which you'll use
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
// Il faut que cette ligne soit après le register
import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";
import { chart_options } from "@/usefultools/usefulVariables";

import { supabase } from "@/lib/supabaseClient";
import ComputeDegreesOfUsers from "@/usefultools/ComputeDegreesOfUsers";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [userIds, setUserIds] = useState([]);
  const [data, setData] = useState(); // Les données du chart

  useEffect(() => {
    supabase
      .from("participants")
      .select("participant")
      .eq("event", router.query.slug)
      .then((data) => {
        console.log("data", data.data);
        let id_objects = data.data.map((obj) => obj.participant);
        setUserIds(id_objects);
        console.log("userIds", userIds);
        console.log("idobj", id_objects);

        ComputeDegreesOfUsers(id_objects).then((result) => {
          setData(result);
        });
      });
  }, []);

  const router = useRouter();
  return (
    <div>
      {/* <ul>
        {userIds.length === 0
          ? "Fetching ..."
          : userIds.map((userId) => <li key={userId}>{userId}</li>)}
      </ul> */}
      <Link href="/">
        <button type="button" className="btn chart_button m-2">
          Retour
        </button>
      </Link>
      {data ? (
        <Line data={data} width={100} height={40} options={chart_options} />
      ) : (
        "Fetching data ..."
      )}{" "}

    </div>
  );
}
