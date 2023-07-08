import * as DB from "./types/responses";
import * as Params from "./types/params"
import axios, { AxiosResponse } from "axios";
import { BackendError } from "./errors";

type HTTPMethod = "get" | "post";



export class DBService {
  private readonly API_URL: string;
  private readonly completionClosure?: () => void;


  constructor(apiURL: string = "https://api.brawltools.com", completion?: () => void){
    this.API_URL = apiURL
    this.completionClosure = completion
  }

  uri(path: string) {
    return this.API_URL + path;
  }

  async runQuery<T = any>(
    endpoint: string,
    method: HTTPMethod = "get",
    body = {}
  ): Promise<AxiosResponse<T>> {
    const doRequest = async () => {
      try {
        const res = await axios({
          method,
          url: this.uri(endpoint),
          data: body,
          timeout: 5000,
        });
        this.completionClosure?.()
        return res;
      } catch (e) {
        // 404's don't count as normal failures.
        if (e.response && e.response.status === 404) {
          return e.response;
        }
        throw e;
      }
    };
    return doRequest();
  }

      /**
   * Fetch a player's info by smashId
   * Returns - smashId, brawlhallaId, name
   */
      async getPlayer(params: Params.GetPlayerParams) {
        try {
          const res = await this.runQuery<DB.GetPlayerResponse>(
            `/player/${params.smashId}`,
            "get",
            {},
          );
    
          if (res.status === 404) {
            return null;
          }
    
          return res.data.player;
        } catch (e) {
          throw new BackendError(
            "Error when fetching player information.",
            "DB",
            true,
            e
          );
        }
      }
    
        /**
       * Fetch a player's info by brawlhallaId.
       * Returns - smashId, brawlhallaId, name
       */
      async getPlayerBrawlhallaId(params: Params.GetBrawlhallaPlayerParams) {
        try {
          const res = await this.runQuery<DB.GetPlayerResponse>(
            `/player/bhId/${params.brawlhallaId}`,
            "get",
            {},
          );
    
          if (res.status === 404) {
            return null;
          }
    
          return res.data.player;
        } catch (e) {
          throw new BackendError(
            "Error when fetching player information.",
            "DB",
            true,
            e
          );
        }
      }



      /**
   * Fetch a player's teammates. SmashId is required.
   */
      async getPlayerTeammates(params: Partial<Params.GetPlayerTeammatesParams>) {
        try {
          const res = await this.runQuery<DB.TeammateResponse>(
            `/player/teammate`,
            "post",
            { smashId: params.smashId, isOfficial: params.isOfficial, maxResults: params.maxResults },
          );
          if (res.status === 404) {
            return [];
          }
    
          return res.data;
        } catch (e) {
          throw new BackendError(
            "Error when fetching player tournament matches",
            "DB",
            true,
            e
          );
        }
      }

        /**
   * Fetch a player's PR information.
   */
  async getPlayerPR(params: Params.GetPlayerPRParams): Promise<DB.PlayerPRResponse> {
    try {
      const res = await this.runQuery<DB.PlayerPRResponse>(
        `/player/pr`,
        "post",
        {
          entrantSmashIds: [params.entrantSmashId],
          gameMode: params.gameMode,
        }
      );
      if (res.status === 404) {
        return null;
      }

      // const key = gameMode === 1 ? "pr1v1" : "pr2v2";
      return res.data;
    } catch (e) {
      throw new BackendError("Error when fetching player PR.", "DB", true, e);
    }
  }


    /**
   * Fetch all players for given smashIds.
   */
    async getSmashPlayerList(params: Params.GetPlayerListSmashIdParams) {
      try {
        const res = await this.runQuery<DB.PlayerListResponse>(
          `/players`,
          "post",
          { smashIds: params.smashIds },
        );
        if (res.status === 404) {
          return [];
        }
  
        return res.data;
      } catch (e) {
        throw new BackendError(
          "Error when fetching player tournament matches",
          "DB",
          true,
          e
        );
      }
    }
  
        /**
     * Fetch all players for given brawlhallaId.
     */
    async getBhPlayerList(params: Params.GetPlayerListBhIdParams) {
      try {
        const res = await this.runQuery<DB.PlayerListResponse>(
          `/players`,
          "post",
          { bhIds: params.bhIds },
        );
        if (res.status === 404) {
          return [];
        }
  
        return res.data;
      } catch (e) {
        throw new BackendError(
          "Error when fetching player tournament matches",
          "DB",
          true,
          e
        );
      }
    }




      /**
   * Fetch a player's placements in tournaments by game mode. Entrant ids and game mode is required.
   */
  async getPlayerPlacements(params: Partial<Params.GetPlayerPlacementsParams>) {
    try {
      const res = await this.runQuery<DB.PlayerPlacementsResponse>(
        `/player/placement`,
        "post",
        { entrantSmashIds: params.entrantSmashIds, isOfficial: params.isOfficial, gameMode: params.gameMode, nextToken: params.nextToken, maxResults: params.maxResults },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data.playerPlacements;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament history",
        "DB",
        true,
        e
      );
    }
  }

