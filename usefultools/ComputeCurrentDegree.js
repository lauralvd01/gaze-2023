import { supabase } from "../lib/supabaseClient";
import { DateTomillis } from "./MillisDateConversion";

// Time should be in milliseconds, and it should later on not be used (genre le serveur calculera de temps en temps, à l'instant t)
const ComputeCurrentDegree = async () => {
  let data = [];

  const RetrieveDrinkHistory = async () => {
    const { data: history } = await supabase
      .from("drink_history_v2")
      .select("user_id,drink_acts");
    return history;
  };
  const RetrieveDrinkActs = async () => {
    const { data: drink_acts } = await supabase.from("drink_act").select("*");
    return drink_acts;
  };
  const RetrieveBeers = async () => {
    const { data: beers } = await supabase
      .from("beers")
      .select("name,degree,litrage");
    return beers;
  };
  const RetrieveProfiles = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id,username,weight,gender");
    return profiles;
  };
  await Promise.all([
    RetrieveDrinkHistory(),
    RetrieveDrinkActs(),
    RetrieveBeers(),
    RetrieveProfiles(),
  ]).then((result) => {
    const drink_history = result[0];
    const drink_acts = result[1];
    const beers = result[2];
    const profiles = result[3];

    for (let i = 0; i < drink_history.length; i++) {
      const user_drink_acts = drink_acts.filter((drink_act) => {
        return drink_history[i].drink_acts.includes(drink_act.id);
      });
      const profile = profiles.find(
        (profile) => profile.id === drink_history[i].user_id
      );

      let degree = 0;
      user_drink_acts.forEach((drink_act) => {
        const timeSinceDrink =
          Date.now() + 2000 * 60 * 60 - DateTomillis(drink_act.drank_at);

        const beer = beers.find((beer) => beer.name === drink_act.beer_name);

        let degreeContribution =
          (beer.degree * 0.01 * drink_act.glasses_amount * beer.litrage * 0.8) /
          (profile.weight * (profile.gender === "male" ? 0.7 : 0.6));

        if (timeSinceDrink < 0) {
          degreeContribution = 0;
          // Before peak, climb linearly
        } else if (timeSinceDrink < 30 * 60 * 1000) {
          degreeContribution *= timeSinceDrink / (30 * 60 * 1000);
        }
        // After peak, decrease linearly by a ratio of 0.15g.L per hour
        else degreeContribution -= (0.15 * timeSinceDrink) / (60 * 60 * 1000);

        degree += Math.max(0, degreeContribution);
      });
      data.push({
        username: profile.username,
        degree: Math.floor(degree * 100) / 100,
      });
    }
  });

  console.log("computed data !");
  return data.sort((a, b) => b.degree - a.degree);
};

export default ComputeCurrentDegree;
