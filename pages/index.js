import { supabase } from "../lib/supabaseClient";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import Layout from "../components/layout";
import Leaderboard from "@/components/leaderboard";
import Event from "@/components/event";
// import Leaderboard as l2 from "@/components/Leaderboard";
import { useUser } from "@supabase/auth-helpers-react";
// Simon
import Form_v2 from "./form_v2.js";
import { use, useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import {
  DateTomillis,
  MillisToDate,
  DelayedDate,
} from "@/usefultools/MillisDateConversion";
import ComputeDegree from "@/usefultools/ComputeDegree";
import Link from "next/link";
import { fontStyle } from "@mui/system";
import BeerBoxes from "@/components/BeerBoxes";
import BeerBoxes2 from "@/components/beerBoxes2";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("beers").select();

  return {
    props: {
      beers: data,
    },
  };
}

export const handleAddPerson = async () => {
  console.log("test");
  await supabase
    .from("drink_history_v2")
    .insert({
      user_id: 4,
      drink_acts: [42, 43],
    })
    .then(() => {
      console.log("inserted drink person into the database");
    });
};
export const handleList_v2 = async () => {
  await supabase
    .from("drink_history_v2")
    .select("*")
    .then((result) => {
      console.log(result.data);
    });
};
export const handleList_acts = async (userId) => {
  await supabase
    .from("drink_act")
    .select("*")
    .then((result) => {
      console.log(result.data);
    });
  ComputeDegree(userId);
  // console.log(new Date());
};

// Given a user id, a beverage and a delay, the following function will upload to the database a row in the drink history
export const handleSave = async (userId) => {
  let delay = document.getElementById("inputTime").value;
  var date = DelayedDate(new Date(), delay);
  var foo = date.getDate;
  let day = foo.call(date);
  foo = date.getMonth;
  let month = foo.call(date);
  foo = date.getFullYear;
  let year = foo.call(date);
  foo = date.getMinutes;
  let minute = foo.call(date);
  foo = date.getHours;
  let hour = foo.call(date);
  foo = date.getSeconds;
  let second = foo.call(date);

  let beverage = document.getElementById("inputDrink").value;
  let drinkAmount = document.getElementById("inputGlassesDrank").value;

  let date_year = month + "/" + day + "/" + year; // ATTENTION JS INDEXE LES MOIS A PARTIR DE ZERO
  let time = hour + ":" + minute + ":" + second;

  const id = uuidv4();
  let newDrink = {
    id,
    drank_at: date,
    beer_name: beverage,
    glasses_amount: drinkAmount,
  };

  await supabase
    .from("drink_act")
    .insert([newDrink])
    .then(() => {
      console.log("inserted drink act into the database");
    });

  console.log("added drink");
  // add newly created drink to drink_history_v2 for user 1
  Update_user(id, userId);
  console.log("simon's drinks :");
  ComputeDegree(userId);
};

export const Update_user = async (id, userId) => {
  try {
    console.log("ici", userId);
    const { data: user_history, error } = await supabase
      .from("drink_history_v2")
      .select()
      .eq("user_id", userId)
      .single();

    console.log("la");

    // console.log(user_history);
    const updated_drink_history = user_history.drink_acts.concat(id); // crochets pour concatener ?
    //console.log(updated_drink_history);
    await supabase
      .from("drink_history_v2")
      .update({ drink_acts: updated_drink_history })
      .match({ user_id: userId }); // ATTENTION : quand on va ajouter des personnes, il faudra pas mettre null en default value mais [] (ce sera fait automatiquement via code mais pas manuellement)
  } catch (error) {
    console.log("no user history found, ask simon", error.message);
  }
};

