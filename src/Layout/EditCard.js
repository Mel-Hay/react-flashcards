import { NavLink, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";
import FormComponent from "./FormComponent";

function EditCard() {
  const { cardId, deckId } = useParams();
  const [card, setCard] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [originalName, setOriginalName] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function fetchCards() {
      const data = await readCard(cardId);
      setCard(data);
      setFront(data.front);
      setBack(data.back);
    }
    fetchCards();
  }, [cardId]);

  useEffect(() => {
    async function fetchDeck() {
      const data = await readDeck(deckId);
      setOriginalName(data.name);
    }
    fetchDeck();
  }, [deckId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCard = await updateCard({ ...card, front, back });
    setCard(newCard);
    history.push(`/decks/${deckId}`);
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
          <NavLink className="text-decoration-none" to={`/decks/${deckId}`}>
            {originalName}
          </NavLink>
        </li>
        <li className="breadcrumb-item">Edit Card {cardId}</li>
      </ul>
      <h3>Edit Card</h3>
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

export default EditCard;
