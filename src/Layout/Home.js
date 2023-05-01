import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  function fetchDecks() {
    listDecks().then((data) => {
      setDecks(data);
  })
  }

  useEffect(fetchDecks, []);

  const handleDelete = async (deckId) => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deckId);
      // TODO: After the deck is deleted, reload the decks list.
      fetchDecks();
    }
  };

  const deckList = decks.map((deck, index) => {

    const numCards=`${deck.cards.length} cards` 
    return (
      <li
        className={`border p-2 ${index === 0 ? "rounded-top" : ""} ${
          index === decks.length - 1 ? "rounded-bottom" : ""
        }`}
        key={deck.id}
      >
        <div className="d-flex justify-content-between">
          <h3 className="d-inline">{deck.name}</h3>
          <p className="d-inline">{numCards}</p>
        </div>
        <p>{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <button className="bg-secondary rounded mx-1">
              <NavLink
                className="text-decoration-none text-light"
                to={`decks/${deck.id}`}
              >
                View
              </NavLink>
            </button>
            <button className="bg-primary rounded mx-1">
              <NavLink
                className="text-decoration-none text-light"
                to={`decks/${deck.id}/study`}
              >
                Study
              </NavLink>
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDelete(deck.id)}
              className="bg-danger text-light rounded mx-1"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <>
      <button className="bg-secondary  rounded mx-1">
        <NavLink className="text-decoration-none text-light" to="/decks/new">
          Create Deck
        </NavLink>
      </button>
      <ul id="HomeList" className="list-unstyled my-2">
        {deckList}
      </ul>
    </>
  );
}

export default Home;
