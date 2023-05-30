const Form_v2 = () => {
  let glasses, degree, timeSinceDrink, weight, sex;
  let result;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log([glasses, degree, timeSinceDrink, sex, weight]);

    // Change the name of the sex to its corresponding factor
    switch (sex) {
      case "femme":
        sex = 0.8;
        break;
      case "homme":
        sex = 0.7;
        break;
      case "autre":
        sex = 0.75;
        break;
    }

    // le 125 c'est parce que je suppose qu'un verre fait 125 mL
    result = (degree * 0.01 * glasses * 125 * 0.8) / (sex * weight);

    // NB : le pic est atteint environ 15min après à jeûn et jusqu'à 1h après si on est en train de manger. On suppose que c'est 30min pour tout le monde

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Ton taux d'alcoolémie est de ${(
      Math.round((result - (0.2 * timeSinceDrink) / 60) * 100) / 100
    ).toFixed(2)} g/L`;
  };

  return (
    <div style={localStyles.container}>
      {" "}
      {[glasses, degree, timeSinceDrink, sex, weight]}
      <form style={localStyles.container} action="form" method="post">
        <div className="form-group row" style={localStyles.fieldContainer}>
          <label
            htmlFor="inputGlassesDrank"
            className="col-sm-2 col-form-label modal-label"
          >
            Nombre de verres bus
          </label>
          <div className="col-sm-10 modal-input">
            <input
              type="text"
              pattern="[0-9,.]+"
              className="form-control"
              id="inputGlassesDrank"
              placeholder="Verres"
              onChange={(input) => {
                glasses = parseFloat(input.target.value.replaceAll(",", "."));
              }}
            ></input>
          </div>
        </div>
        <div className="form-group row" style={localStyles.fieldContainer}>
          <label
            htmlFor="inputDrink"
            className="col-sm-2 col-form-label modal-label"
          >
            Nom de la boisson {/* FAIRE UN MENU DEROULANT */}
          </label>
          <div className="col-sm-10 modal-input">
            <select class="form-select bierasse_form" aria-label="Default select example">
              <option selected>sélectionner</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          {/* <div className="col-sm-10 modal-input">
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              id="inputDrink"
              placeholder="Biérasse..."
              onChange={(input) => {
                degree = input.target.value; // to change
              }}
            ></input>
          </div> */}
        </div>

        <div className="form-group row" style={localStyles.fieldContainer}>
          <label
            htmlFor="inputTime"
            className="col-sm-2 col-form-label modal-label"
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
              }}
            ></input>
          </div>
        </div>

        <div id="result" style={localStyles.result}></div>
      </form>
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
