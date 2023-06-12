import { useEffect, useState } from "react";

const Form_v2 = ({ prefilledBeer, prefilledGlass = false }) => {
  let glasses, degree, timeSinceDrink, weight, sex;
  let result;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log([glasses, degree, timeSinceDrink, sex, weight]);

    // Change the name of the sex to its corresponding factor
    switch (sex) {
      case "femme":
        sex = 0.6;
        break;
      case "homme":
        sex = 0.7;
        break;
      case "autre":
        sex = 0.75;
        break;
    }

    // le 125 c'est parce que je suppose qu'un verre fait 125 mL
    // ATTENTION ce truc n'est finalement plus utilisé mais au cas où on a changé c'est plus 125
    result = (degree * 0.01 * glasses * 125 * 0.8) / (sex * weight);

    // NB : le pic est atteint environ 15min après à jeûn et jusqu'à 1h après si on est en train de manger. On suppose que c'est 30min pour tout le monde

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Ton taux d'alcoolémie est de ${(
      Math.round((result - (0.2 * timeSinceDrink) / 60) * 100) / 100
    ).toFixed(2)} g/L`;
  };

  return (
    <div className="container" style={localStyles.container}>
      {" "}
      {[glasses, degree, timeSinceDrink, sex, weight]}
      <div className="mb-3">
        <form style={localStyles.container} action="form" method="post">
          <div className="form-group row" style={localStyles.fieldContainer}>
            <label
              htmlFor="inputGlassesDrank"
              className="form-label"
            >
              Nombre de bières bues
            </label>
            <div className="col-sm-10 modal-input">
              <input
                type="text"
                pattern="[0-9,.]+"
                className="form-control"
                id="inputGlassesDrank"
                placeholder={prefilledGlass ? 1 : "Verres"}
                defaultValue={prefilledGlass ? 1 : null}
                onChange={(input) => {
                  glasses = parseFloat(input.target.value.replaceAll(",", "."));
                  document
                    .getElementById("inputGlassesDrank")
                    .setAttribute("value", glasses);
                }}
              ></input>
            </div>
          </div>
          <div className="form-group row" style={localStyles.fieldContainer}>
            <label
              htmlFor="inputDrink"
              className="form-label"
            >
              Nom de la boisson {/* FAIRE UN MENU DEROULANT */}
            </label>
            <div className="col-sm-10 modal-input">
              {prefilledBeer ? (
                <option id="inputDrink" value={prefilledBeer}>
                  {prefilledBeer}
                </option>
              ) : (
                <select
                  id="inputDrink"
                  class="form-select bierasse_form"
                  aria-label="Default select example"
                >
                  <option selected>Sélectionner</option>
                  <option value="Chouffe">Chouffe</option>
                  <option value="Kasteel Triple">Kasteel Triple</option>
                  <option value="Cuvée Des Trolls">Cuvée Des Trolls</option>
                  <option value="Blanche des Neiges">Blanche des Neiges</option>
                  <option value="Desperados">Desperados</option>
                  <option value="Kriek">Kriek</option>
                  <option value="Delirium Red">Delirium Red</option>
                  <option value="Kasteel Red">Kasteel Red</option>
                  <option value="Delirium Bleue">Delirium Bleue</option>
                  <option value="Triple Karmeliet">Triple Karmeliet</option>
                </select>
              )}
            </div>
          </div>

          <div className="form-group row" style={localStyles.fieldContainer}>
            <label
              htmlFor="inputTime"
              className="form-label"
            >
              Il y a combien de temps (en minutes)
            </label>
            <div className="col-sm-10 modal-input">
              <input
                type="text"
                pattern="[0-9]+"
                className="form-control"
                id="inputTime"
                placeholder="Temps"
                onChange={(input) => {
                  timeSinceDrink = parseInt(input.target.value);
                  document
                    .getElementById("inputTime")
                    .setAttribute("value", timeSinceDrink);
                }}
              ></input>
            </div>
          </div>

          <div id="result" style={localStyles.result}></div>
        </form>
      </div>
    </div>
  );
};

const localStyles = {
  container: {
    minHeight: "30vh",
    minWidth: "560px",
    // justifyContent: "center",
    // alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  fieldContainer: {
    marginBottom: 10,
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

export default Form_v2;
