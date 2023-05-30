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
import { DelayedDate } from "@/usefultools/MillisDateConversion";

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
    RetrieveUsers().then((result) => {
      setUsers(result);
      Promise.all(
        result.map(async (user) => {
          const rColor = Math.floor(Math.random() * 255);
          const gColor = Math.floor(Math.random() * 255);
          const bColor = Math.floor(Math.random() * 255);
          const data = await Promise.all(
            [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(async (m) => {
              const result = await ComputeDegree(
                user.user_id,
                Date.now() - 5 * m * 1000 * 60
              );
              return result;
            })
          );
          // Retrieve the username of the user
          const { data: username } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user.user_id)
            .single();

          return {
            label: username.username,
            data: data,
            borderColor: `rgba(${rColor}, ${gColor}, ${bColor} , 1)`,
            backgroundColor: `rgba(${rColor}, ${gColor}, ${bColor} , .2)`,
          };
        })
      ).then((datasets) => {
        setData({
          labels: [
            "50 minutes ago",
            "45 minutes ago",
            "40 minutes ago",
            "35 minutes ago",
            "30 minutes ago",
            "25 minutes ago",
            "20 minutes ago",
            "15 minutes ago",
            "10 minutes ago",
            "5 minutes ago",
            "Now",
          ],
          datasets: datasets,
        });
      });
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
      <button
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
      </button>
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
