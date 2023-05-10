import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api";
import FormComponent from "./FormComponent";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  function fetchDecks() {
    readDeck(deckId).then((data) => setDeck(data));
  }
  useEffect(fetchDecks, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = { front, back };
    await createCard(deckId, card);
    setFront("");
    setBack("");
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

      <FormComponent
        front={front}
        setFront={setFront}
        back={back}
        setBack={setBack}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AddCard;
