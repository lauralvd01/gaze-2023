import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

function Posts({ posts }) {
  // TODO : remplacer le slug par l'id de l'event --> check
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // NB : c'est pas une bonne façon de faire comme ça mais pg
    const RetrieveEvents = async () => {
      const { data: events, error } = await supabase
        .from("event")
        .select("id,title,participants");

      if (error) {
        console.error("Error retrieving events:", error);
        return;
      }
      setEvents(events);
    };
    RetrieveEvents();
    console.log("events retrieved");
  }, []);

  const addSlugToEvent = (event) => {
    event.slug = event.id;
    return event;
  };

  return (
    <ul>
      <button onClick={() => console.log(events)}>aa</button>
      {events.length === 0
        ? "Fetching events ..."
        : events.map(addSlugToEvent).map((post) => (
            <li key={post.id}>
              <Link href={`/events/${encodeURIComponent(post.slug)}`}>
                <b>{post.title}</b> - {post.participants} participants
              </Link>
            </li>
          ))}
    </ul>
  );
}

export default Posts;
