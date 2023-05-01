import {
  NavLink,
  useParams,
  useHistory
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard} from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();

function fetchDeck() {
  readDeck(deckId).then((data) => {
    setDeck(data);
    setCards(data.cards);
  });
}

  const handleDeckDelete = async (deckId) => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deckId);
      history.push("/")
    }
  };

  const handleCardDelete = async (cardId) => {
    const result = window.confirm("Are you sure you want to delete this card? \n \nYou will not be able to recover it.",);
    if (result) {
      await deleteCard(cardId);
      // TODO: After the card is deleted, reload the card list.
      fetchDeck()
    }
  };

  useEffect(fetchDeck, [deckId]);

  const CardList = cards.map((card) => (
    <li className="border rounded my-2 p-2 " key={card.id}>
      <div className="d-flex">
        <p className="w-50 px-2">{card.front}</p>
        <p className="w-50 px-2">{card.back}</p>
      </div>
      <div className="d-flex justify-content-end">
        <button 
        className="bg-secondary rounded mx-1" >
          <NavLink className="text-decoration-none text-light" to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</NavLink>
          </button>

        <button 
        className="bg-danger text-light rounded mx-1"
        onClick={() => handleCardDelete(card.id)}
        >
          Delete
          </button>
      </div>
    </li>
  ));

  return (
    <div>
      <ul className="breadcrumb bg-light rounded p-2 ">
        <li className="breadcrumb-item">
          <NavLink className="text-decoration-none" to="/">Home</NavLink>
        </li>
        <li className="breadcrumb-item">{deck.name}</li>
      </ul>
      <h5>{deck.name}</h5>
      <p>{deck.description}</p>
      <div className="d-flex justify-content-between">
        <div >
          <button 
          className="bg-secondary text-light rounded mx-1" >
          <NavLink className="text-decoration-none text-light" to={`/decks/${deck.id}/edit`}> Edit</NavLink>
            </button>

          <button 
          className="bg-primary text-light rounded mx-1" >
            <NavLink
                className="text-decoration-none text-light"
                to={`/decks/${deck.id}/study`}
                >
                Study
              </NavLink>
            </button>
          <button 
          className="bg-primary text-light rounded mx-1">
          <NavLink className="text-decoration-none text-light" to={`/decks/${deck.id}/cards/new`}> Add Cards</NavLink>
            </button>
        </div>
        <div>
          <button
              onClick={() => handleDeckDelete(deck.id)}
              className="bg-danger text-light rounded mx-1"
            >
              Delete
            </button>
        </div>
       
      </div>
      <h4>Cards</h4>
      
      <ul className="list-unstyled">{CardList}</ul>
    </div>
  );
}

export default Deck;
 
