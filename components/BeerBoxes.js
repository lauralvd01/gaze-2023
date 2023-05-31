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
                    {/*<div className="card-img-top">*/}
                    {/*beer.URL ? <Image src={beer.URL} alt="Picture of the delirium blue" width="150" height="150"/> : null*/}
                    {/*<Image src="/../public/beers/9.png" alt="Picture of the author" width={150} height={150} />*/}
                    <div className="card-img-top beer_img">
                        <MyImage name={"DELIBLUE"}/>
                    </div>
                    <h5 className="card-title">{beer.name}</h5>
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

//const MyImage = (srcURL) => {
//    return (
//        <Image src="/beerLogos/9.png" alt="Picture of the author" width={150} height={150} />
//    )
//}

//import Image from 'next/image'
import mypic from '../public/DELIBLUE.png'

const MyImage = ({name}) => {
    let impath = "/../public/".concat(name).concat(".png")
    return (
        <Image
          src= {impath}
        //   className={style.exit_image}
          alt={impath}
          width="100"
          height="100"
        />
    )
  }

export default BeerBoxes;