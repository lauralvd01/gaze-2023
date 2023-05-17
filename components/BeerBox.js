// import "../styles/Modal.css";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useEffect, useContext, createContext } from "react";

const ModalContext = createContext();

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

/*
<ul>
  {beers? beers.map(
    (beer) => <li key={beer.id}>{beer.name}</li>
  ) : null}
</ul>
*/

const BeerBox = ({ id, name, degree, price }) => {
  return (
    <div class="card" style="width: 18rem;" key={id}>
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">name</h5>
        <p class="card-text">Degree : {degree}</p>
        <p class="card-text">Price : {price}</p>
        <a href="#" class="btn btn-primary">Boire</a>
      </div>
    </div>
  )
};

// Je sais pas pourquoi mais quand le modal disparait il fade au lieu de remonter en fadant mais pg
// Je pense que c'est parce qu'il voit pas le styles donné en argument de la fonction de modalTransition

const DismissButton = ({ children, className }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <button type="button" onClick={onClose} className={className}>
      {children}
    </button>
  );
};

const ModalHeader = ({ children }) => {
  return (
    <div className="react-modal-header">
      <div className="react-modal-title">{children}</div>
      <DismissButton className="btn-close">&times;</DismissButton>
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <div className="react-modal-body">{children}</div>;
};

const ModalFooter = ({ children }) => {
  return <div className="react-modal-footer">{children}</div>;
};

FormModal.Header = ModalHeader;
FormModal.Body = ModalBody;
FormModal.Footer = ModalFooter;
FormModal.DismissButton = DismissButton;

export default FormModal;
