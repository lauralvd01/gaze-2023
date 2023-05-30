import { supabase } from "../lib/supabaseClient";
import Head from "next/head";
import Layout from "../components/layout";
import { useUser } from "@supabase/auth-helpers-react";
// Simon
import Form from "./form.js";
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
import Leaderboard from "@/components/Leaderboard";

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
    const { data: user_history } = await supabase
      .from("drink_history_v2")
      .select()
      .match({ user_id: userId })
      .single();

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
  const [openModal, setOpenModal] = useState(false);
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

  const handleList = () => {
    supabase
      .from("drink_history")
      .select("*")
      .then((result) => {
        console.log(result.data);
      });
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
        <button>
          <Link style={noUnderline} href="chart2">
            Go to chart
          </Link>
        </button>
        <button onClick={handleList}>List drink history in console</button>
        {userSession ? (
          <div>
            <button onClick={() => setOpenModal(!openModal)}>
              Entrer une consommation
            </button>
            <Leaderboard />
            <FormModal isOpen={openModal} onClose={() => setOpenModal(false)}>
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
                  onClick={() => handleSave(userSession.id)}
                >
                  Sauvegarder
                </button>
                <button className="modal-button-save" onClick={handleAddPerson}>
                  ajouter personne
                </button>
                <button className="modal-button-save" onClick={handleList_v2}>
                  lister personnes
                </button>
                <button
                  className="modal-button-save"
                  onClick={async () => handleList_acts(userSession.id)}
                >
                  lsit acts
                </button>
              </FormModal.Footer>
            </FormModal>
          </div>
        ) : null}
        <div className="container">
          {userSession ? (
            <div>
              <span>
                Salut {username}, tu es actuellement à{" "}
                <b> {currentDegree} g/L</b>
                de sang
              </span>
            </div>
          ) : null}
          <ul>
            {beers
              ? beers.map((beer) => <li key={beer.id}>{beer.name}</li>)
              : null}
          </ul>
          <button onClick={() => console.log(userSession)}>test</button>
        </div>
      </main>
    </Layout>
  );
}

const noUnderline = {
  textDecoration: "none",
};
