import { NavLink, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";

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


  const handleFront = (event) => {
    setFront(event.target.value);
    setCard({
      ...card,
      front: event.target.value,
    });
  };
  const handleBack = (event) => {
    setBack(event.target.value);
    setCard({
      ...card,
      back: event.target.value,
    });
  };

  const handleEdit = async () => {
    const newCard = await updateCard(card);
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
      <div>
        <p className="my-0">Front</p>
        <textarea
          onChange={handleFront}
          value={front}
          className="w-100"
        ></textarea>
      </div>

      <div className="py-2 my-0">
        <p className="my-0">Back</p>
        <textarea
          onChange={handleBack}
          value={back}
          className="w-100"
        ></textarea>
      </div>
      <div className="py-2 ">
        <button className="bg-secondary mx-1 rounded">
          <NavLink
            className="text-decoration-none text-light"
            to={`/decks/${deckId}`}
          >
            Cancel
          </NavLink>
        </button>
        <button
          className="bg-primary text-light mx-1 rounded"
          onClick={handleEdit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default EditCard;
