export enum Module {
  HOME = 'HOME',
  VOCABULARY = 'VOCABULARY',
  GRAMMAR = 'GRAMMAR',
  WRITING = 'WRITING',
  LIVE_TUTOR = 'LIVE_TUTOR' // Speaking/Listening via Gemini Live
}

export interface VocabItem {
  czech: string;
  vietnamese: string;
  exampleCz: string;
  exampleVn: string;
  exampleEn: string;
  category: string;
}

export interface GrammarRule {
  title: string;
  description: string;
  examples: { cz: string; vn: string }[];
}