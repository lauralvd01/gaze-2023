import { handleSave } from "@/pages/index.js";

const fullDate = (date) => {return date.split(" ")[0]};
const jourMois = (date) => {return fullDate(date).split("-")[2] + "/" + fullDate(date).split("-")[1]};
const heure = (date) => {return date.split(" :")[1] + "h" + date.split(" :")[2]};


export default function Event ({events, userId}) {
    return (
        <div className="container">
            <div className="row beer_row">
                {events.map((event) =>(
                        <div className="col col-lg-2 col-6">
                            <div className="card beer_card">
                                <div className="card-header">
                                    <h5 className="card-title left">{event.day} {jourMois(event.begining)}</h5>
                                    <h5 className="card-title right">{heure(event.begining)}</h5>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title center">{event.title}</h4>
                                    <p className="card-text right">Participants : {event.participants}</p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn beer_button m-2"
                                        onClick={() => {}}
                                    >
                                        Détails
                                    </button>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}