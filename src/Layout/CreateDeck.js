import {
  NavLink,
  useHistory
} from "react-router-dom";
import React, { useState } from "react";
import { createDeck } from "../utils/api";
function NewDeck() {
 const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const history = useHistory();
  const [deck, setDeck] = useState({
    "name":name,
    "description":description
  });
 
 const handleName = (event) =>{
  setName(event.target.value)
  console.log(name)
  setDeck({
    ...deck,
    "name":event.target.value,
    
  })
 }
 const handleDescription = (event) =>{
  setDescription(event.target.value)
  console.log(description)
  setDeck({
    ...deck,
    "description":event.target.value
  })
 }

 const handleCreate = async () => {
  const newDeck = await createDeck(deck);
  setDeck(newDeck);
  history.push(`/decks/${newDeck.id}`);
};

  return (
    <>
      <ul className="breadcrumb bg-light rounded p-2 ">
        <li className="breadcrumb-item">
          <NavLink className="text-decoration-none" to="/">Home</NavLink>
        </li>
        <li className="breadcrumb-item">Create Deck</li>
      </ul>
      <h3>Create Deck</h3>
      <div>
        <p className="my-0">Name</p>
        <input 
        onChange={handleName}
        placeholder="Deck Name"
        type="text"
        className="w-100"
        ></input>
      </div>

      <div className="py-2 my-0">
        <p className="my-0">Description</p>
        <textarea
        onChange={handleDescription} 
        placeholder="Brief description of the deck" 
        type="textarea"
        className="w-100"
        ></textarea>
      </div>
      <div className="py-2 ">
        <button className="bg-secondary mx-1 rounded"><NavLink className="text-decoration-none text-light" to="/">Cancel</NavLink></button>
        <button  
        className="bg-primary text-light mx-1 rounded"
        onClick={()=>handleCreate(deck)}
        >
          Submit
        </button>

      </div>
    </>
  );
}

export default NewDeck;
