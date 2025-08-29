import { AnswerMap, Heroine, Letter, Tally } from '@/types/quiz';

export const SCORING: Record<number, Record<Letter, Heroine>> = {
  // Mapping entsprechend der abgesprochenen Zuordnung
  1:  { A: 'Christine', B: 'Satine',      C: 'Mary Poppins',   D: 'Elphaba' },
  2:  { A: 'Satine',    B: 'Elsa',        C: 'Angelica Schuyler', D: 'Maria' },
  3:  { A: 'Maria',     B: 'Elphaba',     C: 'Sally',          D: 'Angelica Schuyler' },
  4:  { A: 'Christine', B: 'Angelica Schuyler', C: 'Sally',    D: 'Elphaba' },
  5:  { A: 'Maria',     B: 'Christine',   C: 'Maureen',        D: 'Elsa' },
  6:  { A: 'Lydia',     B: 'Elphaba',     C: 'Velma',          D: 'Mary Poppins' },
  7:  { A: 'Velma',     B: 'Elsa',        C: 'Christine',      D: 'Satine' },
  8:  { A: 'Elsa',      B: 'Mary Poppins', C: 'Angelica Schuyler', D: 'Lydia' },
  9:  { A: 'Christine', B: 'Velma',       C: 'Mary Poppins',   D: 'Satine' },
  10: { A: 'Maria',     B: 'Christine',   C: 'Angelica Schuyler', D: 'Maureen' },
  11: { A: 'Mary Poppins', B: 'Maureen',  C: 'Elsa',           D: 'Maria' },
  12: { A: 'Lydia',     B: 'Elsa',        C: 'Sally',          D: 'Mary Poppins' },
};

const HEROINES: Heroine[] = [
  'Elphaba',
  'Christine',
  'Maria',
  'Velma',
  'Sally',
  'Elsa',
  'Satine',
  'Angelica Schuyler',
  'Mary Poppins',
  'Lydia',
  'Maureen',
];

export function scoreQuiz(answers: AnswerMap) {
  const tally: Tally = Object.fromEntries(HEROINES.map(h => [h, 0])) as Tally;

  for (const [qnStr, letter] of Object.entries(answers)) {
    const qn = Number(qnStr);
    const hero = SCORING[qn][letter as Letter];
    tally[hero] += 1;
  }

  const max = Math.max(...Object.values(tally));
  let winners = HEROINES.filter(h => tally[h] === max);

  // Tiebreaker: Q1, dann Q7
  if (winners.length > 1 && answers[1]) {
    const tb1 = SCORING[1][answers[1] as Letter];
    if (winners.includes(tb1)) winners = [tb1];
  }
  if (winners.length > 1 && answers[7]) {
    const tb2 = SCORING[7][answers[7] as Letter];
    if (winners.includes(tb2)) winners = [tb2];
  }

  return { tally, winner: winners[0] as Heroine };
}
