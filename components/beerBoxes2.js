import Image from "next/image";
import FormModal from "./FormModal";
import { useState } from "react";
import Form_v2 from "@/pages/form_v2.js";
import { handleSave } from "@/pages/index.js";

export default function BeerBoxes2({
  beers,
  prefilledBeer,
  setPrefilledBeer,
  userId,
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container">
      <div className="row beer_row">
        {beers.map((beer, index) => (
          <div className="col col-lg-2 col-6" key={index}>
            <div className="card beer_card">
              <div className="card-header">
                <div className="card-img-top beer_img">
                  <MyImage id={beer.id} />
                </div>
                <h5 className="card-title">{beer.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">Degré : {beer.degree}</p>
                <p className="card-text">Prix : {beer.price} €</p>


                <p className="card-text">Quantité : {beer.litrage}</p>

                <p className="card-text">
                  Prix / Degré.L :{" "}
                  {Math.floor(
                    (10000 * beer.price) / (beer.degree * beer.litrage)
                  ) / 100}{" "}
                  €
                </p>
              </div>
              <div className="card-footer">
                <button
                  className="btn beer_button m-2"
                  onClick={() => {
                    if (openModal) {
                      setPrefilledBeer(null);
                    }
                    setPrefilledBeer(beer.name);
                    setOpenModal(!openModal);
                  }}
                >
                  Boire
                </button>
                <FormModal
                  isOpen={openModal}
                  onClose={() => {
                    setOpenModal(false);
                    if (openModal) {
                      setPrefilledBeer(null);
                    }
                  }}
                >
                  <FormModal.Header>Nouvelle consommation</FormModal.Header>
                  <FormModal.Body>
                    {/* Modal Body */}

                    <Form_v2
                      prefilledBeer={prefilledBeer}
                      prefilledGlass={true}
                    />{" "}

                    {/* Use Form to see previous version */}
                  </FormModal.Body>
                  <FormModal.Footer>
                    <FormModal.DismissButton className="modal-button-close">
                      Annuler
                    </FormModal.DismissButton>
                    <button
                      className="modal-button-save"
                      onClick={async () => {
                        await handleSave(userId);
                        setOpenModal(false);
                      }}
                    >
                      Sauvegarder
                    </button>
                  </FormModal.Footer>
                </FormModal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MyImage = ({ id }) => {

  
  let impath = "/beers/".concat(id).concat(".png");

  return (
    <Image
      src={impath}
      className="beer_image"
      alt={impath}
      width="120"
      height="120"
    />
  );
};
