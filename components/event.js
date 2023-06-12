import { supabase } from "@/lib/supabaseClient";
import { handleSave } from "@/pages/index.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { uuidv4 } from "@/usefultools/generalTools";

const fullDate = (date) => {
  return date.split(" ")[0];
};
const jourMois = (date) => {
  return fullDate(date).split("-")[2] + "/" + fullDate(date).split("-")[1];
};
const heure = (date) => {
  // split the string "2021-06-01 18:00:00+00:00" into "18" and "00"

  return date.split(":")[1] + "h" + date.split(":")[2];
};

// The date is not formatted the same way on Laura's computer and on mine (Simon) -> this should fix the problem
const dateFormattingFix = (date) => {
  if (date.includes("T")) {
    date = date.split("T")[0] + " " + date.split("T")[1];
  }
  if (date.includes("+")) {
    date = date.split("+")[0];
  }
  return date.replace(" ", " :");
};

// ATTENTION gros pb si deux personnes rejoignent ou quittent un event en même temps !! mais bon flemme de fix
export default function Event({ events, userId }) {
  const [eventsThatIJoined, setEventsThatIJoined] = useState([]);
  const [newEventsThatIJoined, setNewEventsThatIJoined] = useState([]);
  const [newEventsThatILeft, setNewEventsThatILeft] = useState([]);
  const [eventsParticipants, setEventsParticipants] = useState([]);
  const userSession = useUser();

  useEffect(() => {
    if (userSession) {
      supabase
        .from("participants")
        .select("event,participant")
        .eq("participant", userSession.id)
        .then((result) => {
          // console.log(result.data.map((event) => event.event));
          setEventsThatIJoined(result.data.map((event) => event.event));
        });
    }
  }, [userSession]);

  useEffect(() => {
    setEventsParticipants(
      events.map((event) => {
        return { id: event.id, participants: event.participants };
      })
    );
    console.log(
      "event participants",
      events.map((event) => {
        return { id: event.id, participants: event.participants };
      })
    );
  }, [events]);

  return (
    <div className="container">
      <div className="row beer_row">
        {events.map((event) => (
          <div key={event.id} className="col col-lg-2 col-6">
            <div className="card beer_card">
              <div className="card-header">
                <h5 className="card-title left">
                  {event.day ? event.day : ""}{" "}
                  {jourMois(dateFormattingFix(event.begining))}
                </h5>
                <h5 className="card-title right">
                  {heure(dateFormattingFix(event.begining))}
                </h5>
              </div>{" "}
              <div className="card-header">
                <h5 className="card-title left">
                  {event.day ? event.day : ""}{" "}
                  {jourMois(dateFormattingFix(event.end))}
                </h5>
                <h5 className="card-title right">
                  {heure(dateFormattingFix(event.end))}
                </h5>
              </div>
              <div className="card-body">
                <h4 className="card-title center">{event.title}</h4>
                <p className="card-text right">
                  Participants :{" "}
                  {/* {console.log("eventsParticipants", eventsParticipants)} */}
                  {eventsParticipants.length === 0
                    ? event.participants
                    : eventsParticipants.find((e) => e.id === event.id)
                        .participants}{" "}
                </p>
              </div>
              <div className="card-footer">
                <button
                  className="btn beer_button m-2"
                  onClick={() => {
                    let detailsMarkup = document.getElementById(
                      event.id + "-details"
                    );
                    if (detailsMarkup.innerHTML === "") {
                      detailsMarkup.innerHTML = event.details;
                    } else {
                      detailsMarkup.innerHTML = "";
                    }
                  }}
                >
                  Détails
                </button>
                <p id={event.id + "-details"} style={{ marginBottom: 0 }}></p>

                <button
                  className="btn beer_button m-2"
                  onClick={() => {
                    // LEAVE EVENT
                    if (eventsThatIJoined.includes(event.id)) {
                      // Remove row from participants
                      supabase
                        .from("participants")
                        .delete()
                        .eq("event", event.id)
                        .eq("participant", userSession.id)
                        .then((result) => {
                          console.log("deleted row");
                          setEventsThatIJoined(
                            eventsThatIJoined.filter((id) => id !== event.id)
                          );
                        });
                      // Decrease the number of participants
                      supabase
                        .from("event")
                        .update({
                          participants:
                            event.participants -
                            (newEventsThatIJoined.includes(event.id) ? 0 : 1),
                        })
                        .eq("id", event.id)
                        .then((result) => {
                          console.log("updated participants amount (-1)");
                        });
                      setEventsParticipants(
                        eventsParticipants.map((e) => {
                          if (e.id === event.id) {
                            return {
                              id: e.id,
                              participants: e.participants - 1,
                            };
                          }
                          return e;
                        })
                      );
                      console.log(
                        "now participants are",
                        eventsParticipants.map((e) => {
                          if (e.id === event.id) {
                            return {
                              id: e.id,
                              participants: e.participants - 1,
                            };
                          }
                          return e;
                        })
                      );
                      setNewEventsThatILeft([...newEventsThatILeft, event.id]);
                      setNewEventsThatIJoined(
                        newEventsThatIJoined.filter((id) => id !== event.id)
                      );
                    }
                    // JOIN EVENT
                    else {
                      // Add row to participants
                      supabase
                        .from("participants")
                        .insert([
                          {
                            id: uuidv4(),
                            event: event.id,
                            participant: userSession.id,
                          },
                        ])
                        .then((result) => {
                          console.log("inserted row");
                          setEventsThatIJoined([
                            ...eventsThatIJoined,
                            event.id,
                          ]);
                        });
                      // Increase the number of participants
                      supabase
                        .from("event")
                        .update({
                          participants:
                            event.participants +
                            (newEventsThatILeft.includes(event.id) ? 0 : 1),
                        })
                        .eq("id", event.id)
                        .then((result) => {
                          console.log("updated participants amount (+1)");
                        });
                      setEventsParticipants(
                        eventsParticipants.map((e) => {
                          if (e.id === event.id) {
                            return {
                              id: e.id,
                              participants: e.participants + 1,
                            };
                          }
                          return e;
                        })
                      );
                      console.log(
                        "now participants are",
                        eventsParticipants.map((e) => {
                          if (e.id === event.id) {
                            return {
                              id: e.id,
                              participants: e.participants + 1,
                            };
                          }
                          return e;
                        })
                      );
                      setNewEventsThatIJoined([
                        ...newEventsThatIJoined,
                        event.id,
                      ]);
                      setNewEventsThatILeft(
                        newEventsThatILeft.filter((id) => id !== event.id)
                      );
                    }
                  }}
                >
                  {eventsThatIJoined.includes(event.id)
                    ? "Quitter"
                    : "Rejoindre"}
                </button>
                <Link
                  href={"/events/" + event.id}
                  className="btn beer_button m-2"
                >
                  Aller
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
