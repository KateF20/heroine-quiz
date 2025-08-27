import { AnswerMap, Heroine, Letter, Tally } from '@/types/quiz';

export const SCORING: Record<number, Record<Letter, Heroine>> = {
  1: { A: 'Glinda', B: 'Christine', C: 'Velma Kelly', D: 'Elsa' },
  2: { A: 'Glinda', B: 'Elsa', C: 'Veronica Sawyer', D: 'Angelica Schuyler' },
  3: { A: 'Satine', B: 'Mary Poppins', C: 'Velma Kelly', D: 'Angelica Schuyler' },
  4: { A: 'Satine', B: 'Mary Poppins', C: 'Velma Kelly', D: 'Angelica Schuyler' },
  5: { A: 'Christine', B: 'Elsa', C: 'Glinda', D: 'Veronica Sawyer' },
  6: { A: 'Velma Kelly', B: 'Elsa', C: 'Glinda', D: 'Satine' },
  7: { A: 'Elsa', B: 'Mary Poppins', C: 'Angelica Schuyler', D: 'Veronica Sawyer' },
  8: { A: 'Mary Poppins', B: 'Veronica Sawyer', C: 'Velma Kelly', D: 'Christine' },
  9: { A: 'Satine', B: 'Glinda', C: 'Angelica Schuyler', D: 'Christine' },
  10:{ A: 'Veronica Sawyer', B: 'Christine', C: 'Mary Poppins', D: 'Satine' },
  11:{ A: 'Glinda', B: 'Christine', C: 'Satine', D: 'Angelica Schuyler' },
  12:{ A: 'Elsa', B: 'Mary Poppins', C: 'Velma Kelly', D: 'Veronica Sawyer' },
};

const HEROINES: Heroine[] = [
  'Glinda',
  'Christine',
  'Velma Kelly',
  'Elsa',
  'Veronica Sawyer',
  'Angelica Schuyler',
  'Mary Poppins',
  'Satine',
];

export function scoreQuiz(answers: AnswerMap) {
  const tally: Tally = Object.fromEntries(HEROINES.map(h => [h, 0])) as Tally;
  for (const [qnStr, letter] of Object.entries(answers)) {
    const qn = Number(qnStr);
    const hero = SCORING[qn][letter as Letter];
    tally[hero] += 1;
  }
  // Determine winners
  const max = Math.max(...Object.values(tally));
  let winners = HEROINES.filter(h => tally[h] === max);

  // Tie-breakers: Q1 then Q6
  if (winners.length > 1 && answers[1]) {
    const tb1 = SCORING[1][answers[1]];
    if (winners.includes(tb1)) winners = [tb1];
  }
  if (winners.length > 1 && answers[6]) {
    const tb2 = SCORING[6][answers[6]];
    if (winners.includes(tb2)) winners = [tb2];
  }

  return { tally, winner: winners[0] as Heroine };
}
