import * as DB from "./types/db";
import * as Params from "./types/params";
import { AxiosResponse } from "axios";
type HTTPMethod = "get" | "post";
export declare class DBService {
    private readonly API_URL;
    private readonly completionClosure?;
    constructor(apiURL?: string, completion?: () => void);
    uri(path: string): string;
    runQuery<T = any>(endpoint: string, method?: HTTPMethod, body?: {}): Promise<AxiosResponse<T>>;
    /**
     * Fetch a player's most recent legend.
     */
    getPlayerLegend(params: Params.GetPlayerLegendParams): Promise<string>;
    /**
     * Fetch a player's PR information.
     */
    getPlayerPR(params: Params.GetPlayerPRParams): Promise<DB.PlayerPRResponse>;
    getMatchup(params: Params.GetMatchupParams): Promise<[number, number]>;
    getPlayer(params: Params.GetPlayerParams): Promise<{
        smashId: number;
        brawlhallaId: number;
        name: string;
    }>;
    getPlayerBrawlhallaId(params: Params.GetBrawlhallaPlayerParams): Promise<{
        smashId: number;
        brawlhallaId: number;
        name: string;
    }>;
    getPlayerEvents(params: Params.GetPlayerEventsParams): Promise<{
        placement: number;
        tournament: {
            slug: string;
        };
    }[]>;
    getPlayerEventMatches(params: Params.GetPlayerEventMatchesParams): Promise<{
        matchId: number;
        scores: [number, number];
    }[]>;
}
export {};
