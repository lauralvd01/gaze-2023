import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChartOfUsers } from "../chart2";

export default function Chart() {
  const [userIds, setUserIds] = useState([]);
  const [chart, setChart] = useState(null);
  const router = useRouter();

  const RetrieveUsers = async () => {
    console.log("RetrieveUsers");
    console.log("slug", router.query.slug);
    try {
      const { data: users, error } = await supabase
        .from("participants")
        .select("participant")
        .eq("event", router.query.slug);
      if (error) {
        console.error("Error retrieving users:", error);
        // Handle the error here (e.g., display an error message)
        return null;
      }
      console.log("users", users);
      setUserIds(users.map((user) => user.participant));
      return users;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("useEffect_____________");
    RetrieveUsers().then((result) => {
      setUserIds(result.map((user) => user.participant));
      console.log(result.map((user) => user.participant));
      console.log("_____");
      ChartOfUsers(userIds).then((result) => {
        setChart(result);
      });
    });
  }, []);

  return (
    <div>
      {userIds ? "users fetched !" : "Fetching ..."}
      {chart ? chart : "Fetching chart ..."}
    </div>
  );
}
