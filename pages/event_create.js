import { uuidv4 } from "@/usefultools/generalTools.js";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";

import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import {
  DelayedDate,
  MillisToDate,
  DateTomillis,
} from "@/usefultools/MillisDateConversion";

const Event = () => {
  let begining, hourBegining, end, hourEnd, title, details;
  let participantBool = true;
  const userSession = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting ...");
    // Transforming the date and hour into a timestamp
    let beginingTimestamp = new Date(
      begining + "T" + hourBegining + ":00"
    ).getTime();
    beginingTimestamp = DelayedDate(MillisToDate(beginingTimestamp), 120);
    let endTimestamp = new Date(end + "T" + hourEnd + ":00").getTime();
    endTimestamp = DelayedDate(MillisToDate(endTimestamp), 120);
    console.log(beginingTimestamp);
    console.log(endTimestamp);

    const eventId = uuidv4();

    console.log({
      id: eventId,
      title,
      begining: beginingTimestamp,
      end: endTimestamp,
      details,
      participants: participantBool ? 1 : 0,
      author: userSession.id,
    });

    // Update the events table
    await supabase
      .from("event")
      .insert({
        id: eventId,
        title,
        begining: beginingTimestamp,
        end: endTimestamp,
        details,
        participants: participantBool ? 1 : 0,
        author: userSession.id,
      })
      .then(() => {
        console.log("inserted event person into the database");
      })
      .catch((error) => {
        console.log(error);
      });

    // Insert row to table participants
    if (participantBool) {
      await supabase
        .from("participants")
        .insert({
          participant: userSession.id,
          event: eventId,
        })
        .then(() => {
          console.log("updated participants");
        });
    }
  };

  return (
    <Layout>
      <Head>
        <title>GazeEDIfication</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
      </Head>
      <main>
        <Link href="/">
          <button type="button" className="btn inner_button m-3 left">
            Retour
          </button>
        </Link>

        <div className="container">
          <div style={localStyles.container}>
            <form style={localStyles.container} action="form" method="post">
              <div
                className="form-group row"
                style={localStyles.fieldContainer}
              >
                {/* <label
                  htmlFor="inputDay"
                  className="col-m-5 col-form-label modal-label"
                >
                  Jour de l évènement
                </label>
                <div className="col-sm-5 modal-input">
                  <select
                    id="inputDay"
                    className="form-select bierasse_form"
                    aria-label="Default select example"
                  >
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                    <option value="Dimanche">Dimanche</option>
                  </select>
                </div> */}
              </div>

              <div
                className="form-group row"
                style={localStyles.fieldContainer}
              >
                <label
                  htmlFor="inputEventBegining"
                  className="col-m-2 col-form-label modal-label"
                >
                  Début de l&apos;évènement
                </label>
                <div className="col-sm-8 modal-input">
                  <input
                    type="date"
                    pattern="[0-9,.]+"
                    className="form-control"
                    id="inputEventBegining"
                    onChange={(input) => {
                      begining = input.target.value;
                      console.log(begining);
                      // document
                      //   .getElementById("inputEventBegining")
                      //   .setAttribute("value", begining);
                    }}
                  ></input>
                </div>
              </div>

              <div
                className="form-group row"
                style={localStyles.fieldContainer}
              >
                <div className="col-m-30 modal-input">
                  <label
                    htmlFor="inputEventHourBegining"
                    className="col-sm-25 col-form-label modal-label"
                  >
                    Heure de début
                  </label>
                  <input
                    type="time"
                    pattern="[0-9,.]+"
                    className="form-control"
                    id="inputEventHourBegining"
                    min={"00:00"}
                    max={"23:59"}
                    onChange={(input) => {
                      hourBegining = input.target.value;
                      console.log(hourBegining);
                      // document
                      //   .getElementById("inputEventHourBegining")
                      //   .setAttribute("value", hourBegining);
                    }}
                  ></input>
                </div>
              </div>

              <div
                className="form-group row"
                style={localStyles.fieldContainer}
              >
                <label
                  htmlFor="inputEventBegining"
                  className="col-m-2 col-form-label modal-label"
                >
                  Fin de l&apos;évènement
                </label>
                <div className="col-sm-8 modal-input">
                  <input
                    type="date"
                    pattern="[0-9,.]+"
                    className="form-control"
                    id="inputEventEnd"
                    onChange={(input) => {
                      end = input.target.value;
                      console.log(end);
                      // document
                      //   .getElementById("inputEventEnd")
                      //   .setAttribute("value", end);
                    }}
                  ></input>
                </div>
              </div>

              <div
                className="form-group row"
                style={localStyles.fieldContainer}
              >
                <div className="col-m-30 modal-input">
                  <label
                    htmlFor="inputEventHourEnd"
                    className="col-sm-25 col-form-label modal-label"
                  >
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    pattern="[0-9,.]+"
                    className="form-control"
                    id="inputEventHourEnd"
                    min={"00:00"}
                    max={"23:59"}
                    onChange={(input) => {
                      hourEnd = input.target.value;
                      console.log(hourEnd);
                      // document
                      //   .getElementById("inputEventHourEnd")
                      //   .setAttribute("value", hourEnd);
                    }}
                  ></input>
                </div>
              </div>

              <div
                className="form-group row"
                style={localStyles.fieldContainer}
              >
                <div className="col-sm-25 modal-input">
                  <input
                    type="text"
                    pattern="[0-9,.]+"
                    className="form-control"
                    id="inputEventTitle"
                    placeholder="Titre de l'évènement"
                    onChange={(input) => {
                      title = input.target.value;
                      console.log(title);
                      // document
                      //   .getElementById("inputEventTitle")
                      //   .setAttribute("value", title);
                    }}
                  ></input>
                </div>
              </div>

              <div
                className="form-group row"
                style={localStyles.fieldContainer}
              >
                <div className="col-sm-25 modal-input">
                  <input
                    type="text"
                    pattern="[0-9,.]+"
                    className="form-control"
                    id="inputEventDetails"
                    placeholder="Détails (organisateur, lieu, dresscode, etc.)"
                    onChange={(input) => {
                      details = input.target.value;
                      console.log(details);
                      // document
                      //   .getElementById("inputEventDetails")
                      //   .setAttribute("value", details);
                    }}
                  ></input>
                </div>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexChecked"
                  defaultChecked={true}
                  onChange={(input) => {
                    participantBool = input.target.checked;
                    console.log("participantBool", participantBool);
                  }}
                ></input>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Je participe
                </label>
              </div>

              <button className="btn btn-primary" onClick={handleSubmit}>
                Valider
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

const localStyles = {
  container: {
    minHeight: "70vh",
    minWidth: "900px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  fieldContainer: {
    marginBottom: 2,
  },
  label: {
    display: "flex",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  result: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 20,
    borderRadius: 10,
    minHeight: "10vh",
    minWidth: "10vw",
  },
};

export default Event;
