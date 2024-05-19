import './App.css';
import {useState} from 'react';
import Card from './lib/Card';
import CardDeck from './lib/CardDeck';
import CardComponent from './components/Card/MyCard';

const App = () => {
  const [deck, setDeck] = useState<CardDeck | null>(null);
  const [hand, setHand] = useState<Card[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const dealCards = () => {
    let currentDeck = deck;

    if (!currentDeck) {
      currentDeck = new CardDeck();
      setDeck(currentDeck);
    }

    if (currentDeck.cards.length < 5) {
      setGameOver(true);
      return;
    }

    const newHand = currentDeck.getCards(5);
    setHand(newHand);

    if (currentDeck.cards.length === 0) {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setDeck(null);
    setHand([]);
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>Card Game</h1>
      {gameOver ? (
        <button onClick={restartGame}>Начать заново</button>
      ) : (
        <>
          {hand.length === 0 ? (
            <button onClick={dealCards}>Раздать карты</button>
          ) : (
            <div>
              <button onClick={dealCards}>Раздать карты</button>
              <div className="playingCards faceImages">
                {hand.map((card, index) => (
                  <CardComponent key={index} rank={card.rank} suit={card.suit} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
