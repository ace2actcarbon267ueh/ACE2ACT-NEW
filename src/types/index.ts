export type ActiveSection = 'home' | 'research' | 'library' | 'survey' | 'tools' | 'contact' | 'admin';

export interface Milestone {
  date: string;
  phase: string;
  title: string;
  description: string;
  keyMetric: string;
}

export interface ResearchGap {
  category: 'Thực tiễn' | 'Lý thuyết';
  title: string;
  problem: string;
  solutionInStudy: string;
}

export interface Finding {
  id: string;
  title: string;
  englishTerm: string;
  shortDesc: string;
  fullAnalysis: string;
  implication: string;
  percentageStat?: string;
  quote?: string;
}

export interface SurveyState {
  ageGroup: string;
  traveledPastYear: string;
  carbonOffsetUnderstanding: string;
  trustFactor: string;
  willingnessToContribute: string;
  biggestBarrier: string;
}

export interface SimulationConfig {
  framing: 'guilt' | 'hope_pride';
  costSharing: 'tourist_100' | 'shared_50_50' | 'business_match';
  transparency: 'basic_claim' | 'qr_verified_data';
  userExperience: 'complex_redirect' | 'seamless_one_click';
}
