export interface GetPlayerParams {
  smashId: number
}

export interface GetBrawlhallaPlayerParams {
  brawlhallaId: number
}

export interface GetPlayerTeammatesParams {
  smashId: number
  nextToken?: string
  isOfficial?: boolean
  maxResults?: number
}

export interface GetPlayerPRParams {
  entrantSmashId: number
  gameMode: number
}

export interface GetPlayerPlacementsParams {
  gameMode: number
  isOfficial?: boolean
  entrantSmashIds: number[]
  nextToken?: string
  maxResults?: number
}

export interface GetMatchupParams {
  entrant1SmashIds: number[]
  entrant2SmashIds?: number[]
  gameMode: number
  nextToken?: string
  maxResults?: number
  isOfficial?: boolean
}

export interface GetMatchupPlacementParams {
  entrant1SmashIds: number[]
  entrant2SmashIds: number[]
  gameMode: number
  nextToken?: string
  maxResults?: number
  isOfficial?: boolean
}

export interface GetPlayerLegendsParams {
  entrantSmashIds: number[]
  isOfficial?: boolean
  year?: number
  nextToken?: string
  maxResults?: number
}

export interface GetPlayerRecentLegendParams {
  playerId: number
}

export interface SearchPlayersParam {
  query: string
  nextToken?: string
  maxResults?: number
}

export interface GetPlayerMatchesParams {
  entrantSmashIds: number[]
  slug: string
}

export interface GetMatchupMatchesParam {
  eventSlug?: string
  entrant1SmashIds: number[]
  entrant2SmashIds?: number[]
}

export interface ListEventsParams {
  gameMode: number
  nextToken?: string
  maxResults?: number
  isOfficial?: boolean
  year?: number
}

export interface ListPRParams {
  page?: number
  maxResults?: number
  gameMode: number
  region: string
  orderBy?: string
}
