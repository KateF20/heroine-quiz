import { Letter } from '@/types/quiz';

export type Question = {
id: number;
title: string;
options: { letter: Letter; label: string }[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Opening night in Würzburg. What’s your pre-show ritual?",
    options: [
      { letter: 'A', label: 'Sparkly pep talk and a glittery good-luck charm.' },
      { letter: 'B', label: 'Quiet vocal warm-ups alone in the hall.' },
      { letter: 'C', label: 'Strut in with sunglasses and a killer one-liner.' },
      { letter: 'D', label: 'Centering breath in the wings, focus laser-sharp.' },
    ],
  },
  {
    id: 2,
    title: 'Your Taylor Swift “energy” today?',
    options: [
      { letter: 'A', label: '1989 sparkle and big-stage confidence.' },
      { letter: 'B', label: 'folklore/evermore wintery introspection and self-acceptance.' },
      { letter: 'C', label: 'Reputation: calling out the toxic, sharp and fearless.' },
      { letter: 'D', label: 'Speak Now: fast wordplay, brain on fire, heart on sleeve.' },
    ],
  },
  {
    id: 3,
    title: 'Post-show plan by the Main?',
    options: [
      { letter: 'A', label: 'Rooftop bar glam; lights, cameras, a touch of red.' },
      { letter: 'B', label: 'Vegan café hangout and a tiny good-deeds mission with friends.' },
      { letter: 'C', label: 'Late-night jazz club; you and the band trade barbs.' },
      { letter: 'D', label: 'Quiet river walk while mapping your next bold move.' },
    ],
  },
  {
    id: 4,
    title: 'As assistant director, your leadership vibe:',
    options: [
      { letter: 'A', label: 'High-gloss diplomacy—everyone feels seen and excited.' },
      { letter: 'B', label: 'Practical magic—notes are precise, morale stays high.' },
      { letter: 'C', label: 'No-nonsense showbiz: crisp blocking, sharper comebacks.' },
      { letter: 'D', label: 'Strategy first: smart debates, airtight vision.' },
    ],
  },
  {
    id: 5,
    title: 'Mid-rehearsal crisis. You:',
    options: [
      { letter: 'A', label: 'Step forward and carry the scene solo if needed.' },
      { letter: 'B', label: 'Shield the team, take responsibility, steady the room.' },
      { letter: 'C', label: 'Disarm the moment with charm and humor.' },
      { letter: 'D', label: 'Call out the bad behavior, set firm boundaries.' },
    ],
  },
  {
    id: 6,
    title: 'Gala outfit?',
    options: [
      { letter: 'A', label: 'Tailored suit with vintage flair.' },
      { letter: 'B', label: 'Ethereal gown with icy lines.' },
      { letter: 'C', label: 'Pastel couture with a statement headpiece.' },
      { letter: 'D', label: 'Red satin with a hint of danger.' },
    ],
  },
  {
    id: 7,
    title: 'With your younger sister, you’re mostly:',
    options: [
      { letter: 'A', label: 'The protector—calm, steady, always there.' },
      { letter: 'B', label: 'The mentor—turning chores into games and songs.' },
      { letter: 'C', label: 'The strategist—co-plotting big futures together.' },
      { letter: 'D', label: 'The truth-teller—fiercely honest, lovingly blunt.' },
    ],
  },
  {
    id: 8,
    title: 'Day off in Würzburg:',
    options: [
      { letter: 'A', label: 'Lazy vegan brunch → spontaneous kindness scavenger hunt.' },
      { letter: 'B', label: 'Archive stop → craft a razor-sharp letter to a theatre.' },
      { letter: 'C', label: 'Costume thrifting → improv choreo session with friends.' },
      { letter: 'D', label: 'Serenade on the Alte Mainbrücke with street musicians.' },
    ],
  },
  {
    id: 9,
    title: 'The spotlight is…',
    options: [
      { letter: 'A', label: 'A tool. The show must go on.' },
      { letter: 'B', label: 'Fun—I make it sparkle.' },
      { letter: 'C', label: 'Complicated—I reveal power when it counts.' },
      { letter: 'D', label: 'Nice, but I’d rather the work speak… until it’s solo time.' },
    ],
  },
  {
    id: 10,
    title: 'Your signature stage move:',
    options: [
      { letter: 'A', label: 'Perfectly timed wink and mic-drop pun.' },
      { letter: 'B', label: 'An impossibly pure, floating high note.' },
      { letter: 'C', label: 'A “how did that appear?” prop that saves the scene.' },
      { letter: 'D', label: 'A smoky, heart-cracking torch song.' },
    ],
  },
  {
    id: 11,
    title: 'Perfect date?',
    options: [
      { letter: 'A', label: 'Premiere-night glam at the theater, playful selfies, spontaneous karaoke duet.' },
      { letter: 'B', label: 'Opera balcony, vegan candlelit dinner, a handwritten note.' },
      { letter: 'C', label: 'After-hours jazz club; smoky duet; “we own the night.”' },
      { letter: 'D', label: 'Long walk over the Alte Mainbrücke, straight talk, plotting bold plans.' },
    ],
  },
  {
    id: 12,
    title: 'Travel vibe for a long weekend?',
    options: [
      { letter: 'A', label: 'Snowy escape north for winter lights and quiet cabins.' },
      { letter: 'B', label: 'London precision: matinee + parks + bookshops + tea; itinerary clicks.' },
      { letter: 'C', label: 'Berlin/NYC theatre sprint: three shows in two days, backstage hellos, late-night jazz.' },
      { letter: 'D', label: 'Spontaneous rail trip with friends to a festival; indie zines; a volunteer shift.' },
    ],
  },
];
