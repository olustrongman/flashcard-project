import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck, listDecks } from "../utils/api";



function LoadDecks() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then((res) => {
      setDecks(res);
    })
  }, [])


  function handleDelete(id) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      history.go(0);
      deleteDeck(id)
    }
  }

  return (
    <>
    <div className="loadDecks">
      <Link to={"/decks/new"}><button className="btm btn-secondary mb-3"><span className="oi oi-plus" />Create Deck</button></Link>
      {decks.map((deck) => (
        <div key={deck.id} className="row">
          <div className="col-sm-6">
            <div className="card mb-3" >
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-subtitle float-right">{deck.cards.length} cards</p>
                <p className="card-text">{deck.description}</p>
                <Link to={{ pathname: `/decks/${deck.id}` }}><button className="btn btn-secondary m-2"><span className="oi oi-eye" /> View</button></Link>
                <Link to={{ pathname: `/decks/${deck.id}/study` }}><button className="btn btn-primary m-2"><span className="oi oi-book" /> Study</button></Link>
                <Link to="/"><button onClick={() => handleDelete(deck.id)} className="btn btn-danger m-2 float-right"><span className="oi oi-trash" /></button></Link>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
    </>
  );
}

export default LoadDecks;
