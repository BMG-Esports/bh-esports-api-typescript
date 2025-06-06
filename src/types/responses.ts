export interface PlayerResponse {
  playerId: number;
  sggPlayerId: number;
  cmPlayerId: number;
  brawlhallaId: number;
  name: string;
  twitch: string;
  twitter: string;
  pronoun: string;
  country: string;
}

export interface GetPlayerResponse {
  player: PlayerResponse;
}

export interface GetPlayerTeammatesReponse {
  playerTeammates: Array<{
    player: PlayerResponse;
    games: number;
    lastTeamedDate: number;
  }>;
  nextToken?: string;
}

export interface PRInformationResponse {
  top8: number;
  top32: number;
  gold: number;
  silver: number;
  bronze: number;
  powerRanking: number;
  region: string;
}

export interface GetPlayerPRResponse {
  earnings: number;
  pr: PRInformationResponse;
}

export interface TournamentResponse {
  id: string;
  tournamentName: string;
  eventName: string;
  year: number;
  isOfficial: boolean;
  isTwos: boolean;
  startTime: number;
  host: "SGG" | "CM";
}

export interface GetPlayerPlacementsResponse {
  playerPlacements: Array<{
    placement: number;
    tournament: TournamentResponse;
  }>;
  nextToken?: string;
}

export interface GetPlayerMatchesResponse {
  playerMatches: Array<{
    matchId: number;
    scores: [number, number];
    legends: string[][];
    maps: string[];
    opponent: PlayerResponse[];
  }>;
}

export interface LegendResponse {
  name: string;
  count: number;
}

export interface GetPlayerLegendsResponse {
  legends: LegendResponse[];
  nextToken?: string;
}

export interface GetRecentPlayerLegendResponse {
  legend: LegendResponse;
}

export interface SearchPlayersResponse {
  searchPlayers: Array<{
    player: PlayerResponse;
    pr1v1: number;
    pr2v2: number;
    region: string;
    top32: number;
    top8: number;
    gold: number;
    silver: number;
    bronze: number;
    earnings: number;
  }>;
  nextToken?: string;
}

export interface GetMatchupResponse {
  matchups: Array<{
    matches: [number, number];
    games: [number, number];
    opponent: PlayerResponse[];
  }>;
  nextToken?: string;
}

export interface GetMatchupPlacementsResponse {
  matchupPlacements: Array<{
    placements: number[];
    tournament: TournamentResponse;
  }>;
  nextToken?: string;
}

export interface GetMatchupMatchesResponse {
  matchupMatches: Array<{
    matchId: number;
    scores: number[];
    legends: string[][];
    maps: string[];
  }>;
}

export interface ListEventsResponse {
  tournaments: TournamentResponse[];
  nextToken?: string;
}

export interface ListPRResponse {
  prPlayers: Array<{
    playerId: number;
    playerName: string;
    twitter: string;
    twitch: string;
    top8: number;
    top32: number;
    gold: number;
    silver: number;
    bronze: number;
    powerRanking: number;
    points: number;
    earnings: number;
  }>;
  totalPages: number;
}
