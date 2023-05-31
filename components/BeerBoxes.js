import { useState } from "react";
import FormModal from "./FormModal";
import Form_v2 from "@/pages/form_v2.js";
import Image from 'next/image'

const BeerBoxes = ({beers}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="card-group row row-cols-4 g-4">
            {beers.map((beer) => 
                <div className="col" key={beer.id}>
                <div className="card bg-warning border-dark" key={beer.id}>
                    <div className="card-header">
                    <div className="card-img-top beer_img">
                        <MyImage id={beer.id}/>
                    </div>
                    <h5 className="card-title">{beer.name}</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Degré : {beer.degree}</p>
                        <p className="card-text">Prix : {beer.price} €</p>
                        <p className="card-text">Prix / Degré : {Math.floor(100*beer.price/beer.degree)/100} €</p>
                    </div>
                    <div className="card-footer">
                        <button className="btn beer_button m-2" onClick={() => setOpenModal(!openModal)}>Boire</button>
                        <FormModal isOpen={openModal} onClose={() => setOpenModal(false)}>
                        <FormModal.Header>Nouvelle consommation</FormModal.Header>
                        <FormModal.Body>
                            {/* Modal Body */}
                            <Form_v2 /> {/* Use Form to see previous version */}
                        </FormModal.Body>
                        <FormModal.Footer>
                            <FormModal.DismissButton className="modal-button-close">
                            Annuler
                            </FormModal.DismissButton>
                            <button
                            className="modal-button-save"
                            onClick={() => {handleSave(userSession.id);document.getElementById("inputDrink").setAttribute("value", "Chouffe");setOpenModal(false)}}
                            >
                            Sauvegarder
                            </button>
                        </FormModal.Footer>
                        </FormModal>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

const MyImage = ({id}) => {
    let impath = "/../public/beers/".concat(id).concat(".png")
    return (
        <Image
          src= {impath}
        //   className={style.exit_image}
          alt={impath}
          width="120"
          height="120"
        />
    )
  }

export default BeerBoxes;