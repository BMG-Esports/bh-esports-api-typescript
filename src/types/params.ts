export type GetPlayerParams = {
    smashId: number;
}

export type GetBrawlhallaPlayerParams = {
    brawlhallaId: number;
}

export type DescribePlayerTeammatesParams = {
    smashId: number;
    nextToken?: string;
    isOfficial?: boolean;
    maxResults?: number;
}


export type DescribePlayerPRParams = {
    entrantSmashId: number;
    gameMode: number;
}

export type ListSmashPlayersParams = {
    smashIds: number[];
}

export type ListBrawlhallaPlayersParams = {
    bhIds: number[];
}


export type DescribePlayerPlacementsParams = {
    gameMode: number;
    isOfficial?: boolean;
    entrantSmashIds: number[];
    nextToken?: string;
    maxResults?: number;
}

export type DescribeMatchupParams = {
    entrant1SmashIds: number[];
    entrant2SmashIds?: number[];
    gameMode: number;
    nextToken?: string;
    maxResults?: number;
    isOfficial?: boolean;
}

export type DescribeMatchupPlacementParams = {
    entrant1SmashIds: number[];
    entrant2SmashIds: number[];
    gameMode: number;
    nextToken?: string;
    maxResults?: number;
    isOfficial?: boolean;
}

export type DescribePlayerLegendsParams = {
    entrantSmashIds: number[];
    isOfficial?: boolean;
    year?: number;
    nextToken?: string;
    maxResults?: number;
}

export type DescribePlayerRecentLegendParams = {
    playerId: number;
}

export type SearchPlayersParam = {
    query: string;
    nextToken?: string;
    maxResults?: number;
}

export type DescribePlayerMatchesParams = {
    entrantSmashId: number;
    slug: string;
}


export type DescribeMatchupMatchesParam = {
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
    table?: string;
    orderBy?: string;
}

