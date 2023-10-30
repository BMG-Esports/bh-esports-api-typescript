export type PlayerResponse = {
  smashId: number;
  brawlhallaId: number;
  name: string;
  twitch: string;
  twitter: string;
  pronoun: string;
  country: string;
}

export type GetPlayerResponse = {
    player: PlayerResponse;
  };
  
  export type GetPlayerTeammatesReponse = {
    playerTeammates: {
      player: PlayerResponse;
      games: number;
      lastTeamedDate: number;
    }[];
    nextToken?: string;
  }

  export type PRInformationResponse = {
    top8: number;
    top32: number;
    gold: number;
    silver: number;
    bronze: number;
    powerRanking: number;
    region: string;
  };
  
  export type GetPlayerPRResponse = {
    earnings: number;
    pr: PRInformationResponse;
  };
  
  export type TournamentResponse = {
    slug: string;
    tournamentName: string;
    eventName: string;
    year: number;
    isOfficial: boolean;
    isTwos: boolean;
    startTime: number;
}
  
  export type GetPlayerPlacementsResponse = {
    playerPlacements: {
      placement: number;
      tournament: TournamentResponse
    }[];
    nextToken?: string;
  };
  
  export type GetPlayerMatchesResponse = {
    playerMatches: {
      matchId: number;
      scores: [number, number];
      legends: string[][];
      maps: string[];
      opponent: PlayerResponse[];
    }[];
  };

  export type LegendResponse = {
    name: string;
    count: number;
  }

  export type GetPlayerLegendsResponse = {
    legends: LegendResponse[];
    nextToken?: string;
  }

  export type GetRecentPlayerLegendResponse = {
    legend: LegendResponse;
  };

  export type SearchPlayersResponse = {
    searchPlayers: {
      player: PlayerResponse;
      pr1v1: number;
      pr2v2: number;
      region: string;
      top32: number;
      top8: number;
      gold: number;
      silver: number;
      bronze: number;
      earnings: number;
    }[];
    nextToken?: string;
  }

  export type GetMatchupResponse = {
    matchups: {
      matches: [number, number];
      games: [number, number];
      opponent: PlayerResponse[];
    }[];
    nextToken?: string;
  };


  export type GetMatchupPlacementsResponse = {
    matchupPlacements: {
      placements: number[];
      tournament: TournamentResponse
    }[];
    nextToken?: string;
  }

  export type GetMatchupMatchesResponse = {
    matchupMatches: {
      matchId: number;
      scores: number[];
      legends: string[][];
      maps: string[];
    }[];
  }

  export type ListEventsResponse = {
    tournaments: TournamentResponse[];
    nextToken?: string;
  }

  export type ListPRResponse = {
    prPlayers: {
      playerId: number;
      playerName: string;
      twitter: string;
      twitch: string;
      top8: number;
      top32: number;
      gold: number;
      silver: number;
      bronze: number;
      powerRanking: number;
      points: number;
      earnings: number;
    }[];
    totalPages: number;
  }