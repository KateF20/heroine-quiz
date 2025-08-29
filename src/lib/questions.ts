import { Letter } from '@/types/quiz';

export type Question = {
  id: number;
  title: string;
  options: { letter: Letter; label: string }[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Premierenabend in Würzburg – was ist dein Pre-Show-Ritual?',
    options: [
      { letter: 'A', label: 'Fünf tiefe Atemzüge im leeren Saal oder hinter den Kulissen.' },
      { letter: 'B', label: 'Glitzer-Talisman antippen, Crew-Umarmung, „toi-toi-toi“ im Flur.' },
      { letter: 'C', label: 'Als Regieassistenz letzte Cues checken, kurze, ruhige Ansage an alle.' },
      { letter: 'D', label: 'Einmal allein auf die Bühne, Raum fühlen, Blick ins Publikum.' },
    ],
  },
  {
    id: 2,
    title: 'Welche Swiftie bist du heute?',
    options: [
      { letter: 'A', label: '1989 – Großstadtglanz, Pop-Confidence, du funkelst.' },
      { letter: 'B', label: 'folklore/evermore – Winterluft, intime Geschichten, sanfte Klarheit.' },
      { letter: 'C', label: 'Reputation – Grenzen klar, bissiger Witz, zero nonsense.' },
      { letter: 'D', label: 'Speak Now – schnelle Worte, Herz voran, mutiger Purpur.' },
    ],
  },
  {
    id: 3,
    title: 'Als Regieassistenz – wie führst du dein Team?',
    options: [
      { letter: 'A', label: 'Weise Assistentin: viel Wärme, klare Blicke, alle fühlen sich gesehen.' },
      { letter: 'B', label: 'Struktur-Ninja: Call-Sheets, Plan B–D, zack-zack, Timing auf die Sekunde.' },
      { letter: 'C', label: 'Humor-Lösung: ein witziger Spruch, freundlicher Wink – und plötzlich läuft’s.' },
      { letter: 'D', label: 'Strategin: deutliche Fragen, elegante Entscheidungen, Fokus auf Story.' },
    ],
  },
  {
    id: 4,
    title: 'Mitten in der Probe brennt’s – was tust du zuerst?',
    options: [
      { letter: 'A', label: 'Ich springe rein und trage die Szene notfalls allein.' },
      { letter: 'B', label: 'Ich sammle das Ensemble, teile Schritte ein, sichere die Basics.' },
      { letter: 'C', label: 'Ich entgifte die Situation mit Witz und improvisiere einen Fix.' },
      { letter: 'D', label: 'Ich benenne das Problem klar und setze feine, feste Grenzen.' },
    ],
  },
  {
    id: 5,
    title: 'Girl Night Out in Würzburg – wie fühlt sich euer Abend an?',
    options: [
      { letter: 'A', label: 'Aufwärmen mit Karaoke, dann Tanzkeller-Energie bis die Beine weich sind.' },
      { letter: 'B', label: 'Langer Talk am Tisch, kleine Cocktail-Rituale, lautes Lachen, innere Kreise.' },
      { letter: 'C', label: 'Themen-Outfits, Mini-Performance zwischendurch, nächtliche Foto-Safari.' },
      { letter: 'D', label: 'Brückenspaziergang, Sternenhimmel, danach leiser Küchen-Aftertalk.' },
    ],
  },
  {
    id: 6,
    title: 'Freier Tag – dein Würzburg-Programm?',
    options: [
      { letter: 'A', label: 'Café-Notizbuch, später Flohmarkt-Funde und Vinyl.' },
      { letter: 'B', label: 'Alte Mainbrücke, Sonne im Gesicht, Skizzen für die nächste Inszenierung.' },
      { letter: 'C', label: 'In der Theater Werkstatt reinschnuppern und eine Probe schauen.' },
      { letter: 'D', label: 'Vegan kochen mit Freundinnen, abends Brettspielerunde und Musik.' },
    ],
  },
  {
    id: 7,
    title: 'Gala-Outfit – wenn’s glitzern darf, was ziehst du an?',
    options: [
      { letter: 'A', label: 'Maßgeschneiderter Anzug mit Vintage-Twist, lässig makellos.' },
      { letter: 'B', label: 'Eisiger Couture-Fluss, klare Linien, stille Autorität.' },
      { letter: 'C', label: 'Pastell-Couture mit Statement-Headpiece – ein Augenzwinkern in Seide.' },
      { letter: 'D', label: 'Tiefes Rot, Old-Hollywood-Silhouette, eine Spur Drama.' },
    ],
  },
  {
    id: 8,
    title: 'Mit Emilia – welche Rolle hast du?',
    options: [
      { letter: 'A', label: 'Die Beschützerin: ruhig, standhaft, „ich bin da“.' },
      { letter: 'B', label: 'Die Mentorin: du machst aus Alltag kleine Lerngeschichten.' },
      { letter: 'C', label: 'Die Mit-Planerin: ihr spinnt Zukunftspläne wie Profis.' },
      { letter: 'D', label: 'Der Spiegel: liebevoll ehrlich, du sagst die Dinge, die zählen.' },
    ],
  },
  {
    id: 9,
    title: 'Dein Signature-Move auf der Bühne?',
    options: [
      { letter: 'A', label: 'Eine perfekte hohe Note, die den Raum für einen Herzschlag stilllegt.' },
      { letter: 'B', label: 'Mic-Drop-Pun, Vorhang zu.' },
      { letter: 'C', label: 'Eine kleine „Wie ist das da hingekommen?“-Geste.' },
      { letter: 'D', label: 'Ein leises Torch-Song-Moment – Mikro-Pause, Blick, Seele offen.' },
    ],
  },
  {
    id: 10,
    title: 'Perfect Date – wo und wie?',
    options: [
      { letter: 'A', label: 'Spaziergang bei Mondlicht, tiefer Talk, gemeinsam Sonnenaufgang schauen.' },
      { letter: 'B', label: 'Zuhause: zusammen kochen, Vinyl knistern, ein ruhiger Abend.' },
      { letter: 'C', label: 'Kultur-Duo: Museum + Matinee, ich mag, was du magst.' },
      { letter: 'D', label: 'Jazz/Poetry-Night-Vibes irgendwo, danach barfuß tanzen – wo gerade Musik ist.' },
    ],
  },
  {
    id: 11,
    title: 'Reise-Vibe fürs lange Wochenende?',
    options: [
      { letter: 'A', label: 'London: Musical-Crawl, Parks, Buchläden, Nachmittagstee.' },
      { letter: 'B', label: 'Berlin/NYC: ultramoderne Ausstellungen, Drag-Shows, Nachtclubs.' },
      { letter: 'C', label: 'Alpen/Hütte: Schnee, Lesen, Schreiben, Atem holen.' },
      { letter: 'D', label: 'Festival-Roadtrip: Freundeskreis, Zelte, tanzen, singen, springen – wild gehen.' },
    ],
  },
  {
    id: 12,
    title: 'Themenparty – welcher Twist reizt dich am meisten?',
    options: [
      { letter: 'A', label: 'Alphabet-Gala: komm als etwas, das mit deinem Anfangsbuchstaben beginnt – Bonus, wenn auch Drink/Snack passen.' },
      { letter: 'B', label: 'Monochrome Muse: jede*r in exakt einer Farbe – Drinks & Playlist passend zum Ton.' },
      { letter: 'C', label: 'Zeitreise-Revue: 20er-Flapper, 50er-Silhouette, 80er-Neon – Mini-Acts pro Ära.' },
      { letter: 'D', label: '„Backstage Bag“: alle bringen eine Requisite zur Figur – Impro-Mini-Szenen im Wohnzimmer.' },
    ],
  },
];
