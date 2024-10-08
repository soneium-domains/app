import React, { ReactNode } from 'react';

export interface State<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

export interface PrimaryName {
  nftAddress?: string;
  name?: string | undefined;
}

export interface ObjectItem {
  key: string;
  value?: string;
}

export interface SelectOptionType {
  label?: string;
  value: string;
}

export interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

export interface Styles {
  height?: string;
  shadow?: string;
  popup?: boolean;
  radius?: string;
  size?: 'sm' | 'md' | 'lg';
  nolink?: boolean;
  scanLink?: boolean;
  icon?: string;
  color?: string;
  bg?: string;
  vertical?: boolean;
  nav?: boolean;
  navColor?: string;
  network?: string;
  order?: number;
  type?: string;
  mode?: string;
  note?: string;
  variant?: string;
  round?: string;
  eth?: string;
  btc?: string;
  pol?: string;
  arb?: string;
  op?: string;
  slides?: number;
  centered?: boolean;
  auto?: boolean;
  effect?: string;
  position?: string;
  font?: string;
  
}

export interface CustomLink {
  type: string;
  title: string;
  url: string;
  image: string;
  content: string;
  styles?: Styles;
}

export interface LinkType {
  type: string;
  av: boolean;
  reg: string | RegExp;
}

export interface BgColorItem {
  color: string;
  lightMode: boolean;
}

export interface BgImageItem {
  bg: string;
  lightMode: boolean;
}

export interface SortableConProps {
  children: ReactNode;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: any; newIndex: any }) => void;
  useDragHandle: true;
}

export interface SortableItemProps {
  children: ReactNode;
  index: number;
}

export type Trophies = {
  total: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
};

export type Stats = {
  gamesPlayed: number;
  completedGames: number;
  completionRate: string;
  unearnedTrophies: number;
  trophiesPerDay: string;
  views: number;
  worldRank: string;
  countryRank: string;
};

export type Trophy = {
  name: string;
  description: string;
  game: string;
  rarity: string;
  type: string;
  imageUrl: string;
};

export type Game = {
  name: string;
  platform: string;
  trophies: {
    total: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  completion: string;
  rank: string;
  imageUrl: string;
};

export type RarestTrophy = {
  name: string;
  game: string;
  rarity: string;
  type: string;
  imageUrl: string;
};

export type TrophyMilestone = {
  name: string;
  game: string;
  milestone: string;
  timeAgo: string;
  imageUrl: string;
};

export type PSNProfileData = {
  username: string;
  avatar: string;
  level: number;
  levelProgress: string;
  comment: string;
  trophies: Trophies;
  stats: Stats;
  recentTrophies: Trophy[];
  games: Game[];
  rarestTrophies: RarestTrophy[];
  trophyMilestones: TrophyMilestone[];
};