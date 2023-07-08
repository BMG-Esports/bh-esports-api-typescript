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
  
  export type TeammateResponse = {
    playerTeammates: {
      player: PlayerResponse;
      games: number;
      lastTeamedDate: number;
    }[];
    nextToken: string;
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
  
  export type PlayerPRResponse = {
    earnings: number;
    pr: PRInformationResponse;
  };

  export type PlayerListResponse = {
    players: PlayerResponse[];
  }
  
  export type TournamentResponse = {
    slug: string;
    tournamentName: string;
    eventName: string;
    year: number;
    isOfficial: boolean;
    isTwos: boolean;
    startTime: number;
}
  
  export type PlayerPlacementsResponse = {
    playerPlacements: {
      placement: number;
      tournament: TournamentResponse
    }[];
    nextToken: string;
  };
  
  export type PlayerMatchesResponse = {
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

  export type PlayerLegendsResponse = {
    legends: LegendResponse[];
    nextToken: string;
  }

  export type RecentPlayerLegendResponse = {
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
    nextToken: string;
  }

  export type MatchupResponse = {
    matchups: {
      matches: [number, number];
      games: [number, number];
      opponent: PlayerResponse[];
    }[];
    nextToken: string;
  };


  export type MatchupPlacementsResponse = {
    matchupPlacements: {
      placements: number[];
      tournament: TournamentResponse
    }[];
    nextToken: string;
  }

  export type MatchupMatchesResponse = {
    matchupMatches: {
      matchId: number;
      scores: number[];
      legends: string[][];
      maps: string[];
    }[];
  }

  export type ListEventsResponse = {
    tournaments: TournamentResponse[];
    nextToken: string;
  }
  
  export type DuplicateResponse = {
    region: string;
    gameMode: number;
    placement: number;
  }

  export type GetPRResponse = {
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
      duplicates: DuplicateResponse[];
    }[];
    totalPages: number;
  }