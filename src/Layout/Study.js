import {
    NavLink,
    useParams,
    useHistory,
  } from "react-router-dom";
  import React, { useState, useEffect } from "react";
  import { readDeck } from "../utils/api";
  
  function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [front, setFront] = useState([]);
    const [back, setBack] = useState([]);
    const [toggleFlip, setToggleFlip] = useState(true);
    const [indexNum, setIndexNum] = useState(0);
    const history = useHistory();
  
    useEffect(() => {
      function fetchDeck() {
        readDeck(deckId).then((data) => {
          setDeck(data);
          setCards(data.cards);
        });
      }
      fetchDeck();
    }, [deckId]);
  
    useEffect(() => {
      function mapCards() {
        const mappedFront = cards.map((card, index) => (
          <div className="my-2 p-2" key={card.id}>
            <div className="d-block">
              <h6 className="px-2">
                Card {index + 1} of {cards.length}
              </h6>
              <p className="px-2">{card.front}</p>
            </div>
            <div>
              <button
                className="bg-secondary text-light rounded mx-1"
                onClick={() => setToggleFlip(false)}
              >
                Flip
              </button>
            </div>
          </div>
        ));
        setFront(mappedFront);
  
        const mappedBack = cards.map((card, index) => (
          <div className="my-2 p-2" key={card.id}>
            <div className="d-block">
              <h6 className="px-2">
                Card {index + 1} of {cards.length}
              </h6>
              <p className="px-2">{card.back}</p>
            </div>
            <div className="">
              <button
                className="bg-secondary text-light rounded mx-1"
                onClick={() => setToggleFlip(true)}
              >
                Flip
              </button>
              <button
                className="bg-info text-light rounded mx-1"
                onClick={() => {
                  setIndexNum((indexNum) => indexNum + 1);
                  setToggleFlip(true);
                }}
              >
                Next
              </button>
            </div>
          </div>
        ));
        setBack(mappedBack);
        if (indexNum + 1 === cards.length && !toggleFlip) {
          if (window.confirm("Restart Cards? \n \nClick 'cancel' to return to the home page.")) {
            setIndexNum(0);
            history.push(`/decks/${deckId}/study`);
          } else {
            history.push("/");
          }
        }
      }
      mapCards();
    }, [cards, indexNum, toggleFlip, history, deckId]);

  if (cards.length < 3) {
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
              {deck.name}
            </NavLink>
          </li>
          <li className="breadcrumb-item">Study</li>
        </ul>
        <h3>{deck.name}: Study </h3>
        <h4>Not enough cards.</h4>
        <p>
          You need at least 3 cards to study. There are {cards.length} in this
          deck.
        </p>
        <button className="bg-primary text-light rounded mx-1">
          <NavLink
            className="text-decoration-none text-light"
            to={`/decks/${deck.id}/cards/new`}
          >
            {" "}
            Add Cards
          </NavLink>
        </button>
      </>
    );
  }
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
            {deck.name}
          </NavLink>
        </li>
        <li className="breadcrumb-item">Study</li>
      </ul>

      <h3>Study: {deck.name}  </h3>

      <div className="border">
        {toggleFlip ? front[indexNum] : back[indexNum]}
      </div>
    </>
  );
}

export default Study;