export default function Home({ beers }) {
  // Events
  const [events, setEvents] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [prefilledBeer, setPrefilledBeer] = useState("Chouffe"); // TODO : set to null
  const userSession = useUser();
  const [username, setUsername] = useState("<Fetching ...>");
  const [currentDegree, setCurrentDegree] = useState(0);
  // Retrieve username
  useEffect(() => {
    if (userSession !== null) {
      async function fetchUsername() {
        const { data: username } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", userSession.id)
          .single();
        setUsername(username.username);
      }
      fetchUsername();
      async function retrieveDegree() {
        const degree = await ComputeDegree(userSession.id);
        setCurrentDegree(Math.round(100 * degree) / 100.0);
      }
      retrieveDegree();
    }
  }, [userSession]);

  // Retrieve events
  useEffect(() => {
    supabase
      .from("event")
      .select("id,title,begining,end,details,participants")
      .then((result) => {
        setEvents(result.data);
        console.log(result.data);
      });
  }, []);

  // <button onClick={handleList}>List drink history in console</button>
  const handleList = () => {
    supabase
      .from("drink_history_v2")
      .select("*")
      .then((result) => {
        console.log(result.data);
      });
  };

  const sampleEvents = [
    {
      title: "Open Chibrat",
      day: "Mercredi",
      begining: "2023-06-07 20:00:00",
      end: "2023-06-08 08:00:00",
      details: "Objectif : défoncer le plafond",
      participants: 24,
    },
    {
      title: "Open Chibrat",
      day: "Mercredi",
      begining: "2023-06-07 20:00:00",
      end: "2023-06-08 08:00:00",
      details: "Objectif : défoncer le plafond",
      participants: 24,
    },
  ];

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
        {/* <Link href="chart2">
          <button type="button" className="btn inner_button m-2">
            afficher le graphique 
          </button>
        </a> */}
        <div className="container">
          {userSession ? (
            <div>
              <p className="current-status">
                Salut {username}, tu es actuellement à{" "}
                <b> {currentDegree} g/L</b> {currentDegree != 0 ? "!" : "."}
              </p>
              <p className="comments">{comments(currentDegree)}</p>
              <div>
                <button
                  type="button"
                  className="btn inner_button m-2"
                  onClick={() => setOpenModal(!openModal)}
                >
                  j&apos;ai bu ...
                </button>
                <Link href="chart2">
                  <button type="button" className="btn inner_button m-2">
                    afficher le graphique
                  </button>
                </Link>
                <Link href="event_create">
                  <button type="button" className="btn inner_button m-2">
                    ajouter un événement
                  </button>
                </Link>

                <Leaderboard />

                <FormModal
                  isOpen={openModal}
                  onClose={() => setOpenModal(false)}
                >
                  <FormModal.Header>Nouvelle consommation</FormModal.Header>
                  <FormModal.Body>
                    {/* Modal Body */}
                    <Form_v2 /> {/* Use Form to see previous version */}
                  </FormModal.Body>
                  <FormModal.Footer>
                    <FormModal.DismissButton className="modal-button-close">
                      Annuler
                    </FormModal.DismissButton>
                    <button
                      className="modal-button-save"
                      onClick={() => {
                        handleSave(userSession.id);
                        setOpenModal(false);
                      }}
                    >
                      Sauvegarder
                    </button>
                  </FormModal.Footer>
                </FormModal>
              </div>
            </div>
          ) : null}

          {userSession ? (
            <div className="container week">
              <p>Ma semaine :</p>
              <p>
                <em>
                  À faire : graphe en bâtons des statistiques de la semaine
                </em>
              </p>
              <div className="right">
                <Link href="/">
                  <button type="button" className="btn inner_button m-2">
                    Mes statistiques
                  </button>
                </Link>
              </div>
            </div>
          ) : null}

          <div className="container events">
            <div className="container">
              <h3>Evènements à venir</h3>
              <Link href="/event_create">
                <button type="button" className="btn inner_button m-2">
                  Créer un évènement
                </button>
              </Link>
            </div>

            <div className="container">
              <Event
                events={events}
                userId={userSession ? userSession.id : null}
              />
            </div>

            {/* <Event
              events={sampleEvents}
              userId={userSession ? userSession.id : null}
            ></Event> */}
            <p>
              <em>À faire : component évènement</em>
            </p>
            <div className="right">
              <Link href="/">
                <button type="button" className="btn display">
                  Voir tous les évènements
                </button>
              </Link>
            </div>
          </div>

          <div>
            {beers ? (
              <BeerBoxes2
                beers={beers}
                prefilledBeer={prefilledBeer}
                setPrefilledBeer={setPrefilledBeer}
                userId={userSession ? userSession.id : null}
              />
            ) : null}
          </div>
          {/* <button onClick={() => console.log(userSession)}>test</button> */}
        </div>
      </main>
    </Layout>
  );
}

const noUnderline = {
  textDecoration: "none",
};

const comments = (degree) => {
  console.log(degree);
  if (degree == 0) {
    return "Tu n'as rien bu, tu es sobre !";
  } else if (degree < 0.5) {
    return "Tu es en dessous de la limite légale pour conduire, mais tu es quand même un peu pompette !";
  } else if (degree < 1) {
    return "Tu es au dessus de la limite légale pour conduire, mais tu n'es sans doute pas encore bourré(e) !";
  } else if (degree < 1.5) {
    return "Tu es bourré(e), mais tu peux encore te déplacer sans trop de problème !";
  } else if (degree < 2) {
    return "Tu es complètement bourré(e), tu devrais peut-être rentrer chez toi !";
  } else if (degree < 2.5) {
    return "Demain tu auras la gueule de bois, mais ce soir tu es complètement déchiré(e) !";
  } else {
    return "Tu es dans un état critique, tu devrais appeler les urgences !";
  }
};
