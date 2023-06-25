export type GetPlayerLegendParams = {
    playerId: number;
}

export type GetPlayerPRParams = {
    entrantSmashId: number;
    gameMode: number;
}

export type GetMatchupParams = {
    entrant1SmashIds: number[];
    entrant2SmashIds: number[];
    gameMode: number;
}

export type GetPlayerParams = {
    playerId: number;
}

export type GetBrawlhallaPlayerParams = {
    brawlhallaId: number;
}

export type GetPlayerEventMatchesParams = {
    entrantSmashId: number;
    slug: string;
}

export type GetPlayerEventsParams = {
    entrantSmashId: number;
    year: number;
    gameMode: number;
}

