import style from "@/styles/BeerBox.module.css";

/*
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
*/

const BeerBox = ({id, name, degree, price}) => {
  return (
    <div className="card" key={id}>
      <img src="..." className="card-img-top" alt="Photo de la bière en attente"/>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Degree : {degree}</p>
        <p className="card-text">Price : {price}</p>
        <a href="#" className="btn btn-primary">Boire</a>
      </div>
    </div>
  )
};

export default BeerBox;
