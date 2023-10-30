export type GetPlayerParams = {
    smashId: number;
}

export type GetBrawlhallaPlayerParams = {
    brawlhallaId: number;
}

export type GetPlayerTeammatesParams = {
    smashId: number;
    nextToken?: string;
    isOfficial?: boolean;
    maxResults?: number;
}

export type GetPlayerPRParams = {
    entrantSmashId: number;
    gameMode: number;
}

export type GetPlayerPlacementsParams = {
    gameMode: number;
    isOfficial?: boolean;
    entrantSmashIds: number[];
    nextToken?: string;
    maxResults?: number;
}

export type GetMatchupParams = {
    entrant1SmashIds: number[];
    entrant2SmashIds?: number[];
    gameMode: number;
    nextToken?: string;
    maxResults?: number;
    isOfficial?: boolean;
}

export type GetMatchupPlacementParams = {
    entrant1SmashIds: number[];
    entrant2SmashIds: number[];
    gameMode: number;
    nextToken?: string;
    maxResults?: number;
    isOfficial?: boolean;
}

export type GetPlayerLegendsParams = {
    entrantSmashIds: number[];
    isOfficial?: boolean;
    year?: number;
    nextToken?: string;
    maxResults?: number;
}

export type GetPlayerRecentLegendParams = {
    playerId: number;
}

export type SearchPlayersParam = {
    query: string;
    nextToken?: string;
    maxResults?: number;
}

export type GetPlayerMatchesParams = {
    entrantSmashIds: number[];
    slug: string;
}

export type GetMatchupMatchesParam = {
    eventSlug?: string;
    entrant1SmashIds: number[];
    entrant2SmashIds?: number[];
}

export type ListEventsParams = {
    gameMode: number;
    nextToken?: string;
    maxResults?: number;
    isOfficial?: boolean;
    year?: number;
}


export type ListPRParams = {
    page?: number;
    maxResults?: number;
    gameMode: number;
    region: string;
    orderBy?: string;
}

