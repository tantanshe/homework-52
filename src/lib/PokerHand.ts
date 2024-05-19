import Card from './Card';

class PokerHand {
  private hand: Card[];

  constructor(hand: Card[]) {
    this.hand = hand;
  }

  private static getCardValue(card: Card): number {
    const rankValue: { [key: string]: number } = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14,
    };
    return rankValue[card.rank];
  }

  // Проверка на роял-флэш
  private isRoyalFlush(): boolean {
    const royalRanks = ['10', 'J', 'Q', 'K', 'A'];
    const suits = this.hand.map(card => card.suit);
    const ranks = this.hand.map(card => card.rank);
    return new Set(suits).size === 1 && royalRanks.every(rank => ranks.includes(rank));
  }

  // Проверка на стрит-флэш
  private isStraightFlush(): boolean {
    return this.isFlush() && this.isStraight();
  }

  // Проверка на каре
  private isFourOfAKind(): boolean {
    const rankCounts = this.hand.reduce((counts, card) => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
    return Object.values(rankCounts).includes(4);
  }

  // Проверка на фулл-хаус
  private isFullHouse(): boolean {
    const rankCounts = this.hand.reduce((counts, card) => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
    const values = Object.values(rankCounts);
    return values.includes(3) && values.includes(2);
  }

  // Проверка на флэш
  private isFlush(): boolean {
    const suits = this.hand.map(card => card.suit);
    return new Set(suits).size === 1;
  }

  // Проверка на стрит
  private isStraight(): boolean {
    const sortedValues = this.hand
      .map(PokerHand.getCardValue)
      .sort((a, b) => a - b);
    const uniqueValues = [...new Set(sortedValues)];
    if (uniqueValues.length !== 5) return false;
    const isSequential = uniqueValues.every((val, i) => i === 0 || val === uniqueValues[i - 1] + 1);
    const isAceLowStraight = JSON.stringify(uniqueValues) === JSON.stringify([2, 3, 4, 5, 14]);
    return isSequential || isAceLowStraight;
  }

  private isThreeOfAKind(): boolean {
    const rankCounts = this.hand.reduce((counts, card) => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
    return Object.values(rankCounts).includes(3);
  }

  private isTwoPair(): boolean {
    const rankCounts = this.hand.reduce((counts, card) => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
    return Object.values(rankCounts).filter(count => count === 2).length === 2;
  }

  private isOnePair(): boolean {
    const rankCounts = this.hand.reduce((counts, card) => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
    return Object.values(rankCounts).includes(2);
  }

  public getOutcome(): string {
    if (this.isRoyalFlush()) return 'Роял-флэш';
    if (this.isStraightFlush()) return 'Стрит-флэш';
    if (this.isFourOfAKind()) return 'Каре';
    if (this.isFullHouse()) return 'Фулл-хаус';
    if (this.isFlush()) return 'Флэш';
    if (this.isStraight()) return 'Стрит';
    if (this.isThreeOfAKind()) return 'Тройка';
    if (this.isTwoPair()) return 'Две пары';
    if (this.isOnePair()) return 'Одна пара';
    return 'Нет комбинации';
  }
}

export default PokerHand;