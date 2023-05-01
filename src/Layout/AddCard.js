import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({
    front: front,
    back: back,
  });
  const history = useHistory();

  function fetchDecks() {
    readDeck(deckId).then((data) => setDeck(data));
  }
  useEffect(fetchDecks, [deckId]);

  const handleFront = (event) => {
    setFront(event.target.value);
    
    setCard({
        ...card,
      front: event.target.value
    });
  };
  const handleBack = (event) => {
    setBack(event.target.value);
   
    setCard({
      ...card,
      back: event.target.value,
    });
  };
  const handleDone = () => history.push(`/decks/${deckId}`);

  const handleSave = async () => {
    
    await createCard(deckId, card);
      
      setFront("")
      setBack("")
  };

  return (
    <>
      <ul className="breadcrumb bg-light rounded p-2 ">
        <li className="breadcrumb-item">
          <NavLink className="text-decoration-none" to="/">
            Home
          </NavLink>
        </li>
        <li className="breadcrumb-item">
          <NavLink className="text-decoration-none" to={`/`}>
            {deck.name}
          </NavLink>
        </li>
        <li className="breadcrumb-item">Add Card</li>
      </ul>
      <h3>{deck.name}: Add Card</h3>
      <div>
        <p>Front</p>
        <textarea 
        placeholder="Front side of card"
        className="w-100"
        value={front}
        onChange={handleFront} >
        </textarea>
      </div>

      <div>
        <p>Back</p>
        <textarea 
        placeholder="Back side of card"
        className="w-100"
        value={back}
        onChange={handleBack}>
        </textarea>
      </div>

      <div className="p-2">
        <button 
        className="bg-secondary text-light rounded mx-2"
        onClick={handleDone} >
          Done
        </button>
        <button 
       className="bg-primary text-light rounded mx-2"
        onClick={handleSave} >
          Save
        </button>
      </div>
    </>
  );
}

export default AddCard;
