import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalName, setOriginalName] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function fetchDecks() {
      const data = await readDeck(deckId);
      setDeck(data);
      setName(data.name);
      setOriginalName(data.name);
      setDescription(data.description);
    }

    fetchDecks();
  }, [deckId]);

  const handleName = (event) => {
    setName(event.target.value);
    console.log(name);
    setDeck({
      ...deck,
      name: event.target.value,
    });
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
    console.log(description);
    setDeck({
      ...deck,
      description: event.target.value,
    });
  };

  const handleEdit = async () => {
    const newDeck = await updateDeck(deck);
    setDeck(newDeck);
    history.push(`/decks/${deck.id}`);
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
        <li className="breadcrumb-item">Edit Deck</li>
      </ul>
      <h3>Edit Deck</h3>
      <div>
        <p className="my-0">Name</p>
        <input
          onChange={handleName}
          value={name}
          type="text"
          className="w-100"
        ></input>
      </div>

      <div className="py-2 my-0">
        <p className="my-0">Description</p>
        <textarea
          onChange={handleDescription}
          value={deck.description}
          type="textarea"
          className="w-100"
        ></textarea>
      </div>
      <div className="py-2 ">
        <button className="bg-secondary mx-1 rounded">
          <NavLink className="text-decoration-none text-light" to="/">
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

export default EditDeck;