      /**
   * Fetch a player's matches in the given event slug.
   */
  async getPlayerEventMatches(params: Params.GetPlayerMatchesParams) {
    try {
      const res = await this.runQuery<DB.PlayerMatchesResponse>(
        `/player/match`,
        "post",
        { eventSlug: params.slug, entrantSmashIds: [params.entrantSmashId] },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data.playerMatches;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament matches",
        "DB",
        true,
        e
      );
    }
  }



      /**
   * Fetch all of a player's legends in a given year. Smash id is required.
   */
  async getPlayerLegends(params: Partial<Params.GetPlayerLegendsParams>) {
    try {
      const res = await this.runQuery<DB.PlayerLegendsResponse>(
        `/player/legend`,
        "post",
        { entrantSmashIds: params.entrantSmashIds, isOfficial: params.isOfficial, year: params.year, maxResults: params.maxResults, nextToken: params.nextToken },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament matches",
        "DB",
        true,
        e
      );
    }
  }

    /**
   * Fetch a player's most recent legend with smash Id.
   */
    async getRecentPlayerLegend(params: Params.GetRecentPlayerLegendParams): Promise<DB.RecentPlayerLegendResponse> {
      try {
        const res = await this.runQuery<DB.RecentPlayerLegendResponse>(
          `/player/${params.playerId}/legend`,
          "get",
          {}
        );
        if (res.status === 404) {
          return null;
        }
  
        return res.data;
      } catch (e) {
        throw new BackendError(
          "Error when fetchng player legend information.",
          "DB",
          true,
          e
        );
      }
    }
  

      /**
   * Search for a player. Query is required.
   */
  async searchPlayers(params: Partial<Params.SearchPlayersParam>) {
    try {
      const res = await this.runQuery<DB.SearchPlayersResponse>(
        `/player/search`,
        "post",
        { query: params.query, nextToken: params.nextToken, maxResults: params.maxResults },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament matches",
        "DB",
        true,
        e
      );
    }
  }
  
      /**
   * Fetch matchup between players. Entrant1SmashId and game mode are required.
   */
      async getMatchup(params: Partial<Params.GetMatchupParams>): Promise<[number, number]> {
        try {
          const res = await this.runQuery<DB.MatchupResponse>(
            `/matchup`,
            "post",
            { isOfficial: params.isOfficial, entrant1SmashIds: params.entrant1SmashIds, entrant2SmashIds: params.entrant2SmashIds, gameMode: params.gameMode, nextToken: params.nextToken, maxResults: params.maxResults },
          );
          if (res.status === 404) {
            return [0, 0];
          }
          const matchup = res.data?.matchups?.[0];
          return matchup?.matches;
        } catch (e) {
          if (e.response?.status === 400) {
            return [0, 0];
          }
    
          throw new BackendError(
            `Error fetching player matchup ${params.entrant1SmashIds
              .concat(params.entrant2SmashIds)
              .join(", ")}`,
            "DB",
            true,
            e
          );
        }
      }


      /**
   * Fetch placement info for matchup between given players. Both entrant smash Ids and game mode are required.
   */
  async getMatchupPlacements(params: Partial<Params.GetMatchupParams>) {
    try {
      const res = await this.runQuery<DB.MatchupPlacementsResponse>(
        `/matchup/placement`,
        "post",
        { isOfficial: params.isOfficial, entrant1SmashIds: params.entrant1SmashIds,entrant2SmashIds: params.entrant2SmashIds, gameMode: params.gameMode },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament matches",
        "DB",
        true,
        e
      );
    }
  }
  
    /**
   * Fetch match info for matchup between given players. Entrant1SmashIds is required.
   */
  async getMatchupMatches(params: Params.GetMatchupMatchesParam) {
    try {
      const res = await this.runQuery<DB.MatchupMatchesResponse>(
        `/matchup/match`,
        "post",
        { eventSlug: params.eventSlug, entrant1SmashIds: params.entrant1SmashIds, entrant2SmashIds: params.entrant2SmashIds },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament matches",
        "DB",
        true,
        e
      );
    }
  }

      /**
   * Fetch all events in a given game mode. Game mode is required.
   */
  async getEventsList(params: Partial<Params.ListEventsParams>) {
    try {
      const res = await this.runQuery<DB.ListEventsResponse>(
        `/event`,
        "post",
        { gameMode: params.gameMode, year: params.year, nextToken: params.nextToken, maxResults: params.maxResults, isOfficial: params.isOfficial },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament matches",
        "DB",
        true,
        e
      );
    }
  }

      /**
   * Fetch all PRs for a given game mode and region, required.
   */
  async getPRList(params: Partial<Params.GetPRParams>) {
    try {
      const res = await this.runQuery<DB.GetPRResponse>(
        `/pr`,
        "post",
        { gameMode: params.gameMode, region: params.region, page: params.page, maxResults: params.maxResults, table: params.table, orderBy: params.orderBy },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      throw new BackendError(
        "Error when fetching player tournament matches",
        "DB",
        true,
        e
      );
    }
  }

}