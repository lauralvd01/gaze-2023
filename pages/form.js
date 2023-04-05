
const Form = () => {
    let glasses, degree, timeSinceDrink, weight, sex;
    let result;

    const updateWeight = (input) => {
        const weightLabel = document.getElementById("weightLabel");
        weightLabel.innerHTML = `Ton poids : ${input.target.value} kg`;
        // console.log(input.target.value)
            weight = parseInt(input.target.value);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log([glasses , degree,  timeSinceDrink,  sex,  weight])

        switch (sex) {
            case "femme":
                sex = 0.8
                break;
            case "homme":
                sex = 0.7
                break;
            case "autre":
                sex = 0.75
                break;
        }

        result = degree * 0.01 * glasses * 125 * 0.8 / (sex * weight);

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `Ton taux d'alcoolémie est de ${(Math.round((result-0.2*timeSinceDrink/60) * 100) / 100).toFixed(2)} g/L`;
    }

    

    return (
        <div style={localStyles.container} > {[glasses , degree,  timeSinceDrink,  sex,  weight]}
            <form action="form" method="post">
            <div className="form-group row" style={{minWidth:"70vw"}} >
    <label htmlFor="inputGlassesDrank" className="col-sm-2 col-form-label">Nombre de verres bus</label>
    <div className="col-sm-10">
      <input type="text" pattern="[0-9]+" className="form-control" id="inputGlassesDrank" placeholder="Verres" onChange={(input) => {
                glasses = parseFloat(input.target.value);
              }} ></input>
    </div>
  </div>
  <div className="form-group row" style={{minWidth:"70vw"}} >
    <label htmlFor="inputDegree" className="col-sm-2 col-form-label">Degré d alcoolémie</label>
    <div className="col-sm-10">
      <input type="text" pattern="[0-9]+" className="form-control" id="inputDegree" placeholder="Degré" onChange={(input) => {
                degree = parseInt(input.target.value);
              }} ></input>
    </div>
  </div>
  
  <div className="form-group row" style={{minWidth:"70vw"}} >
    <label htmlFor="inputTime" className="col-sm-2 col-form-label">Il y a combien de temps (en minutes)</label>
    <div className="col-sm-10">
      <input type="text" pattern="[0-9]+" className="form-control" id="inputTime" placeholder="Temps" onChange={(input) => {
                timeSinceDrink = parseInt(input.target.value);
              }}  ></input>
    </div>
  </div>

  <fieldset className="form-group">
    <div className="row">
      <legend className="col-form-label col-sm-2 pt-0">Sexe</legend>
      <div className="col-sm-10">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="femme" onChange={(input)=>{sex = input.target.value}} ></input>
          <label className="form-check-label" htmlFor="gridRadios1">
Femme          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="homme" onChange={(input)=>{sex = input.target.value}} ></input>
          <label className="form-check-label" htmlFor="gridRadios2"> 
Homme          </label> 
        </div> 
        <div className="form-check"> 
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="autre"  onChange={(input)=>{sex = input.target.value}}></input>
          <label className="form-check-label" htmlFor="gridRadios3">
Autre          </label>
        </div>
        
        

      </div>
    </div>
  </fieldset>
  
  <div className="form-group row" style={{minWidth:"70vw",paddingTop:20}} >
    <label htmlFor="inputWeight" className="col-sm-2 col-form-label" id="weightLabel">Ton poids</label>
    <div className="col-sm-10">
      <input type="range" className="form-control" id="inputWeight" onChange={updateWeight}  min="10" max="610"  ></input>
    </div>
  </div>

  <div className="form-group row" style={{...localStyles.centered,  minWidth:"70vw"}} >
    <div className="col-sm-10" style={{...localStyles.centered, paddingTop:20}}>
      <button  className="btn btn-primary" onClick={handleSubmit} >Calculer</button>
    </div>
  </div>

  <div id="result" style={localStyles.result} ></div>

</form>
        </div>
    );
}

const localStyles = {
    container: {
        paddingTop:50,
        minHeight: "60vh",
        minWidth: "60vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    centered: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    result:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 20,
        borderRadius: 10,
        minHeight:"10vh",
        minWidth:"10vw",
    }
}

export default Form;
