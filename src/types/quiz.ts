export type Letter = 'A' | 'B' | 'C' | 'D';
export type Heroine =
  | 'Elphaba'
  | 'Christine'
  | 'Maria'              // West Side Story
  | 'Velma'
  | 'Sally'
  | 'Elsa'
  | 'Satine'
  | 'Angelica Schuyler'
  | 'Mary Poppins'
  | 'Lydia'
  | 'Maureen';

export type AnswerMap = Record<number, Letter>;
export type Tally = Record<Heroine, number>;
