import React from "react";
import {
    useParams,
    useHistory,
  } from "react-router-dom";
function FormComponent({ front, setFront, back, setBack, handleSubmit }) {
    const { deckId } = useParams();
    const history = useHistory();
    const handleDone = () => history.push(`/decks/${deckId}`);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="front">Front</label>
        <br />
        <textarea
          id="front"
          name="front"
          placeholder="Front side of card"
          className="w-100"
          value={front}
          onChange={(e) => setFront(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor="back">Back</label>
        <br />
        <textarea
          id="back"
          name="back"
          placeholder="Back side of card"
          className="w-100"
          value={back}
          onChange={(e) => setBack(e.target.value)}
        ></textarea>
      </div>

      <div className="p-2">
        <button onClick={handleDone} className="bg-secondary text-light rounded mx-2" type="button">
          Cancel
        </button>
        <button className="bg-primary text-light rounded mx-2" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormComponent;
