export interface GetPlayerParams {
  playerId: number;
}

export interface GetSggPlayerParams {
  sggPlayerId: number;
}

export interface GetCmPlayerParams {
  cmPlayerId: string;
}

export interface GetBrawlhallaPlayerParams {
  brawlhallaId: number;
}

export interface GetPlayerTeammatesParams {
  playerId: number;
  nextToken?: string;
  isOfficial?: boolean;
  maxResults?: number;
}

export interface GetPlayerPRParams {
  playerId: number;
  gameMode: number;
}

export interface GetPlayerPlacementsParams {
  gameMode: number;
  isOfficial?: boolean;
  playerIds: number[];
  nextToken?: string;
  maxResults?: number;
}

export interface GetMatchupParams {
  entrant1PlayerIds: number[];
  entrant2PlayerIds?: number[];
  gameMode: number;
  nextToken?: string;
  maxResults?: number;
  isOfficial?: boolean;
}

export interface GetMatchupPlacementParams {
  entrant1PlayerIds: number[];
  entrant2PlayerIds: number[];
  gameMode: number;
  nextToken?: string;
  maxResults?: number;
  isOfficial?: boolean;
}

export interface GetPlayerLegendsParams {
  playerIds: number[];
  isOfficial?: boolean;
  year?: number;
  nextToken?: string;
  maxResults?: number;
}

export interface GetPlayerRecentLegendParams {
  playerId: number;
}

export interface SearchPlayersParam {
  query: string;
  nextToken?: string;
  maxResults?: number;
}

export interface GetPlayerMatchesParams {
  playerIds: number[];
  tournamentId: string;
}

export interface GetMatchupMatchesParam {
  tournamentId: string;
  entrant1PlayerIds: number[];
  entrant2PlayerIds?: number[];
}

export interface ListEventsParams {
  gameMode: number;
  nextToken?: string;
  maxResults?: number;
  isOfficial?: boolean;
  year?: number;
}

export interface ListPRParams {
  page?: number;
  maxResults?: number;
  gameMode: number;
  region: string;
  orderBy?: string;
}
