import * as DB from "./types/responses";
import * as Params from "./types/params"
import axios, { AxiosResponse } from "axios";
import { BackendError } from "./errors";

type HTTPMethod = "get" | "post";

var API_URL: string = "https://api.brawltools.com"

export let overrideAPIURL = (url: string) => {
  API_URL = url
}

let uri = (path: string): string => API_URL + path

const runQuery = async <T>(
    endpoint: string,
    method: HTTPMethod = "get",
    body = {}
  ): Promise<AxiosResponse<T>> => {
    const doRequest = async () => {
      try {
        const res = await axios({
          method,
          url: uri(endpoint),
          data: body,
          timeout: 5000,
        });
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
  export const getPlayer = async (params: Params.GetPlayerParams) => {
        try {
          const res = await runQuery<DB.GetPlayerResponse>(
            `/player/${params.smashId}`,
            "get",
            {},
          );
    
          if (res.status === 404) {
            return null;
          }
    
          return res.data.player;
        } catch (e) {
          const errorMessage = e.response?.data?.message || "Error when fetching player information.";
          throw new BackendError(
            errorMessage,
            "DBService",
            true,
            e
          );
        }
      }
    
        /**
       * Fetch a player's info by brawlhallaId.
       * Returns - smashId, brawlhallaId, name
       */
      export const getPlayerByBrawlhallaId = async (params: Params.GetBrawlhallaPlayerParams) => {
        try {
          const res = await runQuery<DB.GetPlayerResponse>(
            `/player/bhId/${params.brawlhallaId}`,
            "get",
            {},
          );
    
          if (res.status === 404) {
            return null;
          }
    
          return res.data.player;
        } catch (e) {
          const errorMessage = e.response?.data?.message || "Error when fetching player information";
          throw new BackendError(
            errorMessage,
            "DBService",
            true,
            e
          );
        }
      }



      /**
   * Fetch a player's teammates. SmashId is required.
   */
     export const describePlayerTeammates = async (params: Params.DescribePlayerTeammatesParams) => {
        try {
          const res = await runQuery<DB.TeammateResponse>(
            `/player/teammate`,
            "post",
            { smashId: params.smashId, isOfficial: params.isOfficial, maxResults: params.maxResults, nextToken: params.nextToken},
          );
          if (res.status === 404) {
            return [];
          }
    
          return res.data;
        } catch (e) {
          const errorMessage = e.response?.data?.message || "Error when fetching player teammates";
          throw new BackendError(
            errorMessage,
            "DBService",
            true,
            e
          );
        }
      }

        /**
   * Fetch a player's PR information.
   */
  export const describePlayerPR = async (params: Params.DescribePlayerPRParams): Promise<DB.PlayerPRResponse> => {
    try {
      const res = await runQuery<DB.PlayerPRResponse>(
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
      const errorMessage = e.response?.data?.message || "Error when fetching player PR.";
      throw new BackendError(errorMessage, "DBService", true, e);
    }
  }


    /**
   * Fetch all players for given smashIds.
   */
    export const listSmashPlayers = async (params: Params.ListSmashPlayersParams) => {
      try {
        const res = await runQuery<DB.PlayerListResponse>(
          `/players`,
          "post",
          { smashIds: params.smashIds },
        );
        if (res.status === 404) {
          return [];
        }
  
        return res.data;
      } catch (e) {
        const errorMessage = e.response?.data?.message || "Error when fetching player list";
        throw new BackendError(
          errorMessage,
          "DBService",
          true,
          e
        );
      }
    }
  
        /**
     * Fetch all players for given brawlhallaId.
     */
    export const listBrawlhallaPlayers = async (params: Params.ListBrawlhallaPlayersParams) => {
      try {
        const res = await runQuery<DB.PlayerListResponse>(
          `/players`,
          "post",
          { bhIds: params.bhIds },
        );
        if (res.status === 404) {
          return [];
        }
  
        return res.data;
      } catch (e) {
        const errorMessage = e.response?.data?.message || "Error when fetching player list";
        throw new BackendError(
          errorMessage,
          "DBService",
          true,
          e
        );
      }
    }




      /**
   * Fetch a player's placements in tournaments by game mode. Entrant ids and game mode is required.
   */
  export const describePlayerPlacements = async (params: Params.DescribePlayerPlacementsParams) => {
    try {
      const res = await runQuery<DB.PlayerPlacementsResponse>(
        `/player/placement`,
        "post",
        { entrantSmashIds: params.entrantSmashIds, isOfficial: params.isOfficial, gameMode: params.gameMode, nextToken: params.nextToken, maxResults: params.maxResults },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data.playerPlacements;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when fetching player tournament history";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }

      /**
   * Fetch a player's matches in the given event slug.
   */
  export const describePlayerMatches = async (params: Params.DescribePlayerMatchesParams) => {
    try {
      const res = await runQuery<DB.PlayerMatchesResponse>(
        `/player/match`,
        "post",
        { eventSlug: params.slug, entrantSmashIds: [params.entrantSmashId] },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data.playerMatches;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when fetching player event matches.";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }



      /**
   * Fetch all of a player's legends in a given year. Smash id is required.
   */
  export const describePlayerLegends = async (params: Params.DescribePlayerLegendsParams) => {
    try {
      const res = await runQuery<DB.PlayerLegendsResponse>(
        `/player/legend`,
        "post",
        { entrantSmashIds: params.entrantSmashIds, isOfficial: params.isOfficial, year: params.year, maxResults: params.maxResults, nextToken: params.nextToken },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when fetching player legends.";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }

    /**
   * Fetch a player's most recent legend with smash Id.
   */
    export const describePlayerRecentLegend = async (params: Params.DescribePlayerRecentLegendParams): Promise<DB.RecentPlayerLegendResponse> => {
      try {
        const res = await runQuery<DB.RecentPlayerLegendResponse>(
          `/player/${params.playerId}/legend`,
          "get",
          {}
        );
        if (res.status === 404) {
          return null;
        }
  
        return res.data;
      } catch (e) {
        const errorMessage = e.response?.data?.message || "Error when fetchng player legend information.";
        throw new BackendError(
          errorMessage,
          "DBService",
          true,
          e
        );
      }
    }
  

      /**
   * Search for a player. Query is required.
   */
  export const searchPlayers = async (params: Params.SearchPlayersParam) => {
    try {
      const res = await runQuery<DB.SearchPlayersResponse>(
        `/player/search`,
        "post",
        { query: params.query, nextToken: params.nextToken, maxResults: params.maxResults },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when searching for player.";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }
  
      /**
   * Fetch matchup between players. Entrant1SmashId and game mode are required.
   */
     export const describeMatchup = async (params: Params.DescribeMatchupParams): Promise<[number, number]> => {
        try {
          const res = await runQuery<DB.MatchupResponse>(
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
          const errorMessage = e.response?.data?.message ||  `Error fetching player matchup ${params.entrant1SmashIds
            .concat(params.entrant2SmashIds)
            .join(", ")}`;
          throw new BackendError(
           errorMessage,
            "DBService",
            true,
            e
          );
        }
      }


      /**
   * Fetch placement info for matchup between given players. Both entrant smash Ids and game mode are required.
   */
  export const describeMatchupPlacements = async (params: Params.DescribeMatchupPlacementParams) => {
    try {
      const res = await runQuery<DB.MatchupPlacementsResponse>(
        `/matchup/placement`,
        "post",
        { isOfficial: params.isOfficial, entrant1SmashIds: params.entrant1SmashIds,entrant2SmashIds: params.entrant2SmashIds, gameMode: params.gameMode },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when fetching matchup placements.";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }
  
    /**
   * Fetch match info for matchup between given players. Entrant1SmashIds is required.
   */
  export const describeMatchupMatches = async (params: Params.DescribeMatchupMatchesParam) => {
    try {
      const res = await runQuery<DB.MatchupMatchesResponse>(
        `/matchup/match`,
        "post",
        { eventSlug: params.eventSlug, entrant1SmashIds: params.entrant1SmashIds, entrant2SmashIds: params.entrant2SmashIds },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when fetching matchup matches.";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }

      /**
   * Fetch all events in a given game mode. Game mode is required.
   */
  export const listEvents = async (params: Params.ListEventsParams) => {
    try {
      const res = await runQuery<DB.ListEventsResponse>(
        `/event`,
        "post",
        { gameMode: params.gameMode, year: params.year, nextToken: params.nextToken, maxResults: params.maxResults, isOfficial: params.isOfficial },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when fetching events list";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }

      /**
   * Fetch all PRs for a given game mode and region, required.
   */
  export const listPR = async (params: Params.ListPRParams) => {
    try {
      const res = await runQuery<DB.ListPRResponse>(
        `/pr`,
        "post",
        { gameMode: params.gameMode, region: params.region, page: params.page, maxResults: params.maxResults, table: params.table, orderBy: params.orderBy },
      );
      if (res.status === 404) {
        return [];
      }

      return res.data;
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error when fetching PR list.";
      throw new BackendError(
        errorMessage,
        "DBService",
        true,
        e
      );
    }
  }