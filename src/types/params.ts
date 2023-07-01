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

export type GetPlayerTeammatesParams = {
    smashId: number;
}

export type GetPlayerListSmashIdParams = {
    smashIds: number[];
}

export type GetPlayerListBhIdParams = {
    bhIds: number[];
}

export type GetPlayerLegendsParams = {
    entrantSmashId: number;
    year: number;
}

export type SearchPlayersParam = {
    query: string;
}

export type GetMatchupMatchesParam = {
    eventSlug: string;
    entrant1SmashIds: number[];
    entrant2SmashIds: number[];
}

export type ListEventsParams = {
    gameMode: number;
}

export type GetStatParams = {
    gameMode: number;
    statType: StatType;
}

enum StatType {
    MostUsed = "MOST_USED_SIG",
	MostPlayedWeapon = "MOST_PLAYED_WEAPON",
	AverageDamage = "AVERAGE_DAMAGE",
	AverageJumps = "AVERAGE_JUMPS",
	SetWinsPerYear = "SET_WINS_PER_YEAR"
}

export type GetPRParams = {
    gameMode: number;
    region: string;
}

