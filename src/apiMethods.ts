import type * as DB from "./types/responses";
import type * as Params from "./types/params";
import "isomorphic-fetch";

let API_URL: string = "https://api.brawltools.com/v2";

export const overrideAPIURL = (url: string): void => {
  API_URL = url;
};

const uri = (path: string): string => API_URL + path;

const runQuery = async (
  endpoint: string,
  params: Record<string, any> = {},
): Promise<Response> => {
  const uriWithParams = new URL(uri(endpoint));

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== "") {
      uriWithParams.searchParams.append(key, value.toString());
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(uriWithParams.href, {
      signal: controller.signal,
    });

    if (!response.ok && response.status !== 404) {
      let errorMessage = `Fetch failed with status: ${response.status}`;

      // Try to extract a more specific error message from the API response, if available.
      try {
        const errorData = await response.json();
        errorMessage = errorData.message ?? errorMessage;
      } catch (err) {
        // The response is not a valid JSON or doesn't have a message property.
        // Use the default error message.
      }

      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out after 5000ms");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Fetch a player's info by playerId
 * Returns - Player object
 */
export const getPlayer = async (
  params: Params.GetPlayerParams,
): Promise<DB.GetPlayerResponse | null> => {
  try {
    const res = await runQuery(`/player/${params.playerId}`);

    if (res.status === 404) {
      return null;
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching player information.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's info by brawlhallaId.
 * Returns - Player object
 */
export const getPlayerByBrawlhallaId = async (
  params: Params.GetBrawlhallaPlayerParams,
): Promise<DB.GetPlayerResponse | null> => {
  try {
    const res = await runQuery(`/player/bhId/${params.brawlhallaId}`);

    if (res.status === 404) {
      return null;
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching player information";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's info by start.gg player id.
 * Returns - Player object
 */
export const getPlayerBySggId = async (
  params: Params.GetSggPlayerParams,
): Promise<DB.GetPlayerResponse | null> => {
  try {
    const res = await runQuery(`/player/sggId/${params.sggPlayerId}`);

    if (res.status === 404) {
      return null;
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching player information";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's info by challengermode player id.
 * Returns - Player object
 */
export const getPlayerByCmId = async (
  params: Params.GetCmPlayerParams,
): Promise<DB.GetPlayerResponse | null> => {
  try {
    const res = await runQuery(`/player/cmId/${params.cmPlayerId}`);

    if (res.status === 404) {
      return null;
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching player information";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's teammates. PlayerId is required.
 */
export const getPlayerTeammates = async (
  params: Params.GetPlayerTeammatesParams,
): Promise<DB.GetPlayerTeammatesReponse> => {
  try {
    const res = await runQuery(
      "/player/teammate",
      params,
    );
    if (res.status === 404) {
      return { playerTeammates: [] };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching player teammates";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's PR information.
 */
export const getPlayerPR = async (
  params: Params.GetPlayerPRParams,
): Promise<DB.GetPlayerPRResponse | null> => {
  try {
    const res = await runQuery(
      "/player/pr",
      params,
    );
    if (res.status === 404) {
      return null;
    }

    // const key = gameMode === 1 ? "pr1v1" : "pr2v2";
    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching player PR.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's placements in tournaments by game mode. Entrant ids and game mode is required.
 */
export const getPlayerPlacements = async (
  params: Params.GetPlayerPlacementsParams,
): Promise<DB.GetPlayerPlacementsResponse | null> => {
  try {
    const res = await runQuery(
      "/player/placement",
      {
        ...params,
        playerIds: params.playerIds.join(","),
      },
    );
    if (res.status === 404) {
      return { playerPlacements: [] };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ??
      "Error when fetching player tournament history";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's matches in the given event slug.
 */
export const getPlayerMatches = async (
  params: Params.GetPlayerMatchesParams,
): Promise<DB.GetPlayerMatchesResponse> => {
  try {
    const res = await runQuery(
      "/player/match",
      {
        tournamentId: params.tournamentId,
        playerIds: params.playerIds.join(","),
      },
    );
    if (res.status === 404) {
      return { playerMatches: [] };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ??
      "Error when fetching player event matches.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch all of a player's legends in a given year. Player id is required.
 */
export const getPlayerLegends = async (
  params: Params.GetPlayerLegendsParams,
): Promise<DB.GetPlayerLegendsResponse> => {
  try {
    const res = await runQuery(
      "/player/legend",
      {
        ...params,
        playerIds: params.playerIds.join(","),
      },
    );
    if (res.status === 404) {
      return { legends: [] };
    }

    return await res.json();
  } catch (e) {
    console.log(e);
    const errorMessage = e.message ?? "Error when fetching player legends.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a player's most recent legend with player id.
 */
export const getPlayerRecentLegend = async (
  params: Params.GetPlayerRecentLegendParams,
): Promise<DB.GetRecentPlayerLegendResponse | null> => {
  try {
    const res = await runQuery(`/player/${params.playerId}/legend`);
    if (res.status === 404) {
      return null;
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ??
      "Error when fetching player legend information.";
    throw new Error(errorMessage);
  }
};

/**
 * Search for a player. Query is required.
 */
export const searchPlayers = async (
  params: Params.SearchPlayersParam,
): Promise<DB.SearchPlayersResponse> => {
  try {
    const res = await runQuery(
      "/player/search",
      params,
    );
    if (res.status === 404) {
      return { searchPlayers: [] };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when searching for player.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch matchup between players. Entrant1PlayerId and game mode are required.
 */
export const getMatchup = async (
  params: Params.GetMatchupParams,
): Promise<DB.GetMatchupResponse> => {
  try {
    const res = await runQuery(
      "/matchup",
      {
        ...params,
        entrant1PlayerIds: params.entrant1PlayerIds.join(","),
        entrant2PlayerIds: params.entrant2PlayerIds?.join(","),
      },
    );
    if (res.status === 404) {
      return { matchups: [] };
    }
    const matchup = await res.json();
    return matchup;
  } catch (e) {
    if (e.response?.status === 400) {
      return { matchups: [] };
    }
    const errorMessage = e.message ??
      `Error fetching player matchup ${
        params.entrant1PlayerIds.concat(params.entrant2PlayerIds ?? []).join(
          ", ",
        )
      }`;
    throw new Error(errorMessage);
  }
};

/**
 * Fetch placement info for matchup between given players. Both entrant playerIds and game mode are required.
 */
export const getMatchupPlacements = async (
  params: Params.GetMatchupPlacementParams,
): Promise<DB.GetMatchupPlacementsResponse> => {
  try {
    const res = await runQuery(
      "/matchup/placement",
      {
        ...params,
        entrant1PlayerIds: params.entrant1PlayerIds.join(","),
        entrant2PlayerIds: params.entrant2PlayerIds.join(","),
      },
    );
    if (res.status === 404) {
      return { matchupPlacements: [] };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching matchup placements.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch match info for matchup between given players. Entrant1PlayerIds is required.
 */
export const getMatchupMatches = async (
  params: Params.GetMatchupMatchesParam,
): Promise<DB.GetMatchupMatchesResponse> => {
  try {
    const res = await runQuery(
      "/matchup/match",
      {
        tournamentId: params.tournamentId,
        entrant1PlayerIds: params.entrant1PlayerIds.join(","),
        entrant2PlayerIds: params.entrant2PlayerIds?.join(","),
      },
    );
    if (res.status === 404) {
      return { matchupMatches: [] };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching matchup matches.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch all events in a given game mode. Game mode is required.
 */
export const listEvents = async (
  params: Params.ListEventsParams,
): Promise<DB.ListEventsResponse> => {
  try {
    const res = await runQuery(
      "/event",
      params,
    );
    if (res.status === 404) {
      return { tournaments: [] };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching events list";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch all PRs for a given game mode and region, required.
 */
export const listPR = async (
  params: Params.ListPRParams,
): Promise<DB.ListPRResponse> => {
  try {
    const res = await runQuery(
      "/pr",
      params,
    );
    if (res.status === 404) {
      return { prPlayers: [], totalPages: 1 };
    }

    return await res.json();
  } catch (e) {
    const errorMessage = e.message ?? "Error when fetching PR list.";
    throw new Error(errorMessage);
  }
};
