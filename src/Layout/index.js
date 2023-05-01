import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
// eslint-disable-next-line
import {Route, Path, Switch} from "react-router-dom"
import NewDeck from "./CreateDeck";
import Study from "./Study"
import Deck from "./DeckView"
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";



function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          
          <Route exact path="/">
            <Home />          
          </Route>
          
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/new">
            <NewDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
            
        </Switch>
      
      </div>
    </>
  );
}

export default Layout;
