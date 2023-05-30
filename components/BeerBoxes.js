const BeerBoxes = ({beers}) => {
    return (
        <div className="card-group row row-cols-4 g-4">
            {beers.map((beer) => 
                <div className="col" key={beer.id}>
                <div className="card bg-warning border-dark" key={beer.id}>
                    {/*<img src="..." className="card-img-top" alt=""/>*/}
                    <div className="card-body">
                        <h5 className="card-title">{beer.name}</h5>
                    </div>
                    <div className="card-footer">
                        <p className="card-text">Degré : {beer.degree}</p>
                        <p className="card-text">Prix : {beer.price} €</p>
                        <p className="card-text">Prix / Degré : {Math.floor(100*beer.price/beer.degree)/100} €</p>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default BeerBoxes;