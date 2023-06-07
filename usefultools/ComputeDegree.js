import { supabase } from "../lib/supabaseClient";
import { DateTomillis } from "./MillisDateConversion";

// Time should be in milliseconds, and it should later on not be used (genre le serveur calculera de temps en temps, à l'instant t)
const ComputeDegree = async (userID, time = Date.now()) => {
  let degree = 0;

  // Retrieve the drinks of the user
  try {
    const { data: drink_ids } = await supabase
      .from("drink_history_v2")
      .select("drink_acts")
      .eq("user_id", userID)
      .single();

    // console.log(drink_ids.drink_acts);
    // inside the table drink_act, retriev the drink_ids with the id in the list drink_ids.drink_acts
    const { data: drink_acts } = await supabase
      .from("drink_act")
      .select("*")
      .in("id", drink_ids.drink_acts);
    // console.log("drinks : ", drink_acts);

    // Retrieve the weight and sex of the user (maybe we should cache it later on)
    const { data: user } = await supabase
      .from("profiles")
      .select('"weight", "gender"')
      .eq("id", userID)
      .single();

    // console.log("user", user);

    let sex_ratio; // Index of alcohol absorption
    switch (user.gender) {
      case "female":
        sex_ratio = 0.6;
        break;
      case "male":
        sex_ratio = 0.7;
        break;
      case "other":
        sex_ratio = 0.75;
        break;
    }

    // Compute the degree of the user
    for (let i = 0; i < drink_acts.length; i++) {
      const { data: drink } = await supabase
        .from("beers")
        .select("degree,litrage")
        .eq("name", drink_acts[i].beer_name)
        .single();
      let degreeContribution =
        (drink.degree *
          0.01 *
          drink_acts[i].glasses_amount *
          drink.litrage *
          0.8) /
        (sex_ratio * user.weight);
      // console.log("raw degreeContribution ", degreeContribution);
      // console.log(drink_acts[i].drank_at);
      const timeSinceDrink =
        time + 2000 * 60 * 60 - DateTomillis(drink_acts[i].drank_at);
      // console.log("timeSinceDrink ", timeSinceDrink / 1000 / 60);
      // If the user drank a beer in the future
      if (timeSinceDrink < 0) {
        degreeContribution = 0;
        // Before peak, climb linearly
      } else if (timeSinceDrink < 30 * 60 * 1000) {
        degreeContribution *= timeSinceDrink / (30 * 60 * 1000);
      }
      // After peak, decrease linearly by a ratio of 0.15g.L per hour
      else degreeContribution -= (0.15 * timeSinceDrink) / (60 * 60 * 1000);
      // console.log("degreeContribution ", degreeContribution);
      degree += Math.max(0, degreeContribution);
    }
    // console.log("degree is : ", degree);
  } catch (error) {
    // console.log("error computing degree");
    // console.log(error.message);
  }
  console.log("degree : ", degree);
  return degree;
};

export default ComputeDegree;
