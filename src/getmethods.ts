import * as DB from "./types/db";
import axios, { AxiosResponse } from "axios";
import { BackendError } from "./errors";

type HTTPMethod = "get" | "post";



export class DBService {
  private readonly API_URL: string;


  constructor(apiURL: string = "https://api.brawltools.com"){
    this.API_URL = apiURL
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
  async getPlayerLegend(id: number): Promise<string> {
    try {
      const res = await this.runQuery<DB.PlayerLegend>(
        `/player/${id}/legend`,
        "get",
        {}
      );
      if (res.status === 404) {
        return null;
      }

      return res.data?.legend?.name || null;
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
  async getPlayerPR(id: number, gameMode: number): Promise<DB.PRInformation> {
    try {
      const res = await this.runQuery<DB.PlayerPR>(
        `/player/pr`,
        "post",
        {
          entrantSmashIds: [id],
          gameMode,
        }
      );
      if (res.status === 404) {
        return null;
      }

      // const key = gameMode === 1 ? "pr1v1" : "pr2v2";
      const { pr, earnings } = res.data;
      return {
        powerRanking: pr?.powerRanking,
        earnings: earnings,
        top8: pr?.top8,
        top32: pr?.top32,
        gold: pr?.gold,
        silver: pr?.silver,
        bronze: pr?.bronze,
        region: pr?.region,
      };
    } catch (e) {
      throw new BackendError("Error when fetching player PR.", "DB", true, e);
    }
  }

  // TODO: Migrate getMatchup to the new API.
  async getMatchup(
    entrant1SmashIds: number[],
    entrant2SmashIds: number[],
    gameMode: number
  ): Promise<[number, number]> {
    try {
      const res = await this.runQuery<DB.Matchup>(
        `/matchup`,
        "post",
        { isOfficial: true, entrant1SmashIds, entrant2SmashIds, gameMode },
      );
      if (res.status === 404) {
        return [0, 0];
      }
      const matchup = res.data?.matchups?.[0];
      return matchup?.matches || [0, 0];
    } catch (e) {
      if (e.response?.status === 400) {
        return [0, 0];
      }

      throw new BackendError(
        `Error fetching player matchup ${entrant1SmashIds
          .concat(entrant2SmashIds)
          .join(", ")}`,
        "DB",
        true,
        e
      );
    }
  }

  async getPlayer(id: number) {
    try {
      const res = await this.runQuery<DB.GetPlayerResponse>(
        `/player/${id}`,
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

  async getPlayerBrawlhallaId(brawlhallaId: number) {
    try {
      const res = await this.runQuery<DB.GetPlayerResponse>(
        `/player/bId/${brawlhallaId}`,
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

  async getPlayerEvents(id: number, gameMode: number) {
    try {
      const res = await this.runQuery<DB.PlayerPlacements>(
        `/player/placement`,
        "post",
        { entrantSmashIds: [id], isOfficial: true, year: 2022, gameMode },
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

  async getPlayerEventMatches(id: number, slug: string) {
    try {
      const res = await this.runQuery<DB.PlayerMatches>(
        `/player/match`,
        "post",
        { eventSlug: slug, entrantSmashIds: [id] },
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
}
