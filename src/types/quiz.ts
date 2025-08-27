export type Letter = 'A' | 'B' | 'C' | 'D';
export type Heroine =
    | 'Glinda'
    | 'Christine'
    | 'Velma Kelly'
    | 'Elsa'
    | 'Veronica Sawyer'
    | 'Angelica Schuyler'
    | 'Mary Poppins'
    | 'Satine';

export type AnswerMap = Record<number, Letter>; // Q-number -> choice
export type Tally = Record<Heroine, number>;
