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
   * Fetch a player's most recent legend.
   */
  async getPlayerLegend(params: Params.GetPlayerLegendParams): Promise<string> {
    try {
      const res = await this.runQuery<DB.PlayerLegendResponse>(
        `/player/${params.playerId}/legend`,
        "get",
        {}
      );
      if (res.status === 404) {
        return null;
      }

      return res.data?.legend?.name;
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
   * Fetch a player's PR information.
   */
  async getPlayerPR(params: Params.GetPlayerPRParams): Promise<DB.PlayerPRResponse> {
    try {
      const res = await this.runQuery<DB.PlayerPRResponse>(
        `/player/pr`,
        "post",
        {
          entrantSmashIds: [params.entrantSmashId],
          ganeMode: params.gameMode,
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

  // TODO: Migrate getMatchup to the new API.
  async getMatchup(params: Params.GetMatchupParams): Promise<[number, number]> {
    try {
      const res = await this.runQuery<DB.MatchupResponse>(
        `/matchup`,
        "post",
        { isOfficial: true, entrant1SmashIds: params.entrant1SmashIds,entrant2SmashIds: params.entrant2SmashIds, gameMode: params.gameMode },
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

  async getPlayer(params: Params.GetPlayerParams) {
    try {
      const res = await this.runQuery<DB.GetPlayerResponse>(
        `/player/${params.playerId}`,
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

  async getPlayerEvents(params: Params.GetPlayerEventsParams) {
    try {
      const res = await this.runQuery<DB.PlayerPlacementsResponse>(
        `/player/placement`,
        "post",
        { entrantSmashIds: [params.entrantSmashId], isOfficial: true, year: params.year, gameMode: params.gameMode },
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

  async getPlayerEventMatches(params: Params.GetPlayerEventMatchesParams) {
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

  async getPlayerTeammates(params: Params.GetPlayerTeammatesParams) {
    try {
      const res = await this.runQuery<DB.TeammateResponse>(
        `/player/teammate`,
        "post",
        { smashId: params.smashId, isOfficial: true },
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

  async getBhPlayerList(params: Params.GetPlayerListBhIdParams) {
    try {
      const res = await this.runQuery<DB.PlayerListResponse>(
        `/players`,
        "post",
        { smashIds: params.bhIds },
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


  async getPlayerLegends(params: Params.GetPlayerLegendsParams) {
    try {
      const res = await this.runQuery<DB.PlayerLegendsResponse>(
        `/player/legend`,
        "post",
        { entrantSmashIds: [params.entrantSmashId], isOfficial: true, year: params.year },
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

  async searchPlayers(params: Params.SearchPlayersParam) {
    try {
      const res = await this.runQuery<DB.SearchPlayersResponse>(
        `/player/search`,
        "post",
        { query: params.query },
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

  async getMatchupPlacements(params: Params.GetMatchupParams) {
    try {
      const res = await this.runQuery<DB.MatchupPlacementsResponse>(
        `/matchup/placement`,
        "post",
        { isOfficial: true, entrant1SmashIds: params.entrant1SmashIds,entrant2SmashIds: params.entrant2SmashIds, gameMode: params.gameMode },
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
  

  async getMatchupMatches(params: Params.GetMatchupMatchesParam) {
    try {
      const res = await this.runQuery<DB.MatchupMatchesResponse>(
        `/matchup/match`,
        "post",
        { eventSlug: params.eventSlug, entrant1SmashIds: params.entrant1SmashIds,entrant2SmashIds: params.entrant2SmashIds },
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

  async getEventsList(params: Params.ListEventsParams) {
    try {
      const res = await this.runQuery<DB.ListEventsResponse>(
        `/event`,
        "post",
        { gameMode: params.gameMode },
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

  async getStat(params: Params.GetStatParams) {
    try {
      const res = await this.runQuery<DB.GetStatsResponse>(
        `/stat`,
        "post",
        { gameMode: params.gameMode, statType: params.statType },
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

  async getPRList(params: Params.GetPRParams) {
    try {
      const res = await this.runQuery<DB.GetPRResponse>(
        `/pr`,
        "post",
        { gameMode: params.gameMode, region: params.region },
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