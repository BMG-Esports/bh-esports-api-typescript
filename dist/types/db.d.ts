export type GetPlayerResponse = {
    player: {
        smashId: number;
        brawlhallaId: number;
        name: string;
    };
};
export type PRInformationResponse = {
    top8: number;
    top32: number;
    gold: number;
    silver: number;
    bronze: number;
    powerRanking: number;
    region: string;
};
export type PlayerPRResponse = {
    earnings: number;
    pr: PRInformationResponse;
};
export type PlayerLegendResponse = {
    legend: {
        name: string;
        count: number;
    };
};
export type MatchupResponse = {
    matchups: {
        matches: [number, number];
        games: [number, number];
    }[];
};
export type PlayerPlacementsResponse = {
    playerPlacements: {
        placement: number;
        tournament: {
            slug: string;
        };
    }[];
};
export type PlayerMatchesResponse = {
    playerMatches: {
        matchId: number;
        scores: [number, number];
    }[];
};
