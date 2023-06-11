// NB : cette page ne sert a r en fait

import Link from "next/link";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function TestPage() {
  //   const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // retrieve events
    supabase
      .from("event")
      .select("*")
      .then((data) => {
        console.log("data", data);
        setEvents(data.data);
      });
  }, []);

  return (
    <ul>
      {events.length !== 0
        ? events.map((post) => (
            <li key={post.id}>
              <Link
                href={{
                  pathname: "/events/[slug]",
                  query: { slug: post.id },
                }}
              >
                {post.title} - {post.participants}
              </Link>
            </li>
          ))
        : "Fetching ..."}
    </ul>
  );
}
