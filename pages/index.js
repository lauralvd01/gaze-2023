import { supabase } from "../lib/supabaseClient";
import Head from "next/head";
import Layout from "../components/layout";
import { useUser } from "@supabase/auth-helpers-react";
// Simon
import Form from "./form.js";
import { useState } from "react";
import FormModal from "@/components/FormModal";

export async function getServerSideProps() {
  let { data } = await supabase.from("beers").select();

  return {
    props: {
      beers: data,
    },
  };
}

// Given a user id, a beverage and a delay, the following function will upload to the database a row in the drink history
export const handleSave = (id) => {
  var date = new Date();
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

  let beverage = document.getElementById("inputDrink").value;
  let drinkAmount = document.getElementById("inputGlassesDrank").value;
  let delay = document.getElementById("inputTime").value;

  hour -= Math.ceil(Math.max(delay - minute, 0) / 60);
  day = hour < 0 ? day - 1 : day;
  month = day < 1 ? month - 1 : month;
  day = day < 1 ? 30 : day; // bon nique sa mère les exceptions je ferai une fonction si j'ai la foi
  date = month + "/" + day + "/" + year;
  let time =
    (hour < 0 ? hour + 24 : hour) +
    ":" +
    (minute - delay + 60 * Math.ceil(Math.max(delay - minute, 0) / 60));
  // NB : Si le verre qu'il a bu est la veille (genre 23h50 et il remplit le form après minuit) pr l'instant ça le prend pas en compte
  // NB l'heure donnée par js est l'heure UTC !! faut corriger l'offset
  if (delay > 1439) {
    document.getElementById("formWarning").innerHTML =
      "Mets pas un délai de plus d'un jour chakal trop de calculs";
  } else {
    for (let i = 0; i < drinkAmount; i++) {
      let newDrink = {
        id: Math.floor(Math.random() * 100000000),
        user_id: id,
        beverage,
        date,
        time,
      };
      // console.log(newDrink.date, newDrink.time);
      supabase
        .from("drink_history")
        .insert([newDrink])
        .then(() => {
          console.log("inserted person into the database");
        });
    }
  }
  // console.log(day + "/" + month + "/" + year);
};

export default function Home({ beers }) {
  const [openModal, setOpenModal] = useState(false);
  const userSession = useUser();
  let person = {
    user_id: "sim2",
    beverage: "1664",
    date: "03/03/2001",
    time: "12:00",
  };

  const handleList = () => {
    var date = new Date();
    var foo = date.getDate;
    let day = foo.call(date);
    foo = date.getMonth;
    let month = foo.call(date);
    foo = date.getYear;
    let year = foo.call(date);

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
        <button onClick={handleList}>List drink history in console</button>
        {userSession ? (
          <div>
            <button onClick={() => setOpenModal(!openModal)}>
              Entrer une consommation
            </button>
            <FormModal isOpen={openModal} onClose={() => setOpenModal(false)}>
              <FormModal.Header>Nouvelle consommation</FormModal.Header>
              <FormModal.Body>
                {/* Modal Body */}
                <Form />
              </FormModal.Body>
              <FormModal.Footer>
                <FormModal.DismissButton className="modal-button-close">
                  Annuler
                </FormModal.DismissButton>
                <button
                  className="modal-button-save"
                  onClick={() => handleSave(userSession.id, 10)}
                >
                  Sauvegarder
                </button>
              </FormModal.Footer>
            </FormModal>
          </div>
        ) : null}
        <div className="container">
          {userSession ? <div>Hello {userSession.id} </div> : null}
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
