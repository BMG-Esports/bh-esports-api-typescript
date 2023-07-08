export type GetPlayerParams = {
    smashId: number;
}

export type GetBrawlhallaPlayerParams = {
    brawlhallaId: number;
}

export type GetPlayerTeammatesParams = {
    smashId: number;
    isOfficial: boolean;
    maxResults: number;
}


export type GetPlayerPRParams = {
    entrantSmashId: number;
    gameMode: number;
}

export type GetPlayerListSmashIdParams = {
    smashIds: number[];
}

export type GetPlayerListBhIdParams = {
    bhIds: number[];
}


export type GetPlayerPlacementsParams = {
    gameMode: number;
    isOfficial: boolean;
    entrantSmashIds: number[];
    nextToken: string;
    maxResults: number;
}

export type GetMatchupParams = {
    entrant1SmashIds: number[];
    entrant2SmashIds: number[];
    gameMode: number;
    nextToken: string;
    maxResults: number;
    isOfficial: boolean;
}

export type GetPlayerLegendsParams = {
    entrantSmashIds: number[];
    isOfficial: boolean;
    year: number;
    nextToken: string;
    maxResults: number;
}

export type GetRecentPlayerLegendParams = {
    playerId: number;
}

export type SearchPlayersParam = {
    query: string;
    nextToken: string;
    maxResults: number;
}

export type GetPlayerMatchesParams = {
    entrantSmashId: number;
    slug: string;
}


export type GetMatchupMatchesParam = {
    eventSlug: string;
    entrant1SmashIds: number[];
    entrant2SmashIds: number[];
}

export type ListEventsParams = {
    gameMode: number;
    nextToken: string;
    maxResults: number;
    isOfficial: boolean;
    year: number;
}


export type GetPRParams = {
    page: number;
    maxResults: number;
    gameMode: number;
    region: string;
    table: string;
    orderBy: string;
}

