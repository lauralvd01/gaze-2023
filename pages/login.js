import style from "@/styles/loggin.module.css";
import Image from "next/image";
import React from "react";
import { supabase } from "../lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

async function signInWithEmailAndPassword(supabaseClient, email, password) {
  console.log("signing in with email and password");
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log(data);

  window.location.replace("http://localhost:3000/");
}

async function updateDatabase(supabaseClient, username, weight, gender) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  const { data, error } = await supabaseClient
    .from("profiles")
    .update({
      username: username,
      weight: weight,
      gender: gender,
    })
    .eq({ id: user.id });
}

async function signUpWithEmailAndPassword(
  supabaseClient,
  email,
  password,
  username,
  weight,
  gender
) {
  console.log("signing up with email and password");
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    // Handle the error here
  } else {
    // Wait for the user object to be defined
    // while (!data) {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   console.log("waiting for user");
    // }

    console.log(typeof data);
    console.log(data.user.id);
    const userId = data.user.id;
    if (data.user) {
      // Récupérer l'ID de l'utilisateur
      console.log("userid", userId);
      // Ajouter les données du profil à la table "profile"
      const { data, error } = await supabase
        .from("profiles")
        .update({ username: username, weight: weight, gender: gender })
        .eq("id", userId);

      const {} = await supabase
        .from("drink_history_v2")
        .insert({ user_id: userId, drink_acts: [] });
    }
  }

  window.location.replace("http://localhost:3000/");
}

export default function Login() {
  const [iscreatting, setcreate] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [gender, setgender] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [weightError, setWeightError] = React.useState("");
  const [genderError, setGenderError] = React.useState("");

  const handleSignUpButton = (
    username,
    password,
    email,
    weight,
    gender,
    supabaseClient
  ) => {
    console.log("sign up button pressed");
    let error = false;
    //usernameError
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      error = true;
    } else {
      setUsernameError("");
    }
    //passwordError
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      error = true;
    } else {
      setPasswordError("");
    }
    //emailError
    if (email.length < 5) {
      setEmailError("required");
      error = true;
    } else {
      setEmailError("");
    }
    //weightError
    if (weight.length < 1) {
      setWeightError("required");
      error = true;
    } else if (weight.match(/^[0-9]+$/) == null) {
      setWeightError("Weight must be a number");
      error = true;
    } else {
      setWeightError("");
    }

    //genderError
    if (gender.length < 1) {
      setGenderError("required");
      error = true;
    } else {
      setGenderError("");
    }

    if (!error) {
      signUpWithEmailAndPassword(
        supabaseClient,
        email,
        password,
        username,
        weight,
        gender
      );
    }
  };

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
                <span style={{ color: "red" }}>{emailError}</span>
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
                <span style={{ color: "red" }}>{passwordError}</span>
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
                    <span style={{ color: "red" }}>{usernameError}</span>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div
                      className="col"
                      onChange={(e) => setgender(e.target.value)}
                    >
                      <div className="row">
                        <div className="col">
                          <label className="form-label">Sexe </label>
                          <span style={{ color: "red" }}>{genderError}</span>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="female"
                          />
                          <label className="form-check-label">Femme</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="male"
                          />
                          <label className="form-check-label mb-3">Homme</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="mb-3">
                        <label className="form-label">Poids</label>
                        <span style={{ color: "red" }}>{weightError}</span>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="120 (beau bestiau)"
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn loggin_button my-2"
                    // disabled={
                    //   !(email && password && username && gender && weight)
                    //}
                    onClick={() =>
                      handleSignUpButton(
                        username,
                        password,
                        email,
                        weight,
                        gender,
                        supabaseClient
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
                    disabled={!(email && password)}
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
