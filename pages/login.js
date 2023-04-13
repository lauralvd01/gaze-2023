import style from "@/styles/loggin.module.css";
import Image from "next/image";
import React from "react";
import { supabase } from "../lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

async function signInWithEmailAndPassword(supabaseClient, email, password) {
  await supabaseClient.auth
    .signInWithPassword({
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(supabase.auth.getSession());
    });

  window.location.replace("http://localhost:3000/");
}

async function signUpWithEmailAndPassword(supabaseClient, email, password) {
  await supabaseClient.auth
    .signUp({
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(supabase.auth.getSession());
    });

  window.location.replace("http://localhost:3000/login");
}

export default function Login() {
  const [iscreatting, setcreate] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("test").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  const changeCreation = () => {
    setcreate(!iscreatting);
    return <></>;
  };

  return (
    <div className={style.main_loggin}>
      <div className="container logging-container">
        <div className="card">
          <div className="card-body">
            {iscreatting ? <h2>Création d'un compte</h2> : <h2>Connexion</h2>}
            <form>
              <div className="mb-3">
                <label className="form-label">Adresse mail </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {iscreatting ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Nom d'utilisateur </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="form-label">Sexe </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value=""
                          checked="checked"
                        />
                        <label className="form-check-label">Femme</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label className="form-check-label mb-3">Homme</label>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="mb-3">
                        <label className="form-label">Poids</label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="120 (beau bestiau)"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn loggin_button my-2"
                    onClick={() =>
                      signUpWithEmailAndPassword(
                        supabaseClient,
                        email,
                        password
                      )
                    }
                  >
                    Créer le compte
                  </button>
                  <div className={style.switchlog}>
                    <a onClick={changeCreation}>
                      Vous possédez déjà un compte ?
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn loggin_button my-2"
                    onClick={() => {
                      signInWithEmailAndPassword(
                        supabaseClient,
                        email,
                        password
                      );
                      console.log(supabaseClient.auth.signInWithPassword);
                    }}
                  >
                    Se connecter
                  </button>
                  <div className={style.switchlog}>
                    <a onClick={changeCreation}>
                      Vous n'avez pas encore de compte ?
                    </a>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <a href="/">
        <Image
          src="/../public/fire-exit.png"
          className={style.exit_image}
          alt="Bootstrap"
          width="60"
          height="60"
        />
      </a>
    </div>
  );
}
