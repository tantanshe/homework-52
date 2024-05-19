import React from 'react';

interface Props {
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  suit: 'diams' | 'hearts' | 'clubs' | 'spades';
}

const suitSymbols: { [key: string]: string } = {
  diams: '♦',
  hearts: '♥',
  clubs: '♣',
  spades: '♠'
};

const Card: React.FC<Props> = ({rank, suit}) => {
  return (
    <span className={`card rank-${rank.toLowerCase()} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{suitSymbols[suit]}</span>
    </span>
  );
};

export default Card;