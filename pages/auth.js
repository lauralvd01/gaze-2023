import React from "react";
import supabase from "../lib/supabaseClient";
import { useState } from "react";

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "example@email.com",
    password: "example-password",
  });
}

function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpWithEmail() {
    console.log("signUpWithEmail", email, password);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  }

  return (
    <div>
      Test
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUpWithEmail}>Sign up with email</button>
      <text>
        {email} {password}
      </text>
    </div>
  );
}

export default Auth;
