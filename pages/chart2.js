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

import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

import ComputeDegree from "@/usefultools/ComputeDegree";
import ComputeAllDegree from "@/usefultools/ComputeAllDegrees";
import { DelayedDate } from "@/usefultools/MillisDateConversion";
import Link from "next/link";

const Chart = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState();

  const RetrieveUsers = async () => {
    const { data: users } = await supabase
      .from("drink_history_v2")
      .select("user_id");
    return users;
  };
  // Retrieve the user ids that drank in the table drink_history_v2
  try {
  } catch (error) {
    console.log(error.message);
  }
  useEffect(() => {
    console.log("useEffect");
    ComputeAllDegree().then((result) => {
      setData(result);
    });
  }, []);

  const sampleData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "One",
        data: [10, 20, 15, 25, 30, 22],
        borderColor: "rgba(47, 79, 79, 1)",
        backgroundColor: "rgba(47, 79, 79, .2)",
      },
      {
        label: "Two",
        data: [5, 10, 15, 12, 39, 14],
        borderColor: "rgba(190, 99, 88, 1)",
        backgroundColor: "rgba(190, 99, 88, .2)",
      },
    ],
  };

  // Chart configuration
  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      line: {
        tension: 0.2, //0  disables bezier curves askip
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: true,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div>
      {/* <button
        onClick={() => {
          console.log("users", users);
          console.log("data", data);
          console.log(
            "data 0",
            data.datasets[0].data[0].then((result) => result)
          );
          console.log(
            "data 0",
            data.datasets[0].data[0].then((result) => console.log(result))
          );
          console.log("sampleData", sampleData);
        }}
      >
        coo
      </button> */}
      <Link href="/">
        <button type="button" className="btn chart_button m-2">
          Retour
        </button>
      </Link>
      {null}
      {data ? (
        <Line data={data} width={100} height={40} options={options} />
      ) : (
        "Fetching data ..."
      )}
    </div>
  );
};

export default Chart;
